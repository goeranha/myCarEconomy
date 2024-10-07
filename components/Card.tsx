import React from 'react';

const Card = ({ data }: { data: any[] }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  const formatNumber = (number: number) => {
    return new Intl.NumberFormat('no', {
      style: 'currency',
      currency: 'NOK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div>
      {data.map((item) => (
        <div key={item.calculation_id} className='flex my-4'>
          <div className="bg-blue-500 rounded-lg p-6 w-80 text-white">
            {/* Header */}
            <div className="flex justify-between items-center">
                <span className="bg-white text-blue-500 px-2 py-1 rounded">AUS</span>
                <span className="text-2xl font-bold">{formatNumber(item.car_price)}</span>
            </div>

            {/* Returns Section */}
            <div className="mt-4">
                <p>Return</p>
                <div className="flex justify-between items-center mt-2">
                <span>Day</span>
                <span className="text-red-400">- $35.89</span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded">-1.35%</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                <span>Total</span>
                <span className="text-green-400">+ $3,430.89</span>
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded">+19.35%</span>
                </div>
            </div>

            {/* Available to invest */}
            <div className="bg-white text-blue-500 flex justify-between items-center p-4 rounded-lg mt-6">
                <span>Available to invest</span>
                <span className="font-bold">A $2,500.54</span>
            </div>
            </div>
        </div>
      ))}
    </div>
  );
};

export default Card;