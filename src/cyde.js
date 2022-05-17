import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toolbar } from "./toolbar";
// import { Day } from "./day";
import { Routine } from "./routine";
import { createContext, useContext, useEffect, useReducer } from "react";
import { Day } from "./day";
import { day_percentage } from "./day";

const CYDEContext = createContext();

function CYDE() {
  const chain = (
    localStorage.getItem("chain")
      ? JSON.parse(localStorage.getItem("chain"))
      : []
  ).map((toggle) => new Date(toggle));

  const [cyde, dispatch] = useReducer(
    (state, action) => {
      let _;
      switch (action.type) {
        case "toggle":
          _ = {
            ...state,
            chain: [...state.chain, new Date()],
            status: state.status === "on" ? "off" : "on",
          };
          localStorage.setItem("chain", JSON.stringify(_.chain));
          return _;
        case "set_routine":
          _ = { ...state, routine: action.routine };
          localStorage.setItem("routine", JSON.stringify(_.routine));
          return _;
        case "pulse":
          _ = {
            ...state,
            
            // TODO: stop when it's past current day.
            slots: state.chain.reduce((slots, _, i) => {
              if ((state.chain.length - i) % 2) {
            
                const start = state.chain[state.chain.length - i - 1]
              
                const end =
                state.chain.length - i === state.chain.length
                ? new Date()
                : state.chain[state.chain.length - i];

                const slot = {
                  offset: day_percentage(start),
                  start,
                  end,
                  size: (end.getTime() - start.getTime()) / 1000 / (3600 * 24),
                };

                return [...slots, slot];
              }
              
              return slots;
            }, []),
            
            now: new Date(),
          };
          return {..._};
        case "reset":
          _ = { ...state, status: "off", chain: [] };
          localStorage.setItem("chain", JSON.stringify(_.chain));
          return _;
        default:
          return state;
      }
    },
    {
      routine: localStorage.getItem("routine")
        ? JSON.parse(localStorage.getItem("routine"))
        : [],
      status: chain.length % 2 ? "on" : "off",
      chain,
      slots: [],
      now: new Date(),
    }
  );

  useEffect(() => {
    const pulse = setInterval(() => {
      dispatch({ type: "pulse"});
    }, 1000);
    return () => clearInterval(pulse);
  }, []);

  return (
    <div className="flex items-center justify-center text-sm h-screen font-serif bg-gray-500">
      <BrowserRouter>
        <CYDEContext.Provider value={{ cyde, dispatch }}>
          <div className="flex flex-col h-full w-full max-w-lg py-16">
            <Toolbar />
            <div className="flex-grow rounded-b">
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
