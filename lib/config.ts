export const config = {
  env: {
    apiEndPoint: process.env.NEXT_PUBLIC_API_ENDPOINT || "",
    flaskApiEndPoint: process.env.NEXT_PUBLIC_FLASK_API_ENDPOINT || "",
    prodApiEndPoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT || "",
    databaseUrl: process.env.DATABASE_URL || "",
    localDatabaseUrl: process.env.NEXT_PUBLIC_DB_URL || "",
    imagekit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    },
    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_REST_URL || "",
      redisToken: process.env.UPSTASH_REDIS_REST_TOKEN || "",
      qstashUrl: process.env.QSTASH_URL || "",
      qstashToken: process.env.QSTASH_TOKEN || "",
    },
    resendToken: process.env.RESEND_TOKEN || "",
  },
};

export default config;
