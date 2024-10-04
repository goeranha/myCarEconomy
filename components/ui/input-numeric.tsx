import React, {useState} from "react";

import { cn } from "@/lib/css";
import { NumericFormat, NumericFormatProps, NumberFormatValues } from "react-number-format";

export interface InputProps
  extends NumericFormatProps {
  maxValue?: number;
  suffix?: string;
  decimalScale?: number;
  onValueChange?: (values: NumberFormatValues) => void;
}

const InputNumeric = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, maxValue = 10000000, onValueChange, suffix = ' kr', decimalScale = 0, ...props }, ref) => {
    const [number, setNumber] = useState<number | null>(null);

    return (
      <NumericFormat
        getInputRef={ref}
        thousandSeparator=" "
        decimalScale={decimalScale}
        fixedDecimalScale
        allowedDecimalSeparators={[',']}
        decimalSeparator=","
        allowNegative={false}
        suffix={suffix}
        value={number}
        onValueChange={onValueChange}
        isAllowed={(values: NumberFormatValues) => {
          const { floatValue } = values;
          return (floatValue ?? 0) < maxValue;
        }}
        className={cn(
          "flex h-10 w-full text-right rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        
        {...props}
      />
    );
  },
);
InputNumeric.displayName = "InputNumeric";

export { InputNumeric };
