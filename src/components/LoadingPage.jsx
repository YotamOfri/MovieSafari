import { useEffect, useState } from "react";
import { Puff } from "react-loader-spinner";
export function LoadingPage({ setIsLoading }) {
  const [close, setClose] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    setTimeout(() => {
      setClose(true);
    }, 3000);
  }, []);
  return (
    <div
      className={`z-[60] absolute h-full w-full bg-mainbg transition-all duration-300 ease-in-out ${
        close && "opacity-0"
      }`}
    >
      <div className="fixed w-screen h-screen flex justify-center items-center">
        <Puff
          height="40"
          width="40"
          radius="6"
          color="blue"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    </div>
  );
}
