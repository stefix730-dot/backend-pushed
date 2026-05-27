app.get("/", (req, res) => {
  res.send("ARTIFACT BACKEND LIVE");
});
console.log("SERVER FILE LOADED")
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ======================
// STATE (puszka)
// ======================
let state = {
  energy: 0,
  logs: ["artifact initialized"],
};

// ======================
// GET STATE
// ======================
app.get("/state", (req, res) => {
  res.json(state);
});

// ======================
// DONATION (fake + real hook point)
// ======================
app.post("/donation", (req, res) => {
  const amount = req.body?.amount || 1;

  state.energy += amount;
  state.logs.unshift(`feed received +${amount}`);

  // ograniczenie logów (żeby nie rosło w nieskończoność)
  state.logs = state.logs.slice(0, 20);

  res.json({
    ok: true,
    energy: state.energy,
  });
});

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Artifact backend running on port ${PORT}`);
});
