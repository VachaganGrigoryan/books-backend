export default () => ({
  host: process.env.HOST,
  port: parseInt(process.env.PORT, 10) || 8000,

  secretKey: process.env.SECRET_KEY,

  mongoDb: {
    url: process.env.MONGODB_URL,
  },

  aws: {
    region: process.env.AWS_REGION,
    s3Bucket: process.env.AWS_S3BUCKET,
    endpoint: process.env.AWS_ENDPOINT,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },

  frontend: {
    url: process.env.FRONTEND_URL,
    port: parseInt(process.env.FRONTEND_PORT, 10) || 3000,
  },

  dashboard: {
    url: process.env.DASHBOARD_URL,
    port: parseInt(process.env.DASHBOARD_PORT, 10) || 5000,
  },
});

// import { readFileSync } from 'fs';
// import * as yaml from 'js-yaml';
// import { join } from 'path';
//
// console.log(process.env.secretKey);
//
// const YAML_CONFIG_FILENAME = '../../../deployment/config.yml';
//
// export default () => {
//   return yaml.load(
//     readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
//   ) as Record<string, any>;
// };
