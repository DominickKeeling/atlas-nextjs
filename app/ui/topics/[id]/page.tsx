import React from 'react'
import { promiseHooks } from 'v8';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
 
  const { id } = await params;
  return <div>Topic Page: {id}</div>;
}