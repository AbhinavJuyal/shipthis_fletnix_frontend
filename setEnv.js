const fs = require("fs");
const path = require("path");
const successColor = "\x1b[32m%s\x1b[0m";
const checkSign = "\u{2705}";
require("dotenv").config({ path: ".env" });

const isProd = process.env.NODE_ENV === "production";

const envFile = `export const environment = {
    production: ${isProd}
    apiUrl: '${process.env.API_URL}',
};
`;
const targetPath = path.join(
  __dirname,
  isProd
    ? "./src/environments/environment.ts"
    : "./src/environments/environment.development.ts",
);
fs.writeFile(targetPath, envFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(
      successColor,
      `${checkSign} Successfully generated environment.development.ts`,
    );
  }
});
