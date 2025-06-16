// app/restaurant/reviews/page.jsx
// export default function ReviewsPage() {
//   return <div>This is the reviews section for the restaurant.</div>;
// }

'use client';
import { useSearchParams } from 'next/navigation';

export default function BookTablePage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const address = searchParams.get('address');

  return (
    <div>
      tavukhkfvgv
    </div>
  );
}