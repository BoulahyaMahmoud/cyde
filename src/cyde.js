import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toolbar } from "./toolbar";
import { Day } from "./day";
import { Routine } from "./routine";
import { createContext, useContext, useReducer } from "react";

const CYDEContext = createContext();

function CYDE() {
  const [cyde, dispatch] = useReducer(
    (state, action) => {
      let _
      switch (action.type) {
        case "toggle":
           _ = { ...state, status: state.status === "on" ? "off" : "on", chain: [...state.chain, new Date()] };
          localStorage.setItem("status", JSON.stringify(_.status));
          localStorage.setItem("chain", JSON.stringify(_.chain));
          return _;
        case "set_routine":
          _ = { ...state, routine: action.routine };
          localStorage.setItem("routine", JSON.stringify(_.routine));
          return _;
        default:
          return state;
      }
    },
    {
      routine: localStorage.getItem("routine")
        ? JSON.parse(localStorage.getItem("routine"))
        : [],
      status: localStorage.getItem("status")
        ? JSON.parse(localStorage.getItem("status"))
        : "off",
      chain: localStorage.getItem("chain")
        ? JSON.parse(localStorage.getItem("chain"))
        : [],
    }
  );

  return (
    <div className="flex items-center justify-center text-sm h-screen font-serif bg-gray-500">
      <BrowserRouter>
        <CYDEContext.Provider value={{cyde, dispatch}}>
          <div className="flex flex-col h-full w-full max-w-lg py-16">
            <Toolbar />
            <div className="flex-grow h-0 overflow-y-auto rounded-b">
              <Routes>
                <Route exact path="/" element={<Day />} />
                <Route path="/routine" element={<Routine />} />
              </Routes>
            </div>
          </div>
        </CYDEContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export const useCYDE = () => useContext(CYDEContext);

export default CYDE;
