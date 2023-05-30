import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { allDuesInterface } from 'src/interface/all-dues.interface';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserMail(email: string, subject: string, template: string, context: object) {
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: subject,
      template: template, // `.hbs` extension is appended automatically
      context: context,
    });
  }
}
