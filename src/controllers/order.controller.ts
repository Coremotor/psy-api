import { Request, Response } from "express";
import mailgun from "mailgun-js";

export const createOrder = async (req: Request, res: Response) => {
  const { name, email, description } = req.body;
  const mg = mailgun({
    apiKey: process.env.MAILGUN_APIKEY,
    domain: process.env.MAILGUN_DOMAIN,
  });
  const data = {
    from: "Mailgun Sandbox <postmaster@sandboxb8ec835e31e74ece9a63b0561e1be31d.mailgun.org>",
    to: "coremotor@outlook.com",
    subject: "Get a consultation",
    text: `Name: ${name} \n Email: ${email} \n Description: ${description}`,
  };
  try {
    await mg.messages().send(data);
    res.status(200).send("Mail is send");
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Send mail error", e });
  }
};
