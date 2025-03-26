
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

type EmailRequestBody = {
  type: "booking" | "contact"; // vi ska Lägga till en typ för att skilja mellan bokningar och kontaktmeddelanden
  firstName?: string;
  lastName?: string;
  email: string;
  date?: string;
  time?: string;
  treatmentType?: string;
  professionalName?: string;
  message?: string; // För kontaktmeddelanden
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const {
      type,
      firstName,
      lastName,
      email,
      date,
      time,
      treatmentType,
      professionalName,
      message,
    } = req.body as EmailRequestBody;

    // Konfigurera Nodemailer-transport
    const transporter = nodemailer.createTransport({
      service: "Gmail", 
      auth: {
        user: process.env.EMAIL_USER, // min e-postadress
        pass: process.env.EMAIL_PASSWORD, // min e-postlösenord
      },
    });

    let mailOptions;

    if (type === "booking") {
      // E-postmeddelande för bokningsbekräftelse
      mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Bokningsbekräftelse",
        text: `
          Hej ${firstName} ${lastName},

          Tack för din bokning hos oss!

          Här är dina bokningsuppgifter:
          - Datum: ${date}
          - Tid: ${time}
          - Behandling: ${treatmentType}
          - Professionell: ${professionalName}

          Välkommen!
          Tandläkarmottagningen
        `,
        html: `
          <h1>Hej ${firstName} ${lastName},</h1>
          <p>Tack för din bokning hos oss!</p>
          <p>Här är dina bokningsuppgifter:</p>
          <ul>
            <li><strong>Datum:</strong> ${date}</li>
            <li><strong>Tid:</strong> ${time}</li>
            <li><strong>Behandling:</strong> ${treatmentType}</li>
            <li><strong>Professionell:</strong> ${professionalName}</li>
          </ul>
          <p>Välkommen!</p>
          <p>Tandklinik</p>
        `,
      };
    } else if (type === "contact") {
      // E-postmeddelande för kontaktmeddelanden
      mailOptions = {
        from: process.env.EMAIL_USER,
        to: email, // Skicka en kopia till kunden
        subject: "Tack för ditt meddelande",
        text: `
          Hej ${firstName} ${lastName},

          Tack för att du kontaktade oss!

          Vi har mottagit följande meddelande från dig:
          ${message}

          Vi återkommer så snart som möjligt.

          Vänliga hälsningar,
          Tandklinik
        `,
        html: `
          <h1>Hej ${firstName} ${lastName},</h1>
          <p>Tack för att du kontaktade oss!</p>
          <p>Vi har mottagit följande meddelande från dig:</p>
          <p>${message}</p>
          <p>Vi återkommer så snart som möjligt.</p>
          <p>Vänliga hälsningar,</p>
          <p>Tandklinik</p>
        `,
      };

      // Skicka en kopia till mig själv (till kliniken)
      const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Skicka till min e-post
        subject: "Nytt kontaktmeddelande",
        text: `
          Du har fått ett nytt meddelande från ${firstName} ${lastName} (${email}):

          Meddelande:
          ${message}
        `,
        html: `
          <h1>Nytt kontaktmeddelande</h1>
          <p>Från: ${firstName} ${lastName} (${email})</p>
          <p>Meddelande:</p>
          <p>${message}</p>
        `,
      };

      try {
        await transporter.sendMail(adminMailOptions);
      } catch (error) {
        console.error("Error sending admin email:", error);
      }
    }

    try {
      // Skicka e-post till kunden
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "E-post skickad!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Kunde inte skicka e-post." });
    }
  } else {
    res.status(405).json({ error: "Metoden tillåts inte." });
  }
}