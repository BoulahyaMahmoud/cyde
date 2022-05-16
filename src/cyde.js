import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toolbar } from "./toolbar";
import { Day } from "./day";
import { Routine } from "./routine";
import { useReducer } from "react";

function CYDE() {
  const [cyde, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        default:
          return state;
      }
    },
    {
      routine: localStorage.getItem("routine") ? JSON.parse(localStorage.getItem("routine")) : [],
      status: localStorage.getItem("status") ? JSON.parse(localStorage.getItem("status")) : 'off',
      chain: localStorage.getItem("chain") ? JSON.parse(localStorage.getItem("chain")) : [],
    }
  );
  
  if (false) dispatch(cyde)

  return (
    <div className="flex items-center justify-center text-sm h-screen font-serif bg-gray-500">
      <BrowserRouter>
        <div className="flex flex-col h-full w-full max-w-lg py-16">
          <Toolbar />
          <div className="flex-grow h-0 overflow-y-auto rounded-b">
            <Routes>
              <Route exact path="/" element={<Day />} />
              <Route path="/routine" element={<Routine />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default CYDE;
