const useFilterFood = (orginalData, searchtest) => {
  var filterdata = orginalData.filter((e) =>
    e.info.name.toLowerCase().includes(searchtest.toLowerCase())
  );
  return filterdata;
};
export { useFilterFood };
