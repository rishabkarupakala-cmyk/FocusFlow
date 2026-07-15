import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
const PORT = 5000;
app.listen(PORT, () => {
console.log(
`🚀 FocusFlow API running on http://localhost:${PORT}`
);
});