// export default function ReviewsPage() {
//   return <div>This is the TABLE BOOKING section for the restaurant.</div>;
// }


'use client';
import { useSearchParams } from 'next/navigation';

export default function BookTablePage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const address = searchParams.get('address');

  return (
    <div>
      <h1 className="text-2xl font-bold">{name}</h1>
      <p>{address}</p>
    </div>
  );
}
