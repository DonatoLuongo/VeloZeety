import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) { }

  @Get('balance/:userId')
  async getBalance(@Param('userId') userId: string) {
    return this.walletService.getBalance(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Post('transaction/:userId')
  async processTransaction(
    @Param('userId') userId: string,
    @Body() body: { type: 'top_up' | 'payment' | 'refund' | 'withdrawal', amount: number, currency: string, reference?: string }
  ) {
    return this.walletService.processTransaction(userId, body.type, body.amount, body.currency.toUpperCase(), body.reference);
  }
}
