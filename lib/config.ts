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
    firebase: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
      serviceaccount: process.env.FIREBASE_SERVICE_ACCOUNT || "",
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY || "",
      privateKey: process.env.FIREBASE_PRIVATE_KEY || "",
    },
  },
};

export default config;
