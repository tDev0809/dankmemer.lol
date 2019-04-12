export const login = (user) => ({
  type: 'LOGIN',
  user
});

export const logout = () => ({
  type: 'LOGOUT'
});

export const discount = (discountData) => ({
  type: 'DISCOUNT',
  discountData
})