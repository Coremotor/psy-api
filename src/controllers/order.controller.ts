import { Request, Response } from "express";
import nodemailer from "nodemailer";

export const createOrder = async (req: Request, res: Response) => {
  const { name, email, description } = req.body;
  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: process.env.SMTP_LOGIN,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: email,
      to: "coremotor@gmail.com",
      subject: `Order from ${name} ${email}`,
      text: description,
    };

    transport.sendMail(mailOptions, function (error, response) {
      if (error) {
        res
          .status(500)
          .json({ message: "Send mail error in transport", error });
      } else {
        res.status(200).send("Mail is send");
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Send mail error");
  }
};
