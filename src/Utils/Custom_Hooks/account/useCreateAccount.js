const useCreateAccount = async (name, gmail, password) => {
  if (!name === "" || !gmail === "" || password !== "") {
    await fetch("https://rich-neckerchief-jay.cyclic.app/" + "create/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        gmail: gmail,
        password: password,
      }),
    }).then(async (data) => {
      var t = await data.json();
    });
  }
};
export { useCreateAccount };
