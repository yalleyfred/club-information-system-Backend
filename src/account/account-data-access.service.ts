import { Injectable } from '@nestjs/common';
import { AccountType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
interface DuesQueryResult {
  amount: number;
  duesType: {
    name: string;
    dues: {
      amount: string;
    }[];
  };
}

interface IncomeOrExpenseQueryResult {
  amount: number;
  incomeType?: {
    name: string;
    type: AccountType;
  };
  expenseType?: {
    name: string;
    type: AccountType;
  };
}

@Injectable()
export class AccountDataAccessService {
  constructor(private readonly prisma: PrismaService) {}

  public async getAllDuesTypeAndAmountOfClubMember(userId: number, memberId: number, year: string) {
    const memberData = await this.prisma.member.findFirst({
      where: {
        id: memberId,
        userId,
        deletedAt: null,
      },
      select: {
        email: true,
        lionMemberId: true,
        name: true,
        position: true,
        active: true,
        memberDuesPayment: {
          select: {
            lionYear: true,
            amount: true,
            duesTypeId: true,
            duesType: {
              select: {
                id: true,
                name: true,
                dues: {
                  select: {
                    amount: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const { memberDuesPayment, ...memberDetails } = memberData;

    const memberDuesPaymentPerYearMap = memberDuesPayment
      .filter((payment) => payment.lionYear === year)
      .reduce((acc, curr) => {
        const duesTypeName = curr.duesType?.name;

        if (duesTypeName) {
          if (acc[duesTypeName]) {
            acc[duesTypeName] = acc[duesTypeName] + curr.amount;
            acc[duesTypeName + ' perMonth'] = curr.duesType.dues.find((dues) => {
              if (curr.duesTypeId === curr.duesType.id) return dues.amount;
            });
          } else {
            acc[duesTypeName] = curr.amount;
            acc[duesTypeName + ' perMonth'] = curr.duesType.dues.find((dues) => {
              if (curr.duesTypeId === curr.duesType.id) return dues.amount;
            });
          }
        }
        return acc;
      }, {});

    console.log('dues', memberDuesPaymentPerYearMap);
    return {
      memberDetails,
      memberDuesPaymentPerYearMap,
    };
  }

  public async getAllDuesTypeAndAmountOfClub(userId: number, year: string) {
    try {
      const allduesTypePayment = await this.getAllDuesTypeNameAndPayments(userId, year);

      const duesTypePaymentsMap = allduesTypePayment.reduce((acc, curr) => {
        const duesTypeName = curr.duesType?.name;

        if (duesTypeName) {
          if (acc[duesTypeName]) {
            acc[duesTypeName] = acc[duesTypeName] + curr.amount;
          } else {
            acc[duesTypeName] = curr.amount;
          }
        }
        return acc;
      }, {});

      return duesTypePaymentsMap;
    } catch (error) {
      throw error;
    }
  }

  public async getAllIncomeTypeAndAmountOfClub(userId: number, year: string) {
    try {
      const allIncome = await this.getAllIncomeTypeNameAndAmount(userId, year);
      const incomeTypeAmountMap = allIncome.reduce((acc, curr) => {
        const incomeType = curr.incomeType?.type;
        const incomeName = curr.incomeType.name;

        if (incomeType) {
          if (!acc[incomeType]) {
            acc[incomeType] = [
              {
                incomeName: incomeName,
                totalIncome: curr.amount,
              },
            ];
          } else {
            acc[incomeType].map((income) => {
              if (income.incomeName !== incomeName)
                return acc[incomeType].push({
                  incomeName: incomeName,
                  totalIncome: curr.amount,
                });
              if (income.incomeName === incomeName) return (income.totalIncome += curr.amount);
            });
          }
        }
        return acc;
      }, {});

      return incomeTypeAmountMap;
    } catch (error) {
      throw error;
    }
  }

  public async getAllExpenseTypeAndAmountOfClub(userId: number, year: string) {
    try {
      const allExpense = await this.getAllExpenseTypeNameAndAmount(userId, year);
      const expenseTypeAmountMap = allExpense.reduce((acc, curr) => {
        const expenseType = curr.expenseType?.type;
        const expenseName = curr.expenseType.name;

        if (expenseType) {
          if (!acc[expenseType]) {
            acc[expenseType] = [
              {
                expenseName: expenseName,
                totalexpense: curr.amount,
              },
            ];
          } else {
            acc[expenseType].map((expense) => {
              if (expense.expenseName !== expenseName)
                return acc[expenseType].push({
                  expenseName: expenseName,
                  totalexpense: curr.amount,
                });
              if (expense.expenseName === expenseName) return (expense.totalexpense += curr.amount);
            });
          }
        }
        return acc;
      }, {});

      return expenseTypeAmountMap;
    } catch (error) {
      throw error;
    }
  }

  private async getAllDuesTypeNameAndPayments(userId: number, year: string) {
    return await this.prisma.memberDuesPayment.findMany({
      where: { userId, lionYear: year, deletedAt: null },
      select: {
        amount: true,
        duesType: {
          select: {
            name: true,
            dues: {
              select: {
                amount: true,
              },
            },
          },
        },
      },
    });
  }

  private async getAllIncomeTypeNameAndAmount(
    userId: number,
    year: string
  ): Promise<IncomeOrExpenseQueryResult[]> {
    return await this.prisma.income.findMany({
      where: { userId, lionYear: year, deletedAt: null },
      select: {
        amount: true,
        incomeType: {
          select: {
            name: true,
            type: true,
          },
        },
      },
    });
  }

  private async getAllExpenseTypeNameAndAmount(
    userId: number,
    year: string
  ): Promise<IncomeOrExpenseQueryResult[]> {
    return await this.prisma.expense.findMany({
      where: { userId, lionYear: year, deletedAt: null },
      select: {
        amount: true,
        expenseType: {
          select: {
            name: true,
            type: true,
          },
        },
      },
    });
  }
}
