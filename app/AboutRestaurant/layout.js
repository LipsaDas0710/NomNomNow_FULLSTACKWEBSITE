// app/restaurant/layout.js
export default function RestaurantLayout({ children }) {
  return (
    <div className="font-sans">
      {/* Top info section */}
      <div className="px-10 py-6 border-b">
        <h1 className="text-4xl font-bold">Harajuku Tokyo Cafe</h1>
        <p className="text-gray-600 mt-1">
          <span className="text-blue-700">Asian</span>, <span className="text-blue-700">Japanese</span>, <span className="text-blue-700">Sushi</span>, Coffee, Sandwich, Bakery, Desserts, Beverages
        </p>
        <p className="text-gray-500 mt-1">F-40, First Floor, Select City Walk Mall, Saket, New Delhi</p>

        {/* Open hours and contact */}
        <div className="flex items-center mt-3 gap-4 flex-wrap">
          <div className="text-red-500 border px-3 py-1 rounded-full border-red-300 text-sm font-medium">
            Open now - 9am – 12midnight (Today)
          </div>
          <div className="text-gray-700 text-sm">₹1,500 for two</div>
          <a href="tel:+919560709104" className="text-sm text-pink-600 font-medium">
            +91 95607 09104
          </a>
        </div>

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

        {/* Tabs */}
        <div className="flex gap-10 mt-6 text-gray-600 text-lg border-b">
          {['Overview', 'Order Online', 'Reviews', 'Photos', 'Menu'].map((tab, i) => (
            <a key={i} href={`#`} className={`pb-2 ${tab === 'Order Online' ? 'text-red-500 border-red-500 border-b-2' : ''}`}>
              {tab}
            </a>
          ))}
        </div>
      </div>

      {/* Page-specific content */}
      <div className="p-10">{children}</div>
    </div>
  );
}
