import "reflect-metadata";
import Express, { Request, Response } from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import { AppRoutes } from "./routes";
import { connectDB } from "./database";

const app = Express();
const cors = require("cors");
const { checkSchema, validationResult } = require("express-validator");

var whitelist = [process.env.CORS_ORIGIN, process.env.CORS_ORIGIN2];
var corsOptions = {
     origin: function (origin, callback) {
          if (whitelist.indexOf(origin) !== -1) {
               callback(null, true);
          } else {
               callback(new Error("Not allowed by CORS"));
          }
     },
};

// app.use(
//      cors({
//           credentials: true,
//           origin: "*",
//           optionsSuccessStatus: 200,
//      })
// );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

AppRoutes.forEach((route) => {
     app.use(
          route.path,
          checkSchema(route.schema),
          cors(corsOptions),
          (req: Request, res: Response, next: Function) => {
               const errors = validationResult(req);

               if (!errors.isEmpty()) {
                    return res.json(validationResult(req).array());
               }

               route.action(req, res)
                    .then(() => next)
                    .catch((err) => next(err));
          }
     );
});

const startServer = async () => {
     await app.listen(process.env.PORT || 8080, () => {
          console.log(`Server running on http://127.0.0.1:${process.env.PORT}`);
     });
};

(async () => {
     await connectDB();
     await startServer();
})();
