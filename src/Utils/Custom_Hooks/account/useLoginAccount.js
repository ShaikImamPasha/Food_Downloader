const useLoginAccount = async (loginAccountDetailes) => {
  var userData = null;
  if (
    loginAccountDetailes.gmail !== "" ||
    loginAccountDetailes.password !== ""
  ) {
    await fetch("https://rich-neckerchief-jay.cyclic.app/" + "api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gmail: loginAccountDetailes.gmail,
        password: loginAccountDetailes.password,
      }),
    }).then(async (data) => {
      if (data.ok === true) {
        data = await data.json();
        userData = data.user;
      } else {
        console.log("enter correct data");
      }
    });
  }
  return userData;
};
export { useLoginAccount };
