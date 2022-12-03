export const useGetLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("current_account"));

  const users = JSON.parse(localStorage.getItem("items"));

  return { user, users };
};

export const priceTransform = (price) => {
  let milion = Math.floor(price / 1000000);
  let thousand = Math.floor((price - milion * 1000000) / 1000);
  return `${milion}.${thousand}.000 VND`;
};

export const updateLocalStorage = (accountCurrent, accounts, updateCart) => {
  const resCurr = { ...accountCurrent, cart: updateCart };
  const res = accounts.map((user) => {
    if (user.email === accountCurrent.email) {
      return resCurr;
    } else {
      return user;
    }
  });
  localStorage.setItem("items", JSON.stringify(res));
  localStorage.setItem("current_account", JSON.stringify(resCurr));
};
