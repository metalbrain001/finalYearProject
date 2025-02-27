import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient, resend } from "@upstash/qstash";
import config from "./config";

export const workflowClient = new WorkflowClient({
  token: config.env.upstash.qstashToken,
  baseUrl: config.env.upstash.qstashUrl,
});

export const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

export const sendEmail = async (
  email: string,
  subject: string,
  message: string
) => {
  await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resendToken }),
    },
    body: {
      from: "Metal Brain <hello.metalbrain.net>",
      to: [email],
      subject: subject,
      html: message,
    },
  });
};
