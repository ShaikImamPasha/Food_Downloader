const Shimmer = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="flex flex-wrap items-center justify-around mt-5">
      {data.map(() => {
        return (
          <div className="w-[180px] overflow-hidden mt-2 bg-white rounded-lg shadow-lg">
            <div className="animate-pulse bg-gray-300 h-40 w-full"></div>
            <div className="p-6">
              <div className="animate-pulse bg-gray-300 h-4 w-26 mb-4"></div>
              <div className="animate-pulse bg-gray-300 h-4 w-26 mb-4"></div>
              <div className="flex items-center">
                <div className="animate-pulse bg-gray-300 h-8 w-8 rounded-full mr-4"></div>
                <div className="animate-pulse bg-gray-300 h-4 w-16"></div>
                <div className="animate-pulse bg-gray-300 h-4 w-16"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export { Shimmer };
