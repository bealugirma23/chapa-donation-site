import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  //   NextApiResponse<Data>
) {
  try {
    const header = {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
      },
    };

    const response = await axios
      .get("https://api.chapa.co/v1/banks", header)
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        res.status(400).json({
          message: error,
        });
      });

    res.status(200).json(response.data);
  } catch (e) {
    res.status(400).json({
      error_code: e.code,
      message: e.message,
    });
  }
}
