import type { Gift } from "@/data/gifts";

const API_BASE = "https://api.abacatepay.com/v2";

type AbacateProduct = {
  id: string;
  externalId: string;
  name: string;
  price: number;
};

type AbacateCheckout = {
  id: string;
  url: string;
};

type AbacateEnvelope<T> = {
  data: T | null;
  error: string | null;
  success: boolean;
};

export function hasAbacateKey() {
  return Boolean(process.env.ABACATEPAY_API_KEY);
}

async function abacateRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const secret = process.env.ABACATEPAY_API_KEY;
  if (!secret) {
    throw new Error("ABACATEPAY_API_KEY não configurada");
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  const payload = (await response.json()) as AbacateEnvelope<T>;

  if (!response.ok || !payload.success || !payload.data) {
    throw new Error(
      payload.error ?? `Erro AbacatePay (${response.status}) em ${path}`,
    );
  }

  return payload.data;
}

export async function ensureProduct(gift: Gift) {
  const externalId = `wedding-gift-${gift.id}`;

  try {
    return await abacateRequest<AbacateProduct>(
      `/products/get?externalId=${encodeURIComponent(externalId)}`,
    );
  } catch {
    // Product may not exist yet
  }

  return abacateRequest<AbacateProduct>("/products/create", {
    method: "POST",
    body: JSON.stringify({
      externalId,
      name: gift.name,
      price: gift.priceInCents,
      currency: "BRL",
      description: gift.description,
    }),
  });
}

export async function createGiftCheckout(
  gift: Gift,
  urls: { returnUrl: string; completionUrl: string },
) {
  const product = await ensureProduct(gift);

  return abacateRequest<AbacateCheckout>("/checkouts/create", {
    method: "POST",
    body: JSON.stringify({
      items: [{ id: product.id, quantity: 1 }],
      methods: ["PIX", "CARD"],
      externalId: `gift-${gift.id}-${Date.now()}`,
      returnUrl: urls.returnUrl,
      completionUrl: urls.completionUrl,
    }),
  });
}
