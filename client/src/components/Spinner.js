import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-4 border-blue-500 border-solid rounded-full h-24 w-24 animate-spin">
        <div className="h-6 w-6 bg-white rounded-full"></div>
      </div>
    </div>
  );
};

export default Spinner;
