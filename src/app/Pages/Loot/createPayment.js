export default ({
  total,
  subtotal,
  discount,
  token,
  activeBox,
  boxCount,
  giftUserID
}) => ({
  intent: 'CAPTURE',
  purchase_units: [ {
    amount: {
      value: total,
      currency_code: 'USD',
      breakdown: {
        item_total: {
          currency_code: 'USD',
          value: subtotal
        },
        shipping_discount: {
          currency_code: 'USD',
          value: discount
        }
      }
    },
    description: 'Dank Memer Lootbox Purchase',
    custom_id: `${token}${giftUserID ? `:${giftUserID}` : ''}`,
    soft_descriptor: 'Dank Memer\'s Box Shop',
    items: [ {
      name: activeBox.name,
      unit_amount: {
        currency_code: 'USD',
        value: activeBox.price.toFixed(2)
      },
      quantity: boxCount.toString(),
      category: 'DIGITAL_GOODS'
    } ]
  } ],
  application_context: {
    brand_name: 'Dank Memer\'s Box Shop',
    shipping_preference: 'NO_SHIPPING',
    user_action: 'PAY_NOW'
  }
});