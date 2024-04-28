'use client';
import React from 'react'
import Head from 'next/head';
import updateOrder from '@/libs/updateOrder';
import { useSearchParams } from "next/navigation";

import { useSession } from 'next-auth/react';

export default async function page() {
  const urlParams = useSearchParams();
  const orderID = urlParams.get("orderID");
  const { data: session } = useSession();
  const token= session?.user.token;
  const handleUpdateOrder = async() =>{
        
    if(orderID && token){
      try{
        await updateOrder(orderID, token);
      }catch(e){
        console.log(e);
      }
    }
  
}
  return (
    <div><Head>
    <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet" />
  </Head>
  <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div className="rounded-full h-40 w-40 bg-gray-100 mx-auto flex items-center justify-center">
        <svg className="h-20 w-20 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-semibold text-green-600">Success</h1>
        <p className="mt-2 text-gray-700">We received your purchase request<br/> we'll be in touch shortly!</p>
      </div>
    </div>
  </div></div>
  )
}
