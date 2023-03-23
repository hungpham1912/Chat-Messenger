import { Injectable } from '@nestjs/common';
import { RegisterMerchantUserDto } from 'src/core/auth/dto/auth.dto';
import { SignDto } from 'src/core/merchants/dto/auth-merchant.dto';
import { MerchantsService } from 'src/core/merchants/merchants.service';
import { MerchantInfoService } from 'src/core/merchant_info/merchant_info.service';
import { generateKey, genSignature } from 'src/shared/helper/system.helper';

@Injectable()
export class PluginAuthService {
  constructor(
    private readonly merchantsService: MerchantsService,
    private readonly merchantInfoService: MerchantInfoService,
  ) {}
  async registerMerchantUser(body: RegisterMerchantUserDto) {
    return body;
  }

  async merchantRegister() {
    try {
      const merchantCode = await this.merchantsService.createMerchantCode(0);
      const key = generateKey();
      const merchant = await this.merchantsService.create({
        merchantCode,
      });
      this.merchantInfoService.create({
        merchantId: merchant.id,
        ...key,
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
