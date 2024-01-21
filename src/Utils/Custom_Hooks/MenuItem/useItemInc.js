const useItemInc = (data, itemes) => {
  var addedCardData = itemes.map((innerdata) => {
    return innerdata.id === data.id
      ? { ...innerdata, count: innerdata.count + 1 }
      : innerdata;
  });
  return addedCardData;
};
export { useItemInc };
