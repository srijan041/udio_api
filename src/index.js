import { PORT } from './constants.js';
import dotenv from 'dotenv';
import { app } from './app.js';
import automateUpload from './api/upload.selenium.js';

dotenv.config({
  path: "./env",
})

automateUpload()

app.listen(PORT, () => {
  console.log(`Server running : http://localhost:${PORT}`);
})
app.on("error", (error) => {
  console.log("ERROR: ", error);
  throw error;
})
