import { Request, Response } from "express";
import mailgun from "mailgun-js";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { name, email, description } = req.body;
    const apiKey = process.env.MAILGUN_APIKEY;
    const domain = process.env.MAILGUN_DOMAIN;
    const mg = mailgun({
      apiKey,
      domain,
    });
    const data = {
      from: "Mailgun Sandbox <postmaster@sandboxb8ec835e31e74ece9a63b0561e1be31d.mailgun.org>",
      to: "coremotor@outlook.com",
      subject: "Get a consultation",
      text: `Name: ${name} \n Email: ${email} \n Description: ${description}`,
    };
    const response = await mg.messages().send(data);
    res.status(200).json({ message: "Mail is send", response });
  } catch (e) {
    res.status(500).json({ message: "Send mail error", e });
    console.log("create order error", e);
  }
};
