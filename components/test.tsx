import React from 'react';

const LoanTermCalculator: React.FC = () => {
  // Inputverdier
  const P: number = 350000; // Lånebeløp i kroner
  const B_t: number = 265000; // Restverdi etter t perioder i kroner
  const annualInterestRate: number = 0.025; // Årlig rente (2,5%)
  const paymentsPerYear: number = 12; // Antall betalinger per år (månedlige betalinger)
  const t: number = 5 * paymentsPerYear; // Antall perioder over 5 år
  const r: number = annualInterestRate / paymentsPerYear; // Periodisk rente

  // Funksjon for å beregne nødvendig låneløpetid
  const calculateLoanTerm = (
    P: number,
    B_t: number,
    r: number,
    t: number,
    paymentsPerYear: number
  ): number => {
    // Startverdier for N (i perioder)
    let N_lower: number = t; // Minimum løpetid er eierskapsperioden
    let N_upper: number = paymentsPerYear * 30; // Maksimum 30 år (360 måneder)
    const epsilon: number = 0.0001; // Toleranse for konvergens

    // Funksjon for å beregne restgjelden etter t perioder for en gitt N
    const balanceAtTimeT = (N: number): number => {
      // Beregn månedlig betaling M for løpetid N
      const M: number =
        (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
      // Beregn restgjelden etter t perioder
      const balance: number =
        P * Math.pow(1 + r, t) -
        M * ((Math.pow(1 + r, t) - 1) / r);
      return balance;
    };

    // Biseksjonsmetoden for å finne N
    while (N_upper - N_lower > epsilon) {
      const N_mid: number = (N_upper + N_lower) / 2;
      const balance: number = balanceAtTimeT(N_mid);

      if (balance > B_t) {
        // Restgjelden er for høy, redusér N
        N_upper = N_mid;
      } else {
        // Restgjelden er for lav, øk N
        N_lower = N_mid;
      }
    }

    // Beregn endelig N og konverter til år
    const N_final: number = (N_upper + N_lower) / 2;
    const loanTermYears: number = N_final / paymentsPerYear;

    return loanTermYears;
  };

  // Beregn nødvendig låneløpetid
  const loanTermYears: number = calculateLoanTerm(
    P,
    B_t,
    r,
    t,
    paymentsPerYear
  );

  return (
    <div>
      <h1>Låneløpetidskalkulator</h1>
      <p>Nødvendig løpetid på lånet i år: {loanTermYears.toFixed(2)} år</p>
    </div>
  );
};

export default LoanTermCalculator;