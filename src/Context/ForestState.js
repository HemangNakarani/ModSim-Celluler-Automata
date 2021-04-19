import React, { useContext, useReducer, useEffect } from "react";

const ForestContext = React.createContext();
const initialState = {
  numCols: 50,
  numRows: 50,
  probTree: 0.8,
  probBurning: 0.0005,
  probImmune: 0.4,
  probLightning: 0.00001,
  timestep: 50,
  twostepstoburn: false,
  neighbours:false,
};

const reducer = (state, action) => {
  if (action.type === "SET_PROB_TREE") {
    return { ...state, probTree: action.payload };
  }
  if (action.type === "SET_PROB_BURNING") {
    return { ...state, probBurning: action.payload };
  }
  if (action.type === "SET_PROB_IMMUNE") {
    return { ...state, probImmune: action.payload };
  }
  if (action.type === "SET_PROB_LIGHTNING") {
    return { ...state, probLightning: action.payload };
  }
  if (action.type === "SET_TIMESTEP") {
    return { ...state, timestep: action.payload };
  }
  if (action.type === "TOGGLE_TWOSTEPSTOBURN") {
    return { ...state, twostepstoburn: !state.twostepstoburn };
  }
  if (action.type === "TOGGLE_NEIGHBOURS") {
    return { ...state, neighbours: !state.neighbours };
  }

  throw new Error("no matching action type");
};

const ForestContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setProbTree = (prob) => {
    dispatch({ type: "SET_PROB_TREE", payload: prob });
  };

  const setProbBurning = (prob) => {
    dispatch({ type: "SET_PROB_BURNING", payload: prob });
  };

  const setProbImmune = (prob) => {
    dispatch({ type: "SET_PROB_IMMUNE", payload: prob });
  };

  const setProbLightning = (prob) => {
    dispatch({ type: "SET_PROB_LIGHTNING", payload: prob });
  };

  const setTimeStep = (val) => {
    dispatch({ type: "SET_TIMESTEP", payload: val });
  };

  const toggleTwoStepsToBurn = () => {
    dispatch({ type: "TOGGLE_TWOSTEPSTOBURN" });
  };

  const toggleNeighbours = () => {
    dispatch({ type: "TOGGLE_NEIGHBOURS" });
  };

  useEffect(() => {
    // dispatch({ type: 'GET_TOTALS' })
  }, [state.cart]);

  return (
    <ForestContext.Provider
      value={{
        ...state,
        setProbTree,
        setProbBurning,
        setProbImmune,
        setProbLightning,
        setTimeStep,
        toggleTwoStepsToBurn,
        toggleNeighbours
      }}
    >
      {children}
    </ForestContext.Provider>
  );
};

export const useForestContext = () => {
  return useContext(ForestContext);
};

export { ForestContext, ForestContextProvider };
