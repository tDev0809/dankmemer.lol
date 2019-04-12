const discount = (state = {}, action) => {
  switch (action.type) {
    case 'DISCOUNT':
      return action.discountData;

    default:
      return null;
  }
};

export default discount;