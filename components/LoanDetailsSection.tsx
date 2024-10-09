import { InputField, InputFieldText } from "./InputField";
import { NumberFormatValues } from "react-number-format";
import { LoanData } from "@/types/interfaces";

interface LoanDetailsSectionProps {
  handleInputChange: (name: string, values: NumberFormatValues) => void;
  setFormValues: React.Dispatch<React.SetStateAction<LoanData>>;
}

const LoanDetailsSection = ({ handleInputChange, setFormValues }: LoanDetailsSectionProps) => (
  <div>
    <InputFieldText
      name="calculation_name"
      label="Biltype"
      placeholder="Audi A4"
      required
      onChange={(value) => setFormValues((prevValues) => ({ ...prevValues, calculation_name: value }))}
    />
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
  </div>
);

export default LoanDetailsSection;