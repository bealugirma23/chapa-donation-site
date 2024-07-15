import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tnx_ref } = req.body;
  try {
    const header = {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    };
    let response = await axios.get(
      "https://api.chapa.co/v1/transaction/verify/" + tnx_ref,
      header
    );

    let resp = await response.data;
    console.log("this", resp);
    
    res.status(200).json({
      data: resp,
      message: "Payment successfull",
      status: "success",
    });
  } catch (e: any) {
    res.status(400).json({
      error_code: e.code,
      message: e.message,
    });
  }
}
