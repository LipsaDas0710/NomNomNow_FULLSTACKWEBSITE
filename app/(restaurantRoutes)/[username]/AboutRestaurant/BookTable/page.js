// export default function ReviewsPage() {
//   return <div>This is the TABLE BOOKING section for the restaurant.</div>;
// }


// 'use client';
// import { useSearchParams } from 'next/navigation';

// export default function BookTablePage() {
//   const searchParams = useSearchParams();
//   const name = searchParams.get('name');
//   const address = searchParams.get('address');
//   const id = searchParams.get('id');
//   const lat = searchParams.get('lat');
//   const lng = searchParams.get('lng');

//   return (
//     <div>
//       <h1 className="text-2xl font-bold">{name}</h1>
//       <p>{address}</p>
//     </div>
//   );
// }


// components/BookTable.js

'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8];
const mealOptions = ['Lunch', 'Dinner'];

const slots = {
  Lunch: ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM','2:30 PM','3:00 PM','3:30 PM', '4:00 PM','4:30 PM','5:00 PM','5:30 PM'],
  Dinner: ['6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM']
};

// const getNextNDays = (n) => {
//   const days = [];
//   for (let i = 0; i < n; i++) {
//     const date = new Date();
//     date.setDate(date.getDate() + i);
//     const dayLabel = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : date.toLocaleDateString('en-US', { weekday: 'long' });
//     days.push({ label: dayLabel, value: date.toISOString().split('T')[0] });
//   }
//   return days;
// };

// const getNextNDays = (n) => {
//   const days = [];
//   const options = { weekday: 'short', day: 'numeric', month: 'short' }; // e.g., Wed, 18 Jun

//   for (let i = 0; i < n; i++) {
//     const date = new Date();
//     date.setDate(date.getDate() + i);
//     const label = date.toLocaleDateString('en-US', options); // Format as "Wed, 18 Jun"
//     const value = date.toISOString().split('T')[0]; // "2025-06-18"
//     days.push({ label, value });
//   }

//   return days;
// };

const getNextNDays = (n) => {
  const days = [];
  const options = { weekday: 'short', day: 'numeric', month: 'short' }; // e.g., Wed, 18 Jun

  for (let i = 0; i < n; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    let label;
    if (i === 0) {
      label = 'Today';
    } else if (i === 1) {
      label = 'Tomorrow';
    } else {
      label = date.toLocaleDateString('en-US', options); // "Wed, 18 Jun"
    }

    const value = date.toISOString().split('T')[0]; // "2025-06-18"
    days.push({ label, value });
  }

  return days;
};


export default function BookTable() {
  const [selectedDate, setSelectedDate] = useState(getNextNDays(6)[0].value);
  const [guestCount, setGuestCount] = useState(1);
  const [mealType, setMealType] = useState('Dinner');
  const [selectedSlot, setSelectedSlot] = useState('');
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const address = searchParams.get('address');
  const id = searchParams.get('id');
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return (
    <div className="p-4 max-w-4xl mx-auto text-gray-900 dark:text-gray-100  min-h-screen">
      <h2 className="text-xl font-bold mb-4">Select your booking details</h2>

      {/* Booking options */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Date Dropdown */}
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-700"
        >
          {getNextNDays(6).map((day) => (
            <option key={day.value} value={day.value}>
              {day.label}
            </option>
          ))}
        </select>

        {/* Guest Dropdown */}
        <select
          value={guestCount}
          onChange={(e) => setGuestCount(Number(e.target.value))}
          className="p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-700"
        >
          {guestOptions.map((guest) => (
            <option key={guest} value={guest}>
              {guest} guest{guest > 1 ? 's' : ''}
            </option>
          ))}
        </select>

        {/* Meal Type Dropdown */}
        <select
          value={mealType}
          onChange={(e) => {
            setMealType(e.target.value);
            setSelectedSlot('');
          }}
          className="p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-700"
        >
          {mealOptions.map((meal) => (
            <option key={meal} value={meal}>
              {meal}
            </option>
          ))}
        </select>
      </div>

      {/* Slot selection */}
      <h3 className="text-lg font-semibold mb-2">Select slot</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
        {slots[mealType].map((time) => (
          <div
            key={time}
            onClick={() => setSelectedSlot(time)}
            className={`cursor-pointer border rounded p-3 text-center transition ${
              selectedSlot === time
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-700'
            }`}
          >
            <div className="font-medium">{time}</div>
            
          </div>
        ))}
      </div>

      {/* Proceed to Cart */}
      <button
        disabled={!selectedSlot}
        className={`w-full p-3 rounded text-white transition ${
          selectedSlot
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Proceed to cart
      </button>
    </div>
  );
}
