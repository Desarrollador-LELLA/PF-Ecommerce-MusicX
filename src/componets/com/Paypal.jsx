import { useEffect } from "react";
import {
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";

const PaypalButton = ({ currency, showSpinner , amount, products}) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const style = { layout: 'horizontal',
    color:  'gold',
    shape:  'rect',
    label:  'paypal',
    height: 55,
    };
    
    const createOrder = (data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: products,
                            application_context: {
                                brand_name: "ORION MUSICX"
                            }
                        }).then((orderId) => {
                            return orderId;
                        });
                }

    const onApprove = (data, actions) => {
                return actions.order.capture().then(() => {
                    console.log("qlq")
                });
                }

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (<>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </>
    );
}

export default PaypalButton;