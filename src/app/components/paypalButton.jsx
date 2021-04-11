import React from 'react';
import { clientIDs } from './util/paypalButton/data.json';
import createPayment from './util/paypalButton/createPayment.js';
import { PayPalButton } from "react-paypal-button-v2";

export default function PaypalButton(props) {

    const getSubtotal = (returnRaw) => {
        const raw = props.boxCount * props.activeBox.price;
        return returnRaw ? raw : raw.toFixed(2);
    }

    const getDiscountPercent = () => {
        const { Constants, discount } = props;
        const res = {};

        const subtotal = getSubtotal(true);
        let discountPercent = props.discount;
        if (discount) {
            res.discount = true;
        }

        const hypothetical = (subtotal * ((100 - (discountPercent + Constants.FLAT_DISCOUNT_PERCENTAGE)) / 100));
        if (hypothetical >= Constants.MINIMUM_DISCOUNT_VALUE) {
            discountPercent += Constants.FLAT_DISCOUNT_PERCENTAGE;
            res.flat = true;
        } else {
            res.neededUntilFlat = Constants.MINIMUM_DISCOUNT_VALUE - hypothetical;
        }
        res.discountPercent = discountPercent;
        return res;
    };

    const getDiscount = (returnRaw) => {
        const subtotal = getSubtotal(true);
        const { discountPercent } = getDiscountPercent();
        const raw = props.activeBox.id !== 0 ? subtotal * (discountPercent / 100) : 0;
        return returnRaw ? raw : raw.toFixed(2);
    }

    const getDiscountedSubtotal = (returnRaw) => {
        const raw = getSubtotal(true) - Number(getDiscount());
        return returnRaw ? raw : raw.toFixed(2);
    }

    const onApprove = (actions) => {
        return actions.order.capture().then(data => {
            props.setFinishState({
                finish: {
                    success: true,
                    data
                }
            });
        }).catch(err => {
            props.setFinishState({
                finish: {
                    success: false,
                    data: err
                }
            });
        });
    }

    return (
        <PayPalButton 
            options={{ "client-id": clientIDs[__PAYPAL_ENV__] }}
            style={{
                height: 50,
                fontFamily: "'Inter', sans-serif",
                layout: "horizontal"
            }}
            createOrder={(_, actions) => {
                const p = createPayment({
                    total: getDiscountedSubtotal(true),
                    subtotal: getSubtotal(true),
                    discount: getDiscount(true),
                    token: props.login.token,
                    activeBox: props.activeBox,
                    boxCount: props.boxCount,
                    salesTax: (getDiscountedSubtotal(true) * 0.0675).toFixed(2),
                    ...(props.giftState === null ? {} : {
                        giftUserID: props.giftState
                    })
                });
        
                return actions.order.create(p);
            }}
            onApprove={(_, actions) => onApprove(actions)}
        />
    )
};