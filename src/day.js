import { useEffect, useRef, useState } from "react";
import { useCYDE } from "./cyde";

export const day_percentage = (now) =>
  (
    (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) /
    (3600 * 24)
  ).toFixed(4);

export const Day = () => {
  const { cyde } = useCYDE();

  const [follow_percentage, set_follow_percentage] = useState(false);
  const percentage_indicator_reference = useRef();

  useEffect(() => {
    follow_percentage &&
      percentage_indicator_reference.current.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
  }, [follow_percentage]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow h-0 overflow-y-auto rounded-b">
        <div className="flex">
          <div className="divide-y divide-stone-400">
            {Array(24)
              .fill(0)
              .map((_, i) => {
                return (
                  <div
                    key={i}
                    className="flex bg-stone-200 flex justify-between items-center h-10"
                  >
                    <h1 className="flex items-center justify-center px-2 h-full bg-stone-300">
                      {i < 10 ? `0${i}` : i}
                    </h1>
                  </div>
                );
              })}
          </div>
          <div className="flex-grow relative bg-stone-100 z-0">
            <span
            onClick={() => {
              set_follow_percentage(!follow_percentage);
            }}
            ref={percentage_indicator_reference}
            className="z-50 cursor-pointer absolute w-full bg-red-500 opacity-40"
            style={{
              height: "1px",
              top: `${day_percentage(cyde.now) * 100}%`,
            }}
          ></span>
          {cyde.slots.map((slot) => {
            return (
              <div
              key={slot.offset}
              className="absolute w-full bg-black"
              style={{
                top: `${slot.offset * 100}%`,
                height: `${slot.size * 100}%`,
                }}
                ></div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
};
