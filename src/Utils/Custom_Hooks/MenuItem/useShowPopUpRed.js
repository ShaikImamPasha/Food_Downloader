const useShowPopUpRed = (setIsVisibleRemove) => {
  setIsVisibleRemove(true);

  setTimeout(() => {
    setIsVisibleRemove(false);
  }, 2000);
};
export { useShowPopUpRed };
