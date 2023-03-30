import { Injectable } from '@nestjs/common';
import {
  RegisterMerchantDto,
  RegisterMerchantUserDto,
} from 'src/core/auth/dto/auth.dto';
import { MailService } from 'src/core/mails/mail.service';
import { MERCHANT_CONSTANT } from 'src/core/merchants/constants/merchant.constant';
import { SignDto } from 'src/core/merchants/dto/auth-merchant.dto';
import { MerchantsService } from 'src/core/merchants/merchants.service';
import { MerchantInfoService } from 'src/core/merchant_info/merchant_info.service';
import { OtpType } from 'src/core/otp/entities/otp.entity';
import { OtpService } from 'src/core/otp/otp.service';
import { generateKey, genSignature } from 'src/shared/helper/system.helper';

@Injectable()
export class PluginAuthService {
  constructor(
    private readonly merchantsService: MerchantsService,
    private readonly merchantInfoService: MerchantInfoService,
    private readonly otpService: OtpService,
    private readonly mailService: MailService,
  ) {}
  async registerMerchantUser(body: RegisterMerchantUserDto) {
    return body;
  }

  async merchantRegister(body: RegisterMerchantDto) {
    try {
      const merchantCode = await this.merchantsService.createMerchantCode(0);
      const key = generateKey();
      const merchant = await this.merchantsService.create({
        merchantCode,
        email: body.email,
      });
      this.merchantInfoService.create({
        merchantId: merchant.id,
        ...key,
      });

      const otp = await this.otpService.create(OtpType.EMAIL, body.email);

      this.mailService.sendMailFormSystem({
        subject: MERCHANT_CONSTANT.mail.register,
        to: otp.email,
        text: otp.otp,
      });

      return merchant;
    } catch (error) {
      console.log('🚀 ~ file: auth.service.ts:17 ~ :', error);
      throw error;
    }
  }

  async sign(data: SignDto) {
    try {
      const { merchantCode } = data;
      const merchant = await this.merchantsService.findOne({ merchantCode });
      const info = await this.merchantInfoService.findOne({
        merchantId: merchant.id,
      });
      return genSignature(data, info.privateKey);
    } catch (error) {
      console.log('🚀 ~ file: auth.service.ts:50 ~ :', error);
      throw error;
    }
  }
}
