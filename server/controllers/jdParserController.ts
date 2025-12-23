import { Request, Response } from "express";
import { parseJD_AI } from "../services/jdParserService";

export const parseJobDescription = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    if (!text || text.length < 20) {
      return res.status(400).json({
        success: false,
        message: "JD text required & must be meaningful"
      });
    }

    const parsed = await parseJD_AI(text);

    return res.status(200).json({
      success: true,
      message: "AI Parsed JD data",
      data: parsed,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
