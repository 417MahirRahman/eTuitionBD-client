import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="py-15 px-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
  {[...Array(6)].map((_, index) => (
    <div
      key={index}
      className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
    >
      <div className="p-6">
        <div className="mb-4">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
          <div className="w-12 h-1 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        <div className="space-y-3 text-slate-600">
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
        </div>
        <div className="mt-6">
          <div className="h-10 bg-blue-200 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </div>
  ))}
</div>

  );
};

export default SkeletonLoader;
