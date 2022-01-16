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
        user: "fortestapps42@gmail.com",
        pass: "rowxapxcerpzsuzk",
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
        res.status(500).send("Send mail error in transport");
      } else {
        res.status(200).send("Mail is send");
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Send mail error");
  }
};
