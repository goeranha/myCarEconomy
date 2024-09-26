import { createClient } from "@/utils/supabase/server";
import { NextResponse } from 'next/server';

interface LoanData {
    id: number;
    bilpris: number;
    egenkapital: number;
    lopetidlan: number;
    varighetEierskap: number;
    rentesats: number;
    termingebyr: number;
    forsikring: number;
    service: number;
    bompasseringer: number;
  }  

export async function POST(request: Request) {
  const supabase = createClient();

  const data: LoanData = await request.json();

  const { error } = await supabase
    .from('loans') // Replace 'loans' with your actual table name
    .insert([data]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Data inserted successfully' }, { status: 200 });
}
