#!/usr/bin/env node
/**
 * Fetches product images + prices from retailer URLs and saves to public/images/gifts/
 */
import { mkdir, writeFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../public/images/gifts");

const gifts = [
  {
    id: "jogo-panelas-ceramica",
    search: "jogo panelas ceramica cores claras site:mercadolivre.com.br",
    url: null,
  },
  {
    id: "frigideiras",
    search: "kit frigideiras antiaderente tramontina site:mercadolivre.com.br",
    url: null,
  },
  {
    id: "panela-pressao",
    search: "panela pressao tramontina site:mercadolivre.com.br",
    url: null,
  },
  {
    id: "assadeiras-vidro",
    search: "assadeiras vidro pyrex site:mercadolivre.com.br",
    url: null,
  },
  {
    id: "formas-bolo",
    search: "formas bolo antiaderente site:mercadolivre.com.br",
    url: null,
  },
  {
    id: "jogo-facas",
    search: "jogo facas tramontina site:mercadolivre.com.br",
    url: null,
  },
  {
    id: "potes-hermeticos",
    url: "https://www.mercadolivre.com.br/eps-709-13-potes-vidro-mantimentos-hermeticos-com-tampa-bambu-alta-resistncia-epsilon/p/MLB44648973",
  },
  {
    id: "aparelho-jantar",
    url: "https://www.tramontina.com.br/aparelho-de-jantar-tramontina-leonora-em-porcelana-20-pecas/96010289.html",
  },
  {
    id: "faqueiro",
    url: "https://www.mercadolivre.com.br/jogo-talheres-faqueiro-buzios-aco-inox-24-pecas-tramontina/p/MLB35092029",
  },
  {
    id: "jogo-copos",
    url: "https://www.mercadolivre.com.br/jogo-de-copos-420ml-elegante-resistente-canelado-pratico/p/MLB34215455",
  },
  {
    id: "travessas",
    url: "https://www.tramontina.com.br/kit-para-assar-e-servir-tramontina-cosmos-em-aco-inox-com-acabamento-fosco-e-tampa-de-vidro-4-pecas/64310150.html",
  },
  {
    id: "air-fryer",
    url: "https://www.britania.com.br/fritadeira-air-fryer-bfr38-127v-063801097/p?idsku=22503",
  },
  {
    id: "liquidificador-arno",
    url: "https://www.magazineluiza.com.br/liquidificador-arno-power-max-2200-marfim-ln64/p/241081900/ep/liqu/",
  },
  {
    id: "cafeteira",
    search: "cafeteira electrolux essenza branca site:magazineluiza.com.br",
    url: null,
  },
  {
    id: "sanduicheira",
    url: "https://www.amazon.com.br/Sanduicheira-Grill-Brit%C3%A2nia-BGR16-Redstone/dp/B0CJ3R1537",
  },
  {
    id: "torradeira-electrolux",
    url: "https://www.amazon.com.br/Electrolux-4310AOBR407-Torradeira-ETS25/dp/B09CBWDVH4",
  },
  {
    id: "mixer-philips",
    url: "https://www.amazon.com.br/Mixer-Philips-RI2622-32-branco/dp/B0873XXMXZ",
  },
  {
    id: "processador-mondial",
    url: "https://www.amazon.com.br/MONDIAL-Multiprocessador-Turbo-Branco-1000W/dp/B0GPZTFPY3",
  },
  {
    id: "chaleira-britania",
    url: "https://www.mercadolivre.com.br/britnia-bch20c-chaleira-eletrica-2l-branco/p/MLB69728049",
  },
  {
    id: "panificadora-britania",
    url: "https://www.magazineluiza.com.br/panificadora-britania-multipane-branca-12-programas/p/023305000/ep/pani/",
  },
  {
    id: "jogo-cama-king",
    url: "https://www.zelo.com.br/jogo-de-cama-alexandre-herchcovitch-queen-percal-180-fios-100-algodao-p985250",
  },
  {
    id: "edredom-king",
    search: "edredom king algodao site:magazineluiza.com.br",
    url: null,
  },
  {
    id: "cobertores-king",
    search: "cobertor king microfibra site:magazineluiza.com.br",
    url: null,
  },
  {
    id: "travesseiros",
    search: "travesseiro plumas site:magazineluiza.com.br",
    url: null,
  },
  {
    id: "almofadas",
    search: "kit almofadas decorativas site:magazineluiza.com.br",
    url: null,
  },
  {
    id: "protetor-colchao",
    search: "protetor colchao king impermeavel site:magazineluiza.com.br",
    url: null,
  },
  {
    id: "geladeira-brastemp",
    url: "https://www.brastemp.com.br/geladeira-frost-free-french-door-3-portas-branca-brastemp-bro85mb/p?idsku=326196066",
  },
  {
    id: "fogao-cooktop",
    url: "https://loja.electrolux.com.br/cooktop-5-bocas-electrolux-gas-efficient-mesa-de-vidro-e-grade-de-aco-fosco--ke5gr-/p?idsku=310128208",
  },
  {
    id: "maquina-lavar",
    search: "maquina lavar roupa 12kg electrolux site:magazineluiza.com.br",
    url: null,
  },
  {
    id: "microondas-brastemp",
    search: "microondas brastemp 32l site:magazineluiza.com.br",
    url: null,
  },
  {
    id: "lava-seca-electrolux",
    url: "https://www.magazineluiza.com.br/lava-e-seca-electrolux-12kg-lsc12-inverter-agua-fria-e-quente-cinza-onix/p/241187000/ed/ela1/",
  },
  {
    id: "forno-britania",
    url: "https://www.mercadolivre.com.br/forno-eletrico-britnia-52l-dupla-resistncia-bfe55p/p/MLB29117695",
  },
  {
    id: "purificador-electrolux",
    url: "https://www.casasbahia.com.br/purificador-de-agua-electrolux-pe11b-com-painel-touch-bivolt-branco/p/11688765",
  },
  {
    id: "smart-tv",
    search: "smart tv 55 4k site:magazineluiza.com.br",
    url: null,
  },
  {
    id: "sofa",
    search: "sofa retratil 3 lugares site:magazineluiza.com.br",
    url: null,
  },
  {
    id: "colchao",
    search: "colchao king molas site:magazineluiza.com.br",
    url: null,
  },
  {
    id: "guarda-roupa",
    search: "guarda roupa casal 3 portas site:magazineluiza.com.br",
    url: null,
  },
  {
    id: "rack",
    search: "rack tv painel site:magazineluiza.com.br",
    url: null,
  },
  {
    id: "mesa-jantar",
    search: "mesa jantar 6 lugares site:magazineluiza.com.br",
    url: null,
  },
];

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

function extractMeta(html, property) {
  const patterns = [
    new RegExp(
      `<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']+)["']`,
      "i",
    ),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return m[1];
  }
  return null;
}

function extractJsonLd(html) {
  const blocks = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const [, raw] of blocks) {
    try {
      const data = JSON.parse(raw);
      const items = Array.isArray(data) ? data : [data];
      for (const item of items) {
        if (item["@graph"]) {
          for (const node of item["@graph"]) {
            if (node.offers || node.image) return node;
          }
        }
        if (item.offers || item.image) return item;
      }
    } catch {
      /* ignore */
    }
  }
  return null;
}

