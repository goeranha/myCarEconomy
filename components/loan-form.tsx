'use client'

import { Button } from "@/components/ui/button";
import * as Form from "@radix-ui/react-form";
import { useState, FormEvent } from "react";
import InputField from "./input-field";
import { NumberFormatValues } from 'react-number-format';

interface FormData {
    id: number;
    bilpris: number | null;
    egenkapital: number | null;
    lopetidlan: number | null;
    varigheteierskap: number | null;
    rentesats: number | null;
    termingebyr: number | null;
    forsikring: number | null;
    service: number | null;
    bompasseringer: number | null;
  }

function LoanForm() {
  const [status, setStatus] = useState<string>('');
  const [formValues, setFormValues] = useState<FormData>({
    id: 4,
    bilpris: null,
    egenkapital: null,
    lopetidlan: null,
    varigheteierskap: null,
    rentesats: null,
    termingebyr: null,
    forsikring: null,
    service: null,
    bompasseringer: null,
  });

  const handleInputChange = (name: string, values: NumberFormatValues) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: values.floatValue || '',
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      id: formValues.id,
      bilpris: formValues.bilpris,
      egenkapital: formValues.egenkapital,
      lopetidlan: formValues.lopetidlan,
      varigheteierskap: formValues.varigheteierskap,
      rentesats: formValues.rentesats,
      termingebyr: formValues.termingebyr,
      forsikring: formValues.forsikring,
      service: formValues.service,
      bompasseringer: formValues.bompasseringer,
    };

    console.log(data)

    try {
      const response = await fetch('/api/loan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('Data submitted successfully!');
      } else {
        setStatus(`Error: ${result.error}`);
      }
    } catch (error: any) {
      setStatus(`Error: ${error.message}`);
    }
    console.log(status);
  };

  return (
    <div className="flex-1 w-full min-w-64 flex flex-col gap-12">
      <div>
        <h2 className="font-bold text-2xl mb-4">Next step</h2>
        <Form.Root onSubmit={handleSubmit}>
        <InputField
            name="bilpris"
            label="Pris på bil"
            placeholder="500 000 kr"
            suffix=" kr"
            required
            onChange={(value) => handleInputChange('bilpris', value)}
          />
          <InputField
            name="egenkapital"
            label="Egenkapital"
            placeholder="100 000 kr"
            suffix=" kr"
            required
            onChange={(value) => handleInputChange('egenkapital', value)}
          />
          <InputField
            name="lopetidlan"
            label="Løpetid lån"
            placeholder="10 år"
            suffix=" år"
            maxValue={100}
            required
            onChange={(value) => handleInputChange('lopetidlan', value)}
          />
          <InputField
            name="varigheteierskap"
            label="Varighet eierskap"
            placeholder="5 år"
            suffix=" år"
            maxValue={100}
            required
            onChange={(value) => handleInputChange('varigheteierskap', value)}
          />
          <InputField
            name="rentesats"
            label="Rente"
            placeholder="2,5 %"
            suffix=" %"
            decimalScale={1}
            maxValue={10}
            required
            onChange={(value) => handleInputChange('rentesats', value)}
          />
          <InputField
            name="termingebyr"
            label="Termingebyr"
            placeholder="50 kr"
            suffix=" kr"
            maxValue={100}
            required
            onChange={(value) => handleInputChange('termingebyr', value)}
          />
          <InputField
            name="forsikring"
            label="Forsikring"
            placeholder="10 000 kr/år"
            suffix=" kr/år"
            maxValue={100000}
            required
            onChange={(value) => handleInputChange('forsikring', value)}
          />
          <InputField
            name="service"
            label="Service"
            placeholder="2 500 kr/år"
            suffix=" kr/år"
            maxValue={100000}
            required
            onChange={(value) => handleInputChange('service', value)}
          />
          <InputField
            name="bompasseringer"
            label="Bompasseringer"
            placeholder="10 stk/uke"
            suffix=" stk/uke"
            maxValue={100}
            required
            onChange={(value) => handleInputChange('bompasseringer', value)}
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