import { NextResponse } from "next/server";
import { getGiftById } from "@/data/gifts";
import { createGiftCheckout, hasAbacateKey } from "@/lib/abacate";

export async function POST(request: Request) {
  if (!hasAbacateKey()) {
    return NextResponse.json(
      { error: "Pagamentos ainda não estão configurados." },
      { status: 503 },
    );
  }

  let body: { giftId?: string };
  try {
    body = (await request.json()) as { giftId?: string };
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const giftId = body.giftId?.trim();
  if (!giftId) {
    return NextResponse.json({ error: "Presente não informado." }, { status: 400 });
  }

  const gift = getGiftById(giftId);
  if (!gift) {
    return NextResponse.json({ error: "Presente não encontrado." }, { status: 404 });
  }

  if (gift.presented) {
    return NextResponse.json(
      { error: "Este presente já foi escolhido." },
      { status: 409 },
    );
  }

  const origin = new URL(request.url).origin;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? origin;

  try {
    const checkout = await createGiftCheckout(gift, {
      returnUrl: `${siteUrl}/#presentes`,
      completionUrl: `${siteUrl}/obrigado?gift=${encodeURIComponent(gift.id)}`,
    });

    if (!checkout.url) {
      return NextResponse.json(
        { error: "Checkout sem URL de pagamento." },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: checkout.url });
  } catch (error) {
    console.error("Abacate checkout error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Falha ao criar pagamento. Tente novamente.",
      },
      { status: 502 },
    );
  }
}
