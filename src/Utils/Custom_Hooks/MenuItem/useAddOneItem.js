const useAddOneItem = (data, itemes) => {
  var a = true;
  for (var i = 0; i < itemes.length; i++) {
    if (data.id === itemes[i].id) {
      a = false;
    }
  }
  if (a) {
    let newObj = { ...data, count: 1, addSymbole: true };
    return [...itemes, newObj];
  } else {
    var add = itemes.map((innerdata) => {
      return innerdata.id === data.id && innerdata.count === 1
        ? { ...innerdata, addSymbole: true }
        : innerdata;
    });
    return add;
  }
};
export { useAddOneItem };
