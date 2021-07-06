import { createServer } from "http";
import { config } from "dotenv";
config();
import { app } from "./app";
import seed from "./seed";
import { sequelize } from "./sequelize";
const port = process.env.PORT || 3000;

void (async () => {
  // await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
  await sequelize.sync({
    logging: console.log,
    // alter: true,
    // force: true,
  });
  await seed();
  // await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
  createServer(app).listen(port, () =>
    console.info(`Server running on port ${port}`)
  );
})();