function parsePrice(value) {
  if (value == null) return null;
  if (typeof value === "number") return Math.round(value * 100);
  const s = String(value).replace(/[^\d,.-]/g, "");
  if (!s) return null;
  // BR: 1.234,56
  if (s.includes(",")) {
    const n = parseFloat(s.replace(/\./g, "").replace(",", "."));
    return Number.isFinite(n) ? Math.round(n * 100) : null;
  }
  const n = parseFloat(s);
  return Number.isFinite(n) ? Math.round(n * 100) : null;
}

function extractPrice(html, jsonLd) {
  if (jsonLd?.offers) {
    const offers = Array.isArray(jsonLd.offers) ? jsonLd.offers[0] : jsonLd.offers;
    const p = parsePrice(offers?.price ?? offers?.lowPrice ?? offers?.highPrice);
    if (p) return p;
  }

  const patterns = [
    /"price"\s*:\s*([\d.]+)/,
    /"salePrice"\s*:\s*([\d.]+)/,
    /itemprop=["']price["'][^>]*content=["']([^"']+)["']/i,
    /R\$\s*([\d.]+,\d{2})/,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) {
      const p = parsePrice(m[1]);
      if (p && p > 100) return p;
    }
  }
  return null;
}

function extractImage(html, jsonLd) {
  if (jsonLd?.image) {
    const img = Array.isArray(jsonLd.image) ? jsonLd.image[0] : jsonLd.image;
    if (typeof img === "string") return img;
    if (img?.url) return img.url;
  }
  return (
    extractMeta(html, "og:image") ||
    extractMeta(html, "twitter:image") ||
    html.match(/"image"\s*:\s*"(https?:[^"]+)"/)?.[1] ||
    null
  );
}

