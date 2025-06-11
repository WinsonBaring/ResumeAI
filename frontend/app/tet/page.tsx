// app/tet/page.tsx
import React, { Suspense } from 'react'; // Import Suspense
import ExampleClientComponent from '@/app/tet/ExampleClientComponent'; // Adjust path as needed

export default function TetPage() {
  return (
    <div>
      <h1>TET Page</h1>
      {/* Wrap your client component that uses useSearchParams/usePathname/useRouter in Suspense */}
      <Suspense fallback={<div>Loading search parameters...</div>}>
        <ExampleClientComponent />
      </Suspense>
      <p>Some other content on the page.</p>
    </div>
  );
}