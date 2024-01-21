const useItemDec = (data, itemes) => {
  var addedCardData = itemes.map((innerdata) => {
    return innerdata.id === data.id && innerdata.count !== 1
      ? { ...innerdata, count: innerdata.count - 1 }
      : innerdata;
  });
  var removeTotalItem = itemes.map((innerdata) => {
    return innerdata.id === data.id && innerdata.count === 1
      ? { ...innerdata, addSymbole: false }
      : innerdata;
  });
  var temp = false;
  for (var i = 0; i < itemes.length; i++) {
    if (data.id === itemes[i].id && itemes[i].count === 1) {
      temp = true;
    }
  }
  if (temp) {
    return removeTotalItem;
  } else {
    return addedCardData;
  }
};
export { useItemDec };