function extractTitle(html, jsonLd) {
  return (
    jsonLd?.name ||
    extractMeta(html, "og:title") ||
    html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() ||
    null
  );
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": UA,
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

async function downloadImage(imageUrl, destPath) {
  const res = await fetch(imageUrl, {
    headers: { "User-Agent": UA, Referer: new URL(imageUrl).origin },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`Image HTTP ${res.status}`);
  const ct = res.headers.get("content-type") || "";
  let ext = ".jpg";
  if (ct.includes("png")) ext = ".png";
  else if (ct.includes("webp")) ext = ".webp";
  const finalPath = destPath.replace(/\.[^.]+$/, "") + ext;
  await pipeline(res.body, createWriteStream(finalPath));
  return finalPath;
}

async function resolveMercadoLivreSearch(search) {
  const q = encodeURIComponent(search.replace(/site:\S+/g, "").trim());
  const html = await fetchHtml(
    `https://lista.mercadolivre.com.br/${q.replace(/%20/g, "-")}`,
  );
  const link =
    html.match(/href="(https:\/\/www\.mercadolivre\.com\.br\/[^"]+\/p\/MLB\d+[^"]*)"/)?.[1] ||
    html.match(/href="(\/[^"]+-p\/MLB\d+[^"]*)"/)?.[1];
  if (!link) return null;
  return link.startsWith("http") ? link.split("?")[0] : `https://www.mercadolivre.com.br${link.split("?")[0]}`;
}

async function resolveMagaluSearch(search) {
  const q = encodeURIComponent(search.replace(/site:\S+/g, "").trim());
  const html = await fetchHtml(`https://www.magazineluiza.com.br/busca/${q}/`);
  const pathMatch = html.match(/href="(\/[^"]+\/p\/[^"/]+)"/);
  if (!pathMatch) return null;
  return `https://www.magazineluiza.com.br${pathMatch[1].split("?")[0]}`;
}

async function resolveUrl(gift) {
  if (gift.url) return gift.url;
  if (!gift.search) return null;
  try {
    if (gift.search.includes("mercadolivre")) return await resolveMercadoLivreSearch(gift.search);
    if (gift.search.includes("magazineluiza")) return await resolveMagaluSearch(gift.search);
  } catch (e) {
    console.error(`  search failed: ${e.message}`);
  }
  return null;
}

async function scrapeProduct(url) {
  const html = await fetchHtml(url);
  const jsonLd = extractJsonLd(html);
  const image = extractImage(html, jsonLd);
  const price = extractPrice(html, jsonLd);
  const title = extractTitle(html, jsonLd);
  return { image, price, title, url };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const results = {};

  for (const gift of gifts) {
    process.stdout.write(`\n[${gift.id}] `);
    try {
      const url = await resolveUrl(gift);
      if (!url) {
        console.log("no URL");
        results[gift.id] = { error: "no url" };
        continue;
      }
      console.log(url);
      const data = await scrapeProduct(url);
      if (!data.image) {
        console.log("  no image found");
        results[gift.id] = { ...data, error: "no image" };
        continue;
      }
      const basePath = path.join(OUT_DIR, `${gift.id}.jpg`);
      const saved = await downloadImage(data.image, basePath);
      const relPath = `/images/gifts/${path.basename(saved)}`;
      results[gift.id] = { ...data, url, localImage: relPath };
      console.log(`  price: ${data.price ? `R$ ${(data.price / 100).toFixed(2)}` : "?"} | ${relPath}`);
    } catch (e) {
      console.log(`  ERROR: ${e.message}`);
      results[gift.id] = { error: e.message };
    }
    await new Promise((r) => setTimeout(r, 800));
  }

  await writeFile(
    path.join(OUT_DIR, "scraped.json"),
    JSON.stringify(results, null, 2),
  );
  console.log("\nDone. See public/images/gifts/scraped.json");
}

main();
