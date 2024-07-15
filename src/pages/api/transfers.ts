import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const header = {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    };
    let response = await axios.get("https://api.chapa.co/v1/transfers", header);

    let resp = response.data;
    const circularSafeData = resp;
    console.log("this", response);

    res.status(200).send({
      transfers: circularSafeData,
    });
  } catch (e: any) {
    res.status(400).json({
      error_code: e.code,
      message: e.message,
    });
  }
}
