import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import ProductItem from "../ProductItem";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import spinner from "../../assets/spinner.gif";
import { idbPromise } from "../../utils/helpers";

function ProductList() {
  // retrieve the current global state object and dispatch method to update state
  const [state, dispatch] = useStoreContext();

  // destructure currentCategory data out of the state object to use in filterProducts() function
  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  // wait for our useQuery() response to come in
  // Once the data object is returned from useQuery(), we execute the dispatch function
  useEffect(() => {
    // if there's data to be stored
    if (data) {
      // store it in the global state object
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      // also take each product and save it to IndexedDB using the helper function
      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });

      // else if 'loading' is undefined in 'useQuery()' Hook
    } else if (!loading) {
      // get all data from the 'products' store (since the user is offline)
      idbPromise("products", "get").then((products) => {
        // use retreived data to set global state for offline browsing
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
