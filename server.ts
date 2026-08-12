import { AppDataSource } from "./src/config/data-source";
import { app, PORT } from "./app";

AppDataSource.initialize()
  .then(() => {
    console.log("Conectado ao MongoDB");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running at http://0.0.0.0:${PORT}`);
      console.log(`API doc running at http://0.0.0.0:${PORT}/api-docs`)
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar no MongoDB:", error);
  });