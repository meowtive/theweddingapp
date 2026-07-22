#!/usr/bin/env node
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../public/images/gifts");

/** Sara's links + ML search for items without a specific URL */
const gifts = [
  { id: "jogo-panelas-ceramica", url: "https://lista.mercadolivre.com.br/jogo-panelas-ceramica-cores-claras", search: true },
  { id: "frigideiras", url: "https://lista.mercadolivre.com.br/kit-frigideiras-antiaderente", search: true },
  { id: "panela-pressao", url: "https://lista.mercadolivre.com.br/panela-pressao-tramontina", search: true },
  { id: "assadeiras-vidro", url: "https://lista.mercadolivre.com.br/assadeiras-vidro-pyrex", search: true },
  { id: "formas-bolo", url: "https://lista.mercadolivre.com.br/formas-bolo-antiaderente", search: true },
  { id: "jogo-facas", url: "https://lista.mercadolivre.com.br/jogo-facas-tramontina", search: true },
  { id: "potes-hermeticos", url: "https://www.mercadolivre.com.br/eps-709-13-potes-vidro-mantimentos-hermeticos-com-tampa-bambu-alta-resistncia-epsilon/p/MLB44648973" },
  { id: "aparelho-jantar", url: "https://www.tramontina.com.br/aparelho-de-jantar-tramontina-leonora-em-porcelana-20-pecas/96010289.html" },
  { id: "faqueiro", url: "https://www.mercadolivre.com.br/jogo-talheres-faqueiro-buzios-aco-inox-24-pecas-tramontina/p/MLB35092029" },
  { id: "jogo-copos", url: "https://www.mercadolivre.com.br/jogo-de-copos-420ml-elegante-resistente-canelado-pratico/p/MLB34215455" },
  { id: "travessas", url: "https://www.tramontina.com.br/kit-para-assar-e-servir-tramontina-cosmos-em-aco-inox-com-acabamento-fosco-e-tampa-de-vidro-4-pecas/64310150.html" },
  { id: "air-fryer", url: "https://www.britania.com.br/fritadeira-air-fryer-bfr38-127v-063801097/p?idsku=22503" },
  { id: "liquidificador-arno", url: "https://www.magazineluiza.com.br/liquidificador-arno-power-max-2200-marfim-ln64/p/241081900/ep/liqu/" },
  { id: "cafeteira", url: "https://lista.mercadolivre.com.br/cafeteira-electrolux-essenza-branca", search: true },
  { id: "sanduicheira", url: "https://www.amazon.com.br/Sanduicheira-Grill-Brit%C3%A2nia-BGR16-Redstone/dp/B0CJ3R1537" },
  { id: "torradeira-electrolux", url: "https://www.amazon.com.br/Electrolux-4310AOBR407-Torradeira-ETS25/dp/B09CBWDVH4" },
  { id: "mixer-philips", url: "https://www.amazon.com.br/Mixer-Philips-RI2622-32-branco/dp/B0873XXMXZ" },
  { id: "processador-mondial", url: "https://www.amazon.com.br/MONDIAL-Multiprocessador-Turbo-Branco-1000W/dp/B0GPZTFPY3" },
  { id: "chaleira-britania", url: "https://www.mercadolivre.com.br/britnia-bch20c-chaleira-eletrica-2l-branco/p/MLB69728049" },
  { id: "panificadora-britania", url: "https://www.magazineluiza.com.br/panificadora-britania-multipane-branca-12-programas/p/023305000/ep/pani/" },
  { id: "jogo-cama-king", url: "https://www.zelo.com.br/jogo-de-cama-alexandre-herchcovitch-queen-percal-180-fios-100-algodao-p985250" },
  { id: "edredom-king", url: "https://lista.mercadolivre.com.br/edredom-king", search: true },
  { id: "cobertores-king", url: "https://lista.mercadolivre.com.br/cobertor-king", search: true },
  { id: "travesseiros", url: "https://lista.mercadolivre.com.br/travesseiro-plumas", search: true },
  { id: "almofadas", url: "https://lista.mercadolivre.com.br/kit-almofadas-decorativas", search: true },
  { id: "protetor-colchao", url: "https://lista.mercadolivre.com.br/protetor-colchao-king-impermeavel", search: true },
  { id: "geladeira-brastemp", url: "https://www.brastemp.com.br/geladeira-frost-free-french-door-3-portas-branca-brastemp-bro85mb/p?idsku=326196066" },
  { id: "fogao-cooktop", url: "https://loja.electrolux.com.br/cooktop-5-bocas-electrolux-gas-efficient-mesa-de-vidro-e-grade-de-aco-fosco--ke5gr-/p?idsku=310128208" },
  { id: "maquina-lavar", url: "https://lista.mercadolivre.com.br/maquina-lavar-roupas-12kg-electrolux", search: true },
  { id: "microondas-brastemp", url: "https://lista.mercadolivre.com.br/microondas-brastemp-32-litros", search: true },
  { id: "lava-seca-electrolux", url: "https://www.magazineluiza.com.br/lava-e-seca-electrolux-12kg-lsc12-inverter-agua-fria-e-quente-cinza-onix/p/241187000/ed/ela1/" },
  { id: "forno-britania", url: "https://www.mercadolivre.com.br/forno-eletrico-britnia-52l-dupla-resistncia-bfe55p/p/MLB29117695" },
  { id: "purificador-electrolux", url: "https://www.casasbahia.com.br/purificador-de-agua-electrolux-pe11b-com-painel-touch-bivolt-branco/p/11688765" },
  { id: "smart-tv", url: "https://lista.mercadolivre.com.br/smart-tv-55-4k", search: true },
  { id: "sofa", url: "https://lista.mercadolivre.com.br/sofa-retratil-3-lugares", search: true },
  { id: "colchao", url: "https://lista.mercadolivre.com.br/colchao-king-molas", search: true },
  { id: "guarda-roupa", url: "https://lista.mercadolivre.com.br/guarda-roupa-casal-3-portas", search: true },
  { id: "rack", url: "https://lista.mercadolivre.com.br/rack-tv-painel", search: true },
  { id: "mesa-jantar", url: "https://lista.mercadolivre.com.br/mesa-jantar-6-lugares", search: true },
];

