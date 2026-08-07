import { AppDataSource } from "./src/config/data-source";
import { app, PORT } from "./app";

AppDataSource.initialize()
  .then(() => {
    console.log("Conectado ao MongoDB");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running at http://0.0.0.0:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar no MongoDB:", error);
  });