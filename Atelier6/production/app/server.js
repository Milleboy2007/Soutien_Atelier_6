const http = require("http");

const VERSION = process.env.APP_VERSION || "unknown";
const BUG_RATE = Number(process.env.BUG_RATE ?? "0");

function devraitCrasher() {
  if (!Number.isFinite(BUG_RATE) || BUG_RATE <= 0) return false;
  return Math.random() < BUG_RATE;
}

function json(res, code, payload) {
  res.writeHead(code, {
    "Content-Type": "application/json",
    "X-Version": VERSION,
    "Cache-Control": "no-store",
  });
  
  res.end(JSON.stringify(payload));
}

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // Simule un bug sur une portion des requêtes en fonction de BUG_RATE
    if (devraitCrasher()) {
      return json(res, 500, { status: "error", version: VERSION, message: "Crash !!!" });
    }

    return json(res, 200, { status: "ok", version: VERSION, message: "OK !" });
  }

  return json(res, 404, { status: "not_found", version: VERSION });
});

const PORT = Number(process.env.PORT ?? "3000");
server.listen(PORT, () => {
  console.log(`Listening on :${PORT} (version=${VERSION}, bug_rate=${BUG_RATE})`);
});