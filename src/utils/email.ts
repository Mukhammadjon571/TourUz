import * as nodemailer from 'nodemailer';
import config from 'src/config';

// For create email obj to send actual emails.
class Email {
  to: string;
  fullName: string;
  code: string;
  from: string;

  constructor(user, code) {
    this.to = user.email;
    this.fullName = user.full_name;
    this.code = code;
    this.from = `TourUz <${process.env.EMAIL_FROM}>`;
  }

  // Create different transports for different environments
  newTransport() {
    if (config.server.env === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: config.sendGrid.username,
          pass: config.sendGrid.password,
        },
      });
    }
    return nodemailer.createTransport({
      host: config.mailService.host,
      secure: false,
      debug: true,
      port: config.mailService.port,
      auth: {
        user: config.mailService.user,
        pass: config.mailService.pass,
      },
    });
  }

  // Send the actual email
  async send(code, subject) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject:subject,
      text: `Confirmation code: ${code}`,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendCode() {
    await this.send(this.code, "Confirmation code");
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)',
    );
  }
}

export { Email };
