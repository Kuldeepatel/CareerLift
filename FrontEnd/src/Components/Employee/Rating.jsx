import React from 'react';

const Rating = ({ rating, totalReviews, distribution }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
      <div className="flex items-center mb-4">
        <div className="text-4xl font-bold">{rating.toFixed(1)}</div>
        <div className="ml-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.965a1 1 0 00.95.69h4.21c.969 0 1.371 1.24.588 1.81l-3.416 2.49a1 1 0 00-.364 1.118l1.286 3.965c.3.921-.755 1.688-1.54 1.118l-3.416-2.49a1 1 0 00-1.175 0l-3.416 2.49c-.784.57-1.84-.197-1.54-1.118l1.286-3.965a1 1 0 00-.364-1.118L2.225 9.392c-.783-.57-.381-1.81.588-1.81h4.21a1 1 0 00.95-.69l1.286-3.965z" />
              </svg>
            ))}
          </div>
          <div className="text-gray-500 text-sm">{totalReviews.toLocaleString()} total</div>
        </div>
      </div>
      <div>
        {distribution.map((item, index) => (
          <div key={index} className="flex items-center text-sm">
            <span className="w-4 text-gray-600">{5 - index}</span>
            <div className="flex-1 mx-2 bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`bg-green-${item.color} h-full`}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
            <span className="text-gray-600">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rating;
