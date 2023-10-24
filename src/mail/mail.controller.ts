import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Public, ResponseMessage } from 'src/decorator/customize';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private mailerService: MailerService,
  ) {}

  @Get()
  @Public()
  @ResponseMessage('Test email')
  async handleTestEmail() {
    await this.mailerService.sendMail({
      to: 'duchaivu1997@gmail.com',
      from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: 'job', //'<b>welcome bla bla</b>', // HTML body content
    });
  }
}
