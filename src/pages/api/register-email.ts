// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(400).json({ error: "Only POST requests allowed" });
    return;
  }

  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: "Email is required" });
    return;
  }

  const prisma = new PrismaClient();
  await prisma.email.create({
    data: {
      address: email,
    },
  });

  res.status(200).json({ status: "OK" });
}
