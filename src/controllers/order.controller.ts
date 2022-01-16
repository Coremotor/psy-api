import { Request, Response } from "express";
import nodemailer from "nodemailer";

export const createOrder = async (req: Request, res: Response) => {
  try {
    // const name = req.body.name;
    // const from = req.body.from;
    // const message = req.body.message;
    // const to = "*******@gmail.com";
    // const smtpTransport = nodemailer.createTransport("SMTP", {
    //   service: "Gmail",
    //   auth: {
    //     user: "fortestapps42@gmail.com",
    //     pass: "KBYoshkarOla12",
    //   },
    // });

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
      from: "fortestapps42@gmail.com",
      to: "coremotor@gmail.com",
      subject: "name" + " | new message !",
      text: "message",
    };

    transport.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.log(error);
        res.status(500).send("Send mail error in transport");
      } else {
        console.log(response);
        res.status(200).send("Mail is send");
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Send mail error");
  }
};
