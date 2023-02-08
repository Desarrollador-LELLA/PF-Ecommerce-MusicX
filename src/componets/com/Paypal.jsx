import { useEffect } from "react";
import {
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import * as actions from "../../redux/actions/carritoAction";
import {useDispatch} from "react-redux";

const PaypalButton = ({ currency, showSpinner , amount, products, productos, handleBiblioteca, handleAlert}) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const style = { layout: 'horizontal',
    color:  'white',
    shape:  'rect',
    label:  'pay',
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
                    handleBiblioteca() 
                    handleAlert()
                    
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
                disabled={products.length ? false : true}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </>
    );
}

export default PaypalButton;
