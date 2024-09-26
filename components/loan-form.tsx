'use client'

import { Button } from "@/components/ui/button";
import * as Form from "@radix-ui/react-form";
import { InputNumeric } from "./ui/input-numeric";
import { useState, FormEvent } from "react";

interface FormData {
    id: number;
    bilpris: string;
    egenkapital: string;
    lopetidLan: string;
    varighetEierskap: string;
    rentesats: string;
    termingebyr: string;
    forsikring: string;
    service: string;
    bompasseringer: string;
  }

function LoanForm() {
    const [status, setStatus] = useState<string>('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const formData = new FormData(event.currentTarget);
    
        const dataSlice = {
            id: 1,
            bilpris: formData.get('bil-pris')?.slice(0, -3) as string,
            egenkapital: formData.get('egenkapital')?.slice(0, -3) as string,
            lopetidlan: formData.get('lopetid-lan')?.slice(0, -3) as string,
            varigheteierskap: formData.get('varighet-eierskap')?.slice(0, -3) as string,
            rentesats: formData.get('rentesats')?.slice(0, -2) as string,
            termingebyr: formData.get('termingebyr')?.slice(0, -3) as string,
            forsikring: formData.get('forsikring')?.slice(0, -5) as string,
            service: formData.get('service')?.slice(0, -5) as string,
            bompasseringer: formData.get('bompasseringer')?.slice(0, -7) as string,
        };

        const data = {
            id: 2,
            bilpris: parseFloat(dataSlice.bilpris.replace(/\s+/g, '')) as number,
            egenkapital: parseFloat(dataSlice.egenkapital.replace(/\s+/g, '')) as number,
            lopetidlan: parseFloat(dataSlice.lopetidlan.replace(/\s+/g, '')) as number,
            varigheteierskap: parseFloat(dataSlice.varigheteierskap.replace(/\s+/g, '')) as number,
            rentesats: parseFloat(dataSlice.rentesats.replace(/\s+/g, '')) as number,
            termingebyr: parseFloat(dataSlice.termingebyr.replace(/\s+/g, '')) as number,
            forsikring: parseFloat(dataSlice.forsikring.replace(/\s+/g, '')) as number,
            service: parseFloat(dataSlice.service.replace(/\s+/g, '')) as number,
            bompasseringer: parseFloat(dataSlice.bompasseringer.replace(/\s+/g, '')) as number,
        }

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
        console.log(status)
      };

  return (
    <div className="flex-1 w-full min-w-64 flex flex-col gap-12">
    <div>
      <h2 className="font-bold text-2xl mb-4">Next step</h2>
      <Form.Root onSubmit={handleSubmit}>

        <Form.Field className="grid mb-2.5" name="bil-pris">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Message className="text-xs opacity-80" match="valueMissing">
              Legg inn et beløp
            </Form.Message>
          </div>
          <div className="relative">
            <span className="absolute justify-start items-center w-full h-full flex pl-4 pointer-events-none">Pris på bil</span>
            <Form.Control asChild>
                <InputNumeric type="text" placeholder="500 000 kr" className="number-input" required />
            </Form.Control>
          </div>
        </Form.Field>

        <Form.Field className="grid mb-2.5" name="egenkapital">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Message className="text-xs opacity-80" match="valueMissing">
              Legg inn egenkapital
            </Form.Message>
          </div>
          <div className="relative">
            <span className="absolute justify-start items-center w-full h-full flex pl-4 pointer-events-none">Egenkapital</span>
            <Form.Control asChild>
                <InputNumeric type="text" placeholder="100 000 kr" className="number-input" required />
            </Form.Control>
          </div>
        </Form.Field>

        <Form.Field className="grid mb-2.5" name="lopetid-lan">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Message className="text-xs opacity-80" match="valueMissing">
              Legg inn løpetid lån
            </Form.Message>
          </div>
          <div className="relative">
            <span className="absolute justify-start items-center w-full h-full flex pl-4 pointer-events-none">Løpetid lån</span>
            <Form.Control asChild>
                <InputNumeric type="text" placeholder="10 år" suffix=" år" maxValue={100} className="number-input" required />
            </Form.Control>
          </div>
        </Form.Field>

        <Form.Field className="grid mb-2.5" name="varighet-eierskap">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Message className="text-xs opacity-80" match="valueMissing">
              Legg inn varighet eierskap
            </Form.Message>
          </div>
          <div className="relative">
            <span className="absolute justify-start items-center w-full h-full flex pl-4 pointer-events-none">Varighet eierskap</span>
            <Form.Control asChild>
                <InputNumeric type="text" placeholder="5 år" suffix=" år" maxValue={100} className="number-input" required />
            </Form.Control>
          </div>
        </Form.Field>

        <Form.Field className="grid mb-2.5" name="rentesats">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Message className="text-xs opacity-80" match="valueMissing">
              Legg inn rentesats
            </Form.Message>
          </div>
          <div className="relative">
            <span className="absolute justify-start items-center w-full h-full flex pl-4 pointer-events-none">Rente</span>
            <Form.Control asChild>
                <InputNumeric type="text" decimalScale={1} placeholder="2,5 %" suffix=" %" maxValue={10} className="number-input" required />
            </Form.Control>
          </div>
        </Form.Field>

        <Form.Field className="grid mb-2.5" name="termingebyr">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Message className="text-xs opacity-80" match="valueMissing">
              Legg inn termingebyr
            </Form.Message>
          </div>
          <div className="relative">
            <span className="absolute justify-start items-center w-full h-full flex pl-4 pointer-events-none">Termingebyr</span>
            <Form.Control asChild>
                <InputNumeric type="text" placeholder="50 kr" suffix=" kr" maxValue={100} className="number-input" required />
            </Form.Control>
          </div>
        </Form.Field>

        <Form.Field className="grid mb-2.5" name="forsikring">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Message className="text-xs opacity-80" match="valueMissing">
              Legg inn forsikring
            </Form.Message>
          </div>
          <div className="relative">
            <span className="absolute justify-start items-center w-full h-full flex pl-4 pointer-events-none">Forsikring</span>
            <Form.Control asChild>
                <InputNumeric type="text" placeholder="10000 kr/år" suffix=" kr/år" maxValue={100000} className="number-input" required />
            </Form.Control>
          </div>
        </Form.Field>

        <Form.Field className="grid mb-2.5" name="service">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Message className="text-xs opacity-80" match="valueMissing">
              Legg inn service
            </Form.Message>
          </div>
          <div className="relative">
            <span className="absolute justify-start items-center w-full h-full flex pl-4 pointer-events-none">Service</span>
            <Form.Control asChild>
                <InputNumeric type="text" placeholder="2500 kr/år" suffix=" kr/år" maxValue={100000} className="number-input" required />
            </Form.Control>
          </div>
        </Form.Field>

        <Form.Field className="grid mb-2.5" name="bompasseringer">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Message className="text-xs opacity-80" match="valueMissing">
              Legg inn bompasseringer
            </Form.Message>
          </div>
          <div className="relative">
            <span className="absolute justify-start items-center w-full h-full flex pl-4 pointer-events-none">Bompasseringer</span>
            <Form.Control asChild>
                <InputNumeric type="text" placeholder="10 stk/uke" suffix=" stk/uke" maxValue={100} className="number-input" required />
            </Form.Control>
          </div>
        </Form.Field>

        <Form.Submit asChild>
          <Button>Submit</Button>
        </Form.Submit>
      </Form.Root>
    </div>
  </div>
  )
}

export default LoanForm;

