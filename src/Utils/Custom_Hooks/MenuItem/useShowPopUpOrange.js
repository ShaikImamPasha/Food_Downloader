const useShowPopUpOrange = (setIsVisible) => {
  setIsVisible(true);

  setTimeout(() => {
    setIsVisible(false);
  }, 2000);
};
export { useShowPopUpOrange };
