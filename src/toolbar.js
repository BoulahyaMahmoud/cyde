import { Link } from "react-router-dom";
import Button from "./components/Button";

export const Toolbar = () => {
  return (
    <div className="w-full flex items-center gap-2 p-1 px-2 rounded-t bg-gray-900 shadow-b">
      <div className="flex items-center gap-2 flex-grow text-gray-100">
        <img
          className="h-8"
          src="/logo192.png"
          alt="CYDE"
          style={{
            WebkitTransform: "scaleX(-1)",
            transform: "scaleX(-1)",
          }}
        />
        <h1 className="text-lg">cyde</h1>
      </div>
      <Link to="/">
        <Button>day</Button>
      </Link>
      <Link to="/routine">
        <Button>routine</Button>
      </Link>
      <Button>pause</Button>
    </div>
  );
};
