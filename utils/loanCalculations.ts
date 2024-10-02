import { LoanCalculations } from '../types/interfaces';
import { residualValues } from '../lib/residualValue';

export const generatePaymentPlan = (loan_calculations: LoanCalculations) => {
    const { loan_amount, interest_rate, loan_term_years, monthly_payment } = loan_calculations;
    const monthlyInterestRate = (interest_rate / 100) / 12;
    const totalPayments = loan_term_years * 12;

    let balance = loan_amount;
    const paymentPlan = [];

    for (let i = 0; i < totalPayments; i++) {
      const interestPayment = balance * monthlyInterestRate;
      const principalPayment = monthly_payment - interestPayment;
      balance -= principalPayment;

      paymentPlan.push({
        payment_month: i + 1,
        principal_amount: principalPayment,
        interest_amount: interestPayment,
        monthly_payment: principalPayment + interestPayment,
        remaining_balance: balance,
      });
    }

    return paymentPlan;
  };

  export const lookupResidualValue = (year: string): number | null => {
    return residualValues[year] !== undefined ? residualValues[year] : null;
  };

  export const calculateLoanTerm = (
    loan_amount: number,
    residual_value: number,
    interest_rate: number,
    duration_of_ownership: number,
  ): number => {
    // Startverdier for N (i perioder)
    const r: number = interest_rate / 100 / 12; // Periodisk rente
    const t: number = duration_of_ownership * 12; // Antall perioder over eierskapsperioden
    let N_lower: number = t; // Minimum løpetid er eierskapsperioden
    let N_upper: number = 12 * 30; // Maksimum 30 år (360 måneder)
    const epsilon: number = 0.0001; // Toleranse for konvergens

    // Funksjon for å beregne restgjelden etter t perioder for en gitt N
    const balanceAtTimeT = (N: number): number => {
      // Beregn månedlig betaling M for løpetid N
      const M: number =
        (loan_amount * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
      // Beregn restgjelden etter t perioder
      const balance: number =
      loan_amount * Math.pow(1 + r, t) -
        M * ((Math.pow(1 + r, t) - 1) / r);
      return balance;
    };

    // Biseksjonsmetoden for å finne N
    while (N_upper - N_lower > epsilon) {
      const N_mid: number = (N_upper + N_lower) / 2;
      const balance: number = balanceAtTimeT(N_mid);

      if (balance > residual_value) {
        // Restgjelden er for høy, redusér N
        N_upper = N_mid;
      } else {
        // Restgjelden er for lav, øk N
        N_lower = N_mid;
      }
    }

    // Beregn endelig N og konverter til år
    const N_final: number = (N_upper + N_lower) / 2;
    const loanTermYears: number = N_final / 12;

    return loanTermYears;
  };