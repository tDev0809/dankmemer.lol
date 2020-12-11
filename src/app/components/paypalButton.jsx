import React, { useRef, useEffect, useState } from 'react';
import { clientIDs } from './util/paypalButton/data.json';
import createPayment from './util/paypalButton/createPayment.js';
import loadScript from '../util/loadScript.js';
// import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { PayPalButton } from "react-paypal-button-v2";

export default function PaypalButton(props) {
    // const [{ isPending }] = usePayPalScriptReducer();
    // const [{ scriptOptions }, dispatch] = usePayPalScriptReducer();
    const [boxCount, setBoxCount] = useState(props.boxCount);
    const [activeBox, setActiveBox] = useState(props.activeBox);

    useEffect(() => {
        setBoxCount(props.boxCount);
    }, [props.boxCount])

    const getSubtotal = (returnRaw) => {
        const raw = props.boxCount * props.activeBox.price;
        return returnRaw ? raw : raw.toFixed(2);
    }

    const getDiscountPercent = () => {
        const { Constants, discount } = props;
        const res = {};

        const subtotal = getSubtotal(true);
        
        let discountPercent = 0;
        if (discount) {
            discountPercent += discount.percent;
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
        const {discountPercent} = getDiscountPercent();
        console.log(`Discount Percent: ${discountPercent}`)
        const raw = props.activeBox.id !== 0 ? subtotal * (discountPercent / 100) : 0;
        return returnRaw ? raw : raw.toFixed(2);
    }

    const getDiscountedSubtotal = (returnRaw) => {
        const raw = getSubtotal(true) - Number(getDiscount());
        return returnRaw ? raw : raw.toFixed(2);
    }

    const createOrder = async (actions) => {
        
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
                    err
                }
            });
        });
    }

    return (
        <PayPalButton 
            options={{ "client-id": clientIDs[__PAYPAL_ENV__] }}
            style={{
                height: 50,
                fontFamily: "'Inter', sans-serif"
            }}
            createOrder={(_, actions) => {
                console.log(`Total: ${getDiscountedSubtotal(true)}\nSubtotal: ${getSubtotal(true)}\nDiscount: ${getDiscount(true).toFixed(2)}\nSales tax: ${(getDiscountedSubtotal(true) * 0.0675).toFixed(2)}`);
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