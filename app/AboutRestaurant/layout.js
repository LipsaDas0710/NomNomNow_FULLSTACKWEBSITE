'use client'
import { useRouter } from "next/navigation";
import { useBusiness } from '../../context/SelectedBusinessContext';
import { useSearchParams } from 'next/navigation';

export default function RestaurantLayout({ children }) {
    const router=useRouter();
    const searchParams = useSearchParams();
    const name = searchParams.get('name');
    const address = searchParams.get('address');
    const category = searchParams.get('category');
    const id = searchParams.get('id');
    

const navigateWithBusinessData = (targetPath) => {
  const query = new URLSearchParams({
    name: name,
    address: address,
    category: category,
    id: id,
  }).toString();

  router.push(`${targetPath}?${query}`);
};


  return (
    <div className="font-sans">
      {/* Top info section */}
      <div className="px-10 py-6">
        <h1 className="text-4xl font-bold">{name}</h1>
        <p className="text-gray-600 mt-1">
          <span className="text-blue-700">{category}</span>, <span className="text-blue-700">Japanese</span>, <span className="text-blue-700">Sushi</span>
        </p>
        <p className="text-gray-500 mt-1">{address}</p>
       

        {/* Open hours and contact */}
        {/* <div className="flex items-center mt-3 gap-4 flex-wrap">
          <div className="text-red-500 border px-3 py-1 rounded-full border-red-300 text-sm font-medium">
            Open now - 9am – 12midnight (Today)
          </div>
          <div className="text-gray-700 text-sm">₹1,500 for two</div>
          <a href="tel:+919560709104" className="text-sm text-pink-600 font-medium">
            +91 95607 09104
          </a>
        </div> */}

        {/* Buttons */}
        <div className="mt-4 flex gap-4 flex-wrap">
          <button className="border rounded-md px-4 py-2 flex items-center gap-2">
            <span>📍</span> Direction
          </button>
          <button className="border rounded-md px-4 py-2 flex items-center gap-2">
            <span>🔗</span> Share
          </button>
          <button className="border rounded-md px-4 py-2 flex items-center gap-2">
            <span>💬</span> Reviews
          </button>
        </div>
        <div className="flex space-x-6 mt-6 mb-4 text-gray-600 text-lg border-b">
        <div
          className="cursor-pointer hover:text-red-500 pb-2 m-3"
          onClick={() => navigateWithBusinessData('/AboutRestaurant/AddReview')}
        >
            Add a Review
        </div>
        <div
          className="cursor-pointer hover:text-red-500 pb-2 m-3"
          onClick={() => navigateWithBusinessData('/AboutRestaurant/BookTable')}
        >
          Book a Table
        </div>
      </div>

      </div>

      {/* Page-specific content */}
      <div className="p-10">{children}</div>
    </div>
  );
}
