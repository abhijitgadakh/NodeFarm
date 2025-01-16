const fs = require("fs");
const http = require("http");
const { parse } = require("url");

// Helper function to replace placeholders in the template
const replaceTemplate = (template, data) => {
  let output = template
    .replace(/{%ID%}/g, data.id)
    .replace(/{%PRODUCTNAME%}/g, data.productName)
    .replace(/{%PRICE%}/g, data.price)
    .replace(/{%IMAGE%}/g, data.image)
    .replace(/{%QUANTITY%}/g, data.quantity)
    .replace(/{%NUTRIENTS%}/g, data.nutrients)
    .replace(/{%LOCATION%}/g, data.from)
    .replace(/{%DESCRIPTION%}/g, data.description);

  output = data.organic
    ? output.replace(/{%NOT_ORGANIC%}/g, "")
    : output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};

// Load templates and data
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
);

// Create HTTP server
const server = http.createServer((req, res) => {
  const { pathname, query } = parse(req.url, true);

  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const cardsHtml = data
      .map((item) => replaceTemplate(tempCard, item))
      .join("");
    res.end(tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml));

    // Product page
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const productHtml = replaceTemplate(tempProduct, data[query.id]);
    res.end(productHtml);

    // API endpoint
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));

    // 404 - Not found
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404: Not Found</h1>");
  }
});

// Start server
server.listen(8000, "127.0.0.1", () => {
  console.log("Server is running on port 8000");
});
