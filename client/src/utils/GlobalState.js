// createContext object to create the container to hold our global state data and functionality so we can provide it throughout the app
// useContext React Hook allows us to use the state created from createContext
import React, { createContext, useContext } from "react";
import { useProductReducer } from "./reducers";

// createContext function: creates a new Context Object
const StoreContext = createContext();
// Provider: React component type that we wrap our application in to make the state data that's passed into it as a prop available to all other components
// Consumer: used to grab and use data which the provider holds for us
const { Provider } = StoreContext;

// Custom <Provider> component
const StoreProvider = ({ value = [], ...props }) => {
  // instantiate the global object with imported useProductReducer function
  // recieves the most up-to-date version of the global state object, and dispatch
  // dispatch: method executed to update the state (specifically looking for an action object passed in as its argument)
  const [state, dispatch] = useProductReducer({
    products: [],
    categories: [],
    currentCategory: "",
  });
  // use this to confirm it works!
  // return the StoreContext's provider component with our state object and dispatch the function provided as data for the value prop
  console.log(state);
  return <Provider value={[state, dispatch]} {...props} />;
};

// custom function using useContext() Hook to be used by the components that need data from <StoreProvider>
const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
