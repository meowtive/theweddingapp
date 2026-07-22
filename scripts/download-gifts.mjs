#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../public/images/gifts");

/** Official product images + store prices (cents) from Sara's links / brand catalogs */
const manifest = [
  ["jogo-panelas-ceramica", "https://assets.tramontina.com.br/upload/tramon/imagens/FAR/65120026PDM001E.jpg", 188500],
  ["frigideiras", "https://assets.tramontina.com.br/upload/tramon/imagens/CUT/20850020PDM001E.jpg", 18900],
  ["panela-pressao", "https://assets.tramontina.com.br/upload/tramon/imagens/FAR/62416200PDM001E.jpg", 174800],
  ["assadeiras-vidro", "https://assets.tramontina.com.br/upload/tramon/imagens/FAR/61315394PDM001E.jpg", 25100],
  ["formas-bolo", "https://assets.tramontina.com.br/upload/tramon/imagens/CUT/20062024PDM001E.jpg", 14300],
  ["jogo-facas", "https://assets.tramontina.com.br/upload/tramon/imagens/CUT/23699060PDM001E.jpg", 19300],
  ["potes-hermeticos", "https://assets.tramontina.com.br/upload/tramon/imagens/FAR/61227560PDM001E.jpg", 15700],
  ["aparelho-jantar", "https://assets.tramontina.com.br/upload/tramon/imagens/DEL/96010287PDM001G.jpg", 43700],
  ["faqueiro", "https://assets.tramontina.com.br/upload/tramon/imagens/CUT/23799071PDM001E.jpg", 21900],
  ["jogo-copos", "https://assets.tramontina.com.br/upload/tramon/imagens/FAR/61251075PDM001E.jpg", 12900],
  ["travessas", "https://assets.tramontina.com.br/upload/tramon/imagens/FAR/64310150PDM001G.jpg", 45125],
  ["air-fryer", "https://philco.vtexassets.com/arquivos/ids/266532/BFR38_01.jpg?v=638973323851100000", 30990],
  ["liquidificador-arno", "https://lojaarno.vteximg.com.br/arquivos/ids/182624/7895500767057_1.jpg?v=639082446827430000", 24999],
  ["cafeteira", "https://philco.vteximg.com.br/arquivos/ids/203845/CP28__0000_CP28_02.jpg?v=638761761304270000", 9990],
  ["sanduicheira", "https://philco.vteximg.com.br/arquivos/ids/272335/BGR16_04.jpg?v=638993409565900000", 18990],
  ["torradeira-electrolux", "https://electrolux.vteximg.com.br/arquivos/ids/212403/Toaster_ETS25_Perspective_Electrolux_1000x1000_principal.jpg?v=638872565857530000", 19990],
  ["mixer-philips", "https://m.media-amazon.com/images/I/51Xr8Zqcs8L._AC_SL1500_.jpg", 20990],
  ["processador-mondial", "https://lojamondial.vteximg.com.br/arquivos/ids/160464/MPN-01-BF---Foto-01.png?v=638363676148500000", 51990],
  ["chaleira-britania", "https://philco.vteximg.com.br/arquivos/ids/248656/BCH25_02.jpg?v=638742977091670000", 14990],
  ["panificadora-britania", "https://philco.vteximg.com.br/arquivos/ids/158050/Multi-pane.jpg?v=638761848165170000", 79990],
  ["jogo-cama-king", "https://d1l2khdhnk6ii8.cloudfront.net/Custom/Content/Products/98/52/985250_jogo-de-cama-alexandre-herchcovitch-queen-percal-180-fios-100-algodao_s500_638348805077724102.webp", 29750],
  ["edredom-king", "https://americanas.vteximg.com.br/arquivos/ids/14077969/7367460441_1_xlarge.jpg?v=638754470455530000", 24990],
  ["cobertores-king", "https://americanas.vteximg.com.br/arquivos/ids/14077969/7367460441_1_xlarge.jpg?v=638754470455530000", 19990],
  ["travesseiros", "https://americanas.vteximg.com.br/arquivos/ids/14710016/1520129027_1_xlarge.jpg?v=638754533949670000", 7091],
  ["almofadas", "https://americanas.vteximg.com.br/arquivos/ids/409792/2568380190_1_xlarge.jpg?v=638750817991830000", 1899],
  ["protetor-colchao", "https://americanas.vteximg.com.br/arquivos/ids/14710016/1520129027_1_xlarge.jpg?v=638754533949670000", 12990],
  ["geladeira-brastemp", "https://brastemp.vteximg.com.br/arquivos/ids/281325/01_Brastemp_Geladeira_BRO85MB_Imagem_Fr.jpg?v=639096303588500000", 599900],
  ["fogao-cooktop", "https://electrolux.vteximg.com.br/arquivos/ids/275852/7909569484654_1-1000x1000.jpg.jpg?v=638851563816870000", 68900],
  ["maquina-lavar", "https://electrolux.vteximg.com.br/arquivos/ids/266993/lavadora-compacta-com-dispenser-autolimpante-e-cesto-inox-Detalhe2.jpg?v=638729965613800000", 209900],
  ["microondas-brastemp", "https://brastemp.vteximg.com.br/arquivos/ids/266168/01_Brastemp_Micro_ondas_BMS46AB_Imagem_Frontal.jpg?v=638974471582070000", 75900],
  ["lava-seca-electrolux", "https://electrolux.vteximg.com.br/arquivos/ids/289466/7909569485637_1-1000x1000.jpg?v=639060023230270000", 419900],
  ["forno-britania", "https://philco.vteximg.com.br/arquivos/ids/273623/FORNO-ELETRICO-BFE55P-v0-17.jpg?v=638999", 39990],
  ["purificador-electrolux", "https://electrolux.vteximg.com.br/arquivos/ids/213777/PE11B.jpg?v=637716834258400000", 49990],
  ["smart-tv", "https://americanas.vteximg.com.br/arquivos/ids/590838/3069509649_1SZ.jpg?v=638750845098870000", 299900],
  ["sofa", "https://tokstok.vteximg.com.br/arquivos/ids/32279792/3-lugares-muy-marrom-mescla.jpg?v=638751677454430000", 169900],
  ["colchao", "https://americanas.vteximg.com.br/arquivos/ids/10682719/5307702736_1_xlarge.jpg?v=638754090400300000", 272999],
  ["guarda-roupa", "https://americanas.vteximg.com.br/arquivos/ids/21670663/7493701000_1_xlarge.jpg?v=638755167539800000", 99998],
  ["rack", "https://americanas.vteximg.com.br/arquivos/ids/7808305/7507478451_1_xlarge.jpg?v=638751785395100000", 62498],
  ["mesa-jantar", "https://americanas.vteximg.com.br/arquivos/ids/6749810/7481897750_1_xlarge.jpg?v=638751677454430000", 103527],
];

async function download(url, destBase) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const ct = res.headers.get("content-type") || "";
  let ext = ".jpg";
  if (ct.includes("webp")) ext = ".webp";
  else if (ct.includes("png")) ext = ".png";
  const dest = destBase + ext;
  await pipeline(res.body, createWriteStream(dest));
  return path.basename(dest);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const meta = {};
  for (const [id, url, price] of manifest) {
    process.stdout.write(`${id}... `);
    try {
      const file = await download(url, path.join(OUT_DIR, id));
      meta[id] = { localImage: `/images/gifts/${file}`, price, source: url };
      console.log("ok");
    } catch (e) {
      console.log("FAIL", e.message);
      meta[id] = { error: e.message, price, source: url };
    }
  }
  await writeFile(path.join(OUT_DIR, "manifest.json"), JSON.stringify(meta, null, 2));
}

main();