function parseBRL(text) {
  if (!text) return null;
  const matches = [...text.matchAll(/R\$\s*([\d.]+,\d{2})/g)];
  for (const m of matches) {
    const n = parseFloat(m[1].replace(/\./g, "").replace(",", "."));
    if (Number.isFinite(n) && n >= 10) return Math.round(n * 100);
  }
  return null;
}

async function downloadImage(imageUrl, destBase) {
  const res = await fetch(imageUrl, { redirect: "follow" });
  if (!res.ok) throw new Error(`img ${res.status}`);
  const ct = res.headers.get("content-type") || "";
  let ext = ".jpg";
  if (ct.includes("webp")) ext = ".webp";
  else if (ct.includes("png")) ext = ".png";
  const dest = destBase.replace(/\.[^.]+$/, "") + ext;
  await pipeline(res.body, createWriteStream(dest));
  return dest;
}

async function extractFromPage(page) {
  return page.evaluate(() => {
    const og = document.querySelector('meta[property="og:image"]')?.getAttribute("content");
    const title = document.querySelector('meta[property="og:title"]')?.getAttribute("content") || document.title;
    const imgs = [...document.querySelectorAll("img")]
      .map((el) => el.currentSrc || el.src || el.getAttribute("data-src"))
      .filter((s) => s && s.startsWith("http") && !/logo|sprite|icon|avatar|banner/i.test(s));
    const body = document.body?.innerText?.slice(0, 5000) || "";
    return { og, title, imgs, body };
  });
}

async function scrapeGift(page, gift) {
  await page.goto(gift.url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);

  if (gift.search && page.url().includes("lista.mercadolivre.com.br")) {
    const href = await page.evaluate(() => {
      const a = document.querySelector(
        'a.ui-search-link, a.poly-component__title, .ui-search-result__content a, h2 a',
      );
      return a?.href || null;
    });
    if (href) {
      await page.goto(href, { waitUntil: "networkidle", timeout: 60000 });
      await page.waitForTimeout(1500);
    }
  }

  const { og, title, imgs, body } = await extractFromPage(page);
  const image =
    og ||
    imgs.find((s) =>
      /mlstatic|media-amazon|vtexassets|tramontina|cloudfront|mlcdn|magazineluiza|casasbahia/i.test(s),
    ) ||
    imgs[0];

  const price = parseBRL(body);
  return { url: page.url(), title, image, price };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ locale: "pt-BR" });
  const page = await context.newPage();
  const results = {};

  for (const gift of gifts) {
    process.stdout.write(`[${gift.id}] `);
    try {
      const data = await scrapeGift(page, gift);
      if (!data.image) throw new Error("no image");
      const saved = await downloadImage(data.image, path.join(OUT_DIR, `${gift.id}.jpg`));
      const rel = `/images/gifts/${path.basename(saved)}`;
      results[gift.id] = { ...data, localImage: rel };
      console.log(data.price ? `R$ ${(data.price / 100).toFixed(2)}` : "?", rel);
    } catch (e) {
      console.log(`FAIL: ${e.message}`);
      results[gift.id] = { error: e.message };
    }
  }

  await browser.close();
  await writeFile(path.join(OUT_DIR, "scraped.json"), JSON.stringify(results, null, 2));
  console.log("Done.");
}

main();
