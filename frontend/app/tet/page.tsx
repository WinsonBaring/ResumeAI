
'use client'
// app/tet/page.tsx
import React, { Suspense } from 'react'; // Import Suspense
import ExampleClientComponent from '@/app/tet/ExampleClientComponent'; // Adjust path as needed
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link'

export default function TetPage() {
  const router = useRouter();
  return (
    <div>
      <div
        className='flex flex-col gap-8'
      >
        {/* <Button
          onClick={() => {
            router.pu('tet')
          }}
        >
          Tet
        </Button>
        <Button
          onClick={() => {
            router.push('tet1')
          }}
        >
          Tet1
        </Button> */}
        <Link href={"tet"}>tet</Link>
        <Link href={"tet1"}>tet1</Link>
      </div>
      <h1>TET Page</h1>
      {/* Wrap your client component that uses useSearchParams/usePathname/useRouter in Suspense */}
      <ExampleClientComponent />
      <p>Some other content on the page.</p>
    </div>
  );
}