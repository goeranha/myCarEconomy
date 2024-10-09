import React from 'react';
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MinSide = async () => {
  const supabase = createClient();

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('loan_calculations')
      .select('*');
  
    if (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  
    return data;
  };
  
  const data = await fetchData();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div>
      <Card data={data} />
      <Button><Link href="/sammenlign/legg-til-bil/">Legg til ny bil</Link></Button>
    </div>
  );
}

export default MinSide;

