import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) { }

  async getBalance(userId: string) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId },
      include: {
        balances: true,
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found for this user');
    }

    return wallet;
  }

  async processTransaction(
    userId: string,
    type: 'top_up' | 'payment' | 'refund' | 'withdrawal',
    amount: number,
    currency: string,
    reference?: string
  ) {
    if (amount <= 0) {
      throw new BadRequestException('Amount must be greater than zero');
    }

    const validCurrencies = ['USDT', 'USDC', 'VES', 'USD'];
    if (!validCurrencies.includes(currency)) {
      throw new BadRequestException('Unsupported currency');
    }

    return await this.prisma.$transaction(async (tx) => {
      const wallet = await tx.wallet.findUnique({
        where: { userId },
      });

      if (!wallet) {
        throw new NotFoundException('Wallet not found');
      }

      const walletBalance = await tx.walletBalance.findUnique({
        where: {
          walletId_currency: {
            walletId: wallet.id,
            currency
          }
        }
      });

      if (!walletBalance) {
        throw new BadRequestException('Wallet balance for this currency not initialized');
      }

      // Validar saldo para pagos o retiros
      if (type === 'payment' || type === 'withdrawal') {
        const currentBalance = Number(walletBalance.balance);
        if (currentBalance < amount) {
          throw new BadRequestException(`Insufficient balance in ${currency}`);
        }
      }

      // Calcular nuevo balance
      const balanceChange = (type === 'top_up' || type === 'refund') ? amount : -amount;
      const newBalance = Number(walletBalance.balance) + balanceChange;

      // Actualizar el balance
      const updatedBalance = await tx.walletBalance.update({
        where: { id: walletBalance.id },
        data: { balance: newBalance },
      });

      // Registrar transacción
      const transaction = await tx.transaction.create({
        data: {
          walletId: wallet.id,
          type,
          amount: amount,
          currency,
          reference,
          status: 'completed',
        },
      });

      return {
        updatedBalance,
        transaction
      };
    });
  }
}
