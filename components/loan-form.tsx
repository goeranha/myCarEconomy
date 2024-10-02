'use client'

import { Button } from "@/components/ui/button";
import * as Form from "@radix-ui/react-form";
import { useState, FormEvent } from "react";
import InputField from "./input-field";
import { LoanCalculations, PaymentPlan } from "@/types/interfaces";
import { generatePaymentPlan, lookupResidualValue, calculateLoanTerm } from "@/utils/loanCalculations";
import useLoanForm from "@/hooks/useLoanForm";

function LoanForm() {
  const { formValues, handleInputChange } = useLoanForm();
  const [status, setStatus] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const monthlyInterestRate = (formValues.interest_rate / 100) / 12;
    const totalPayments = formValues.loan_term_years * 12;
    const loanAmount = formValues.car_price - formValues.equity_amount;

    const monthlyPayment = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);

    const taxRefund = (monthlyPayment * totalPayments - loanAmount) * 0.22;

    const residualValuePercent = lookupResidualValue(formValues.duration_of_ownership.toString());
    const residualValue = formValues.car_price * (residualValuePercent || 0);

    const loan_term_years_calculated = calculateLoanTerm(loanAmount, residualValue, formValues.interest_rate, formValues.duration_of_ownership);

    const loan_calculations: LoanCalculations = {
      car_price: formValues.car_price,
      equity_amount: formValues.equity_amount,
      loan_amount: loanAmount,
      interest_rate: formValues.interest_rate,
      loan_term_years: formValues.loan_term_years,
      loan_term_years_calculated: loan_term_years_calculated,
      duration_of_ownership: formValues.duration_of_ownership,
      residual_value: residualValue,
      payment_fee: formValues.payment_fee,
      insurance_yearly: formValues.insurance_yearly,
      service_yearly: formValues.service_yearly,
      toll_passage_monthly: formValues.toll_passage_monthly,
      monthly_payment: monthlyPayment,
      tax_refund: taxRefund,
      interest_cost_ownership: 0,
    };

    // Generer betalingsplanen
    const paymentPlan = generatePaymentPlan(loan_calculations);

    // Beregn total kostnad for duration_of_ownership
    const interestCostOwnership = paymentPlan
    .filter(payment => payment.payment_month <= (loan_calculations.duration_of_ownership * 12))
    .reduce((total, payment) => total + payment.interest_amount, 0);

    // Legg til total kostnad i loan_calculations
    loan_calculations.interest_cost_ownership = interestCostOwnership;

    try {
      const respons = await fetch('/api/loan_calculations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loan_calculations),
      });

      const result = await respons.json();

      if (respons.ok) {
        setStatus('Data submitted successfully!');
        await addPaymentPlan(result.calculation_id, loan_calculations);
      } else {
        setStatus(`Error: ${result.error}`);
      }
    } catch (error: any) {
      setStatus(`Error: ${error.message}`);
    }
    console.log(status);
  };

  const addPaymentPlan = async (calculation_id: string, loan_calculations: LoanCalculations) => {
    const paymentPlan = generatePaymentPlan(loan_calculations);

        const paymentPlanData: PaymentPlan[] = paymentPlan.map(payment => ({
                calculation_id: calculation_id,
                payment_month: payment.payment_month,
                principal_amount: payment.principal_amount,
                interest_amount: payment.interest_amount,
                monthly_payment: payment.monthly_payment,
                remaining_balance: payment.remaining_balance,
            }));

        try {
        const response = await fetch('/api/payment_plan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paymentPlanData),
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Payment plan added successfully!');
        } else {
            console.log(`Error: ${result.error}`);
        }
        } catch (error: any) {
        console.log(`Error: ${error.message}`);
        }
    };

  return (
    <div className="flex-1 w-full min-w-64 flex flex-col gap-12">
      <div>
        <h2 className="font-bold text-2xl mb-4">Next step</h2>
        <Form.Root onSubmit={handleSubmit}>
        <InputField
            name="car_price"
            label="Pris på bil"
            placeholder="500 000 kr"
            suffix=" kr"
            required
            onChange={(value) => handleInputChange('car_price', value)}
          />
          <InputField
            name="equity_amount"
            label="Egenkapital"
            placeholder="100 000 kr"
            suffix=" kr"
            required
            onChange={(value) => handleInputChange('equity_amount', value)}
          />
          <InputField
            name="loan_term_years"
            label="Løpetid lån"
            placeholder="10 år"
            suffix=" år"
            maxValue={100}
            required
            onChange={(value) => handleInputChange('loan_term_years', value)}
          />
          <InputField
            name="duration_of_ownership"
            label="Varighet eierskap"
            placeholder="5 år"
            suffix=" år"
            maxValue={100}
            required
            onChange={(value) => handleInputChange('duration_of_ownership', value)}
          />
          <InputField
            name="interest_rate"
            label="Rente"
            placeholder="2,5 %"
            suffix=" %"
            decimalScale={1}
            maxValue={10}
            required
            onChange={(value) => handleInputChange('interest_rate', value)}
          />
          <InputField
            name="payment_fee"
            label="Termingebyr"
            placeholder="50 kr"
            suffix=" kr"
            maxValue={100}
            required
            onChange={(value) => handleInputChange('payment_fee', value)}
          />
          <InputField
            name="insurance_yearly"
            label="Forsikring"
            placeholder="10 000 kr/år"
            suffix=" kr/år"
            maxValue={100000}
            required
            onChange={(value) => handleInputChange('insurance_yearly', value)}
          />
          <InputField
            name="service_yearly"
            label="Servicekostnader"
            placeholder="2 500 kr/år"
            suffix=" kr/år"
            maxValue={100000}
            required
            onChange={(value) => handleInputChange('service_yearly', value)}
          />
          <InputField
            name="toll_passage_monthly"
            label="Bompasseringer"
            placeholder="10 stk/uke"
            suffix=" stk/uke"
            maxValue={100}
            required
            onChange={(value) => handleInputChange('toll_passage_monthly', value)}
          />
          <Form.Submit asChild>
            <Button>Submit</Button>
          </Form.Submit>
        </Form.Root>
      </div>
    </div>
  );
}

export default LoanForm;