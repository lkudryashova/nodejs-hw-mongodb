import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';
import { SWAGGER_PATH } from '../constants/paths.js';

export const setupSwagger = () => {
  try {
    const swaggerContent = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
    return [...swaggerUI.serve, swaggerUI.setup(swaggerContent)];
  } catch (err) {
    console.log(err); /*---------------------*/
    return (req, res) => {
      res.status(500).json({ status: 500, message: "Can't load swagger" });
    };
  }
};
