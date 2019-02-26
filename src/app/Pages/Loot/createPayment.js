export default ({
  subtotal,
  discountedSubtotal,
  discount,
  jwt,
  activeBox,
  boxCount
}) => ({
  payment: {
    transactions: [ {
      amount: {
        total: discountedSubtotal,
        currency: 'USD',
        details: {
          subtotal,
          discount
        }
      },
      custom: jwt,
      description: 'Meme Box Purchase',
      item_list: {
        items: [ {
          name: activeBox.name,
          quantity: boxCount,
          price: activeBox.price.toFixed(2),
          currency: 'USD'
        } ]
      }
    } ],
    note_to_payer: 'melmsie small wenis btw'
  }
});