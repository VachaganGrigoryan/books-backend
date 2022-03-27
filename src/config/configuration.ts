// export default () => ({
//   port: parseInt(process.env.PORT, 10) || 8000,
//
//   secretKey: process.env.SECRET_KEY,
//
//   mongoose: {
//     url: process.env.MONGODB_URL,
//     user: process.env.MONGODB_USER,
//     password: process.env.MONGODB_PASSWORD,
//     host: process.env.DB_HOST,
//     port: parseInt(process.env.DB_PORT, 10) || 27017,
//   },
//
//   frontend: {
//     url: process.env.FRONTEND_URL,
//     port: parseInt(process.env.FRONTEND_PORT, 10) || 3000,
//   },
//
//   dashboard: {
//     url: process.env.DASHBOARD_URL,
//     port: parseInt(process.env.DASHBOARD_PORT, 10) || 5000,
//   },
// });
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = '../../../deployment/config.yml';

export default () => {
  return yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
};
