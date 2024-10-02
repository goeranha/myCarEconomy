import { createClient } from "@/utils/supabase/server";
import { NextResponse } from 'next/server';
import { PaymentPlan } from "@/types/interfaces";

export async function POST(request: Request) {
  const supabase = createClient();

  const data: PaymentPlan[] = await request.json();

  const { error } = await supabase
    .from('payment_plans') // Replace 'loans' with your actual table name
    .insert(data);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Data inserted successfully' }, { status: 200 });
}
