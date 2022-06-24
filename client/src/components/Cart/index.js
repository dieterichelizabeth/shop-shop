import React, { useEffect } from "react";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import "./style.css";
import { useStoreContext } from "../../utils/GlobalState";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";

// Stripe test key for development from Stripe documentation
// DO NOT INPUT SENSATIVE INFORMATION WITH THIS PUBLIC KEY
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Cart = () => {
  // Cart state variables
  const [state, dispatch] = useStoreContext();

  // Checkout query state variables
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  // useLazyQuery to run Hook on button ("checkout") click
  // data variable will contain the checkout session, but only after the query is called with the getCheckout() function
  // After the payment processes, users will be redirected to <path>/success.
  useEffect(() => {
    // redirect to Stripe once the data variable has data in it.
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  // state.cart.length is passed as a value in the dependency array to ensure the hook only executes if the depenency array has changed since last ran
  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    // if the state.cart.length === 0, retrieve the items from the cart object store
    // save it to the global state object
    // use ADD_MULTIPLE_TO_CART because we have an array of items returning from IndexedDB, even if it's just one product saved
    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    window.alert(
      "⚠️ WARNING ⚠️ - After pressing okay, the Stripe checkout page will display with an option to put in payment information. ⛔️ DO NOT ENTER SENSATIVE PERSONAL INFORMATION OR REAL CREDIT CARD NUMBERS! ⛔️ This project uses Stripe's public test key and the information that you provide is not secure."
    );

    const productIds = [];

    // loop over all items saved in state.cart then,
    // add their ID's to a new productId's array for generating the Stripe session during query
    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>
            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;
