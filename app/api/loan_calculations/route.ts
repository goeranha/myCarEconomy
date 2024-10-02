import { createClient } from "@/utils/supabase/server";
import { NextResponse } from 'next/server';
import { LoanData } from "@/types/interfaces";

export async function POST(request: Request) {
  const supabase = createClient();

  const { data: { user }} = await supabase.auth.getUser();

  const user_id = user?.id;

  const loan_calculations: LoanData = await request.json();

  const dataWithUser = { user_id, ...loan_calculations };

  const { data, error } = await supabase
    .from('loan_calculations') // Replace 'loans' with your actual table name
    .insert([dataWithUser])
    .select('calculation_id')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } 

  const calculationId: number = data.calculation_id;

  return NextResponse.json({ calculation_id: calculationId }, { status: 200 });
}
