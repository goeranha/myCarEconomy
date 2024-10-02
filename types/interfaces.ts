export interface LoanData {
    car_price: number;
    equity_amount: number;
    interest_rate: number;
    loan_term_years: number;
    duration_of_ownership: number;
    residual_value: number;
    payment_fee: number;
    insurance_yearly: number;
    service_yearly: number;
    toll_passage_monthly: number;
    tax_refund: number;
    interest_cost_ownership: number;
  }

export interface LoanCalculations extends LoanData {
    monthly_payment: number;
    loan_amount: number;
    loan_term_years_calculated: number;
};

export interface PaymentPlan {
  calculation_id: string;
  payment_month: number;
  principal_amount: number;
  interest_amount: number;
  monthly_payment: number;
  remaining_balance: number;
}