import { useState } from "react";

export const Day = () => {
  const [day_percentage, set_day_percentage] = useState(
    86400 /
      (new Date().getHours() * 3600 +
        new Date().getMinutes() * 60 +
        new Date().getSeconds())
  );

  setInterval(() => {
    set_day_percentage(
      86400 /
        (new Date().getHours() * 3600 +
          new Date().getMinutes() * 60 +
          new Date().getSeconds())
    );
  }, 5000);

  return (
    <div className="relative flex flex-col w-full divide-y divide-gray-100 rounded">
      <span
        className="absolute w-full bg-gray-800"
        style={{
          height: "2px",
          top: `${day_percentage}%`,
        }}
      ></span>
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
              <div className="flex flex-col"></div>
            </div>
          );
        })}
    </div>
  );
};
