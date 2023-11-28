import "./App.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const initialOptions = {
  clientId:
    "AdoQUb986Cigyd6JiPQYo8h9S7Rh3TIwvQiAE4_4VAUJYHOZ25Fnfa2xC2FhxKwqfxMcx5X12x021RXJ",
  currency: "PHP",
  intent: "capture",
};
function App() {
  return (
    <div className="App">
      <PayPalScriptProvider options={initialOptions}>
        {/* <input
          type="text"
          placeholder="Enter amount to deposite"
          ref={textboxRef}
          className="input"
        /> */}
        <PayPalButtons
          style={{ layout: "horizontal" }}
          createOrder={async (data, actions) => {
            // const textboxValue = textboxRef.current.value;
            const urlParams = new URLSearchParams(window.location.search);
            const amount = urlParams.get("amount");
            return await actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: initialOptions.currency,
                      value: parseInt(amount).toFixed(2),
                    },
                    description: "Deposite",
                  },
                ],
              })
              .then((order) => {
                return order;
              });
          }}
          onApprove={async (data, actions) => {
            let order = await actions.order.capture();
            console.log(order);
            window.ReactNativeWebView &&
              window.ReactNativeWebView.postMessage(JSON.stringify(order));
            return order;
          }}
          onError={(error) => {
            console.log(error);
            window.ReactNativeWebView &&
              window.ReactNativeWebView.postMessage(JSON.stringify(error));
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default App;
