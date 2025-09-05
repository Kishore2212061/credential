import puppeteer from "puppeteer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";

export const renderPDF = async ({ html, css, data, outPath }) => {
  const pageHtml = `
    <html>
      <head><meta charset="utf-8"><style>${css || ""}</style></head>
      <body>${handlebars.compile(html)(data)}</body>
    </html>`;

  if (!outPath) {
    return pageHtml;
  }

  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setContent(pageHtml, { waitUntil: "networkidle0" });

  await fs.promises.mkdir(path.dirname(outPath), { recursive: true });
  await page.pdf({ path: outPath, format: "A4", printBackground: true });
  await browser.close();
  return outPath;
};
