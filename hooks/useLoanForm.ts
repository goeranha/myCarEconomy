import { useState } from "react";
import { LoanData } from "@/types/interfaces";
import { NumberFormatValues } from "react-number-format";

const useLoanForm = () => {
  const [formValues, setFormValues] = useState<LoanData>({
    car_price: 0,
    equity_amount: 0,
    interest_rate: 0,
    loan_term_years: 0,
    duration_of_ownership: 0,
    residual_value: 0,
    payment_fee: 0,
    insurance_yearly: 0,
    service_yearly: 0,
    toll_passage_monthly: 0,
    tax_refund: 0,
    interest_cost_ownership: 0,
  });

  const handleInputChange = (name: string, values: NumberFormatValues) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: values.floatValue || 0,
    }));
  };

  return {
    formValues,
    handleInputChange,
    setFormValues,
  };
};

export default useLoanForm;