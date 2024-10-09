// components/InputField.tsx
import React from 'react';
import * as Form from "@radix-ui/react-form";
import { InputNumeric } from "./ui/input-numeric";
import { NumberFormatValues } from 'react-number-format';
import { Input } from './ui/input';
import { on } from 'events';

interface InputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  suffix?: string;
  required?: boolean;
  maxValue?: number;
  decimalScale?: number;
  onChange?: (values: NumberFormatValues) => void;
}

interface InputFieldTextProps {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  onChange?: (value: string) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  suffix,
  required = false,
  maxValue,
  decimalScale,
  onChange,
}) => (
  <Form.Field className="grid mb-2.5" name={name}>
    <div className="flex items-baseline justify-between">
      {/* {required && (
        <Form.Message className="text-xs opacity-80" match="valueMissing">
          Legg inn {label.toLowerCase()}
        </Form.Message>
      )} */}
    </div>
    <div className="relative">
      <span className="absolute flex items-center h-full pl-4 pointer-events-none">
        {label}
      </span>
      <Form.Control asChild>
        <InputNumeric
          type="text"
          placeholder={placeholder}
          suffix={suffix}
          maxValue={maxValue}
          decimalScale={decimalScale}
          className="number-input"
          required={required}
          onValueChange={(values: NumberFormatValues) => {
            if (onChange) {
              onChange(values);
            }
          }}
        />
      </Form.Control>
    </div>
  </Form.Field>
);

export const InputFieldText: React.FC<InputFieldTextProps> = ({
  name,
  label,
  placeholder,
  required = false,
  onChange
}) => (
  <Form.Field className="grid mb-2.5" name={name}>
    <div className="flex items-baseline justify-between">
      {required && (
        <Form.Message className="text-xs opacity-80" match="valueMissing">
          Legg inn {label.toLowerCase()}
        </Form.Message>
      )}
    </div>
    <div className="relative">
      <span className="absolute flex items-center h-full pl-4 pointer-events-none">
        {label}
      </span>
      <Form.Control asChild>
        <Input 
          type="text"
          placeholder={placeholder}
          required={required}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (onChange) {
              onChange(event.target.value);
            }
          }}
        />
      </Form.Control>
    </div>
  </Form.Field>
);