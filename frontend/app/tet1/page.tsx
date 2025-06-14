
'use client'
import ExampleClientComponent from '@/app/tet/ExampleClientComponent'; // Adjust path as needed
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

export default function TetPage() {
  const router = useRouter();
  return (
    <div>
       <div
        className='flex flex-col gap-8'
      >
        {/* <Link></Link> */}
        <Link href={"tet"}>tet</Link>
        <Link href={"tet1"}>tet1</Link>
        {/* <Button
          onClick={() => {
            router.push('tet')
          }}
        >
          Tet
        </Button>
        <Button
          onClick={() => {
          }}
        >
          Tet1
        </Button> */}
      </div>
      <h1>TET 1 Page</h1>

      {/* Wrap your client component that uses useSearchParams/usePathname/useRouter in Suspense */}
        <ExampleClientComponent />
      <p>Some other content on the page.</p>
    </div>
  );
}