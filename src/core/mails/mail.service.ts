import { Injectable, Logger } from '@nestjs/common';
import nodemailer = require('nodemailer');
import { ENV_CONFIG } from 'src/shared/constants/env.constant';
import { MailOptions } from './models/mail.model';

@Injectable()
export class MailService {
  async sendMailFormSystem(mailOptions: MailOptions) {
    try {
      const { mail, pass } = ENV_CONFIG.system.mail.sendDefault;
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: mail,
          pass: pass,
        },
      });

      mailOptions.from = mail;

      await transporter.sendMail(mailOptions, function (error) {
        if (error) {
          Logger.debug('Send mail failed', error);
        } else {
          console.log('Send mail success');
        }
      });

      return true;
    } catch (error) {
      throw error;
    }
  }
}
