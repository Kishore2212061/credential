import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "do.not.reply.to.this.17@gmail.com",
    pass: "mzlzwuozfhgevgsz", 
  },
});
