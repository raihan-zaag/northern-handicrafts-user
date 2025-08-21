// "use client";

// import Image from "next/image";
// import React, { useCallback, useEffect, useState } from "react";
// import Icons from "@/public/icons";

// const CounterBtn = ({
//   className,
//   handleCurrentCount,
//   maxLimit,
//   current,
//   disabled,
//   isCart = false,
// }) => {
//   const [counter, setCounter] = useState(current || 1);

//   const handleEffect = useCallback(() => {
//     handleCurrentCount(counter);

//     if (maxLimit < counter) {
//       setCounter(current);
//     }
//   }, [counter, maxLimit, current]);

//   useEffect(() => {
//     handleEffect();
//   }, [counter]);

//   // Reset counter whenever 'current' changes
//   useEffect(() => {
//     console.log("Fuck");
//     setCounter(current || 1);
//   }, [current]);

//   return (
//     <div
//       className={`flex justify-between items-center w-[120px]  bg-transparent border px-4 ${className} ${
//         isCart ? "lg:w-[100px] h-8" : "lg:w-40 h-12"
//       }`}
//     >
//       <button
//         onClick={() => counter > 1 && setCounter(counter - 1)}
//         disabled={disabled}
//       >
//         <Image
//           width={1000}
//           height={1000}
//           alt="minus icon"
//           src={counter > 1 ? Icons.minus : Icons.disabled_minus}
//           className="w-5 h-5"
//         />
//       </button>

//       <span className="flex justify-center text-neutral-800 text-lg font-normal min-w-10">
//         {current}
//       </span>

//       <button
//         onClick={() => counter < maxLimit && setCounter(counter + 1)}
//         // onClick={()}
//         disabled={disabled}
//       >
//         <Image
//           width={1000}
//           height={1000}
//           alt="plus icon"
//           src={maxLimit <= counter ? Icons.disabled_plus : Icons.plus}
//           className="w-5 h-5"
//         />
//       </button>
//     </div>
//   );
// };

// export default CounterBtn;

"use client";

import Image from "next/image";
import React from "react";
import Icons from "@/public/icons";

const CounterBtn = ({
  className,
  handleCurrentCount,
  maxLimit,
  current,
  disabled,
  isCart = false,
}) => {
  const handleDecrement = () => {
    if (current > 1) {
      handleCurrentCount(current - 1);
    }
  };

  const handleIncrement = () => {
    if (current < maxLimit) {
      handleCurrentCount(current + 1);
    }
  };

  return (
    <div
      className={`flex justify-between items-center w-120px bg-transparent border px-4 ${className} ${
        isCart ? "lg:w-100px h-8" : "lg:w-40 h-12"
      }`}
    >
      <button onClick={handleDecrement} disabled={disabled}>
        <Image
          width={1000}
          height={1000}
          alt="minus icon"
          src={current > 1 ? Icons.minus : Icons.disabled_minus}
          className="w-5 h-5"
        />
      </button>

      <span className="flex justify-center text-neutral-800 text-lg font-normal min-w-10">
        {current}
      </span>

      <button onClick={handleIncrement} disabled={disabled}>
        <Image
          width={1000}
          height={1000}
          alt="plus icon"
          src={maxLimit <= current ? Icons.disabled_plus : Icons.plus}
          className="w-5 h-5"
        />
      </button>
    </div>
  );
};

export default CounterBtn;
