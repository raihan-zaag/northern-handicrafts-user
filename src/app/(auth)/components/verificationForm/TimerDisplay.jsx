import React, { useCallback, useEffect, useState } from "react";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import useResendOTP from "@/app/(auth)/hooks/useResendOtp";
import { VERIFY_EMAIL } from "@/common/config/constants/cookiesKeys";
import { Spinner } from "@/common/components/ui/spinner";

const TimerDisplay = () => {
  const [timeRemaining, setTimeRemaining] = useState(180);
  const email = getCookie(VERIFY_EMAIL);
  const { resendOTP, loading } = useResendOTP();

  const resetTimer = useCallback(async () => {
    await resendOTP(email);

    setCookie("timeRemaining", 180);
    setTimeRemaining(60);
  }, [setTimeRemaining, resendOTP, email]);

  const memoizedSetCookie = useCallback((name, value) => {
    setCookie(name, value);
  }, []);

  const memoizedDeleteCookie = useCallback((name) => {
    deleteCookie(name);
  }, []);

  useEffect(() => {
    const initialTime = getCookie("timeRemaining");
    if (initialTime) {
      initialTime === "0"
        ? setTimeRemaining(180)
        : setTimeRemaining(initialTime);
    }

    return () => {
      memoizedDeleteCookie("timeRemaining");
    };
  }, [memoizedDeleteCookie]);

  useEffect(() => {
    if (timeRemaining > 0) {
      const intervalId = setInterval(() => {
        setTimeRemaining((time) => {
          const newTime = time - 1;
          memoizedSetCookie("timeRemaining", newTime);
          return newTime;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timeRemaining, memoizedSetCookie]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 grid place-items-center bg-background/60 z-50">
          <Spinner size="xl" className="text-primary" />
        </div>
      )}

      {timeRemaining === 0 ? (
        <p
          onClick={resetTimer}
          className="text-primary text-sm font-semibold cursor-pointer underline"
        >
          Re-send Code
        </p>
      ) : (
  <p className="text-primary text-sm font-normal leading-18px">
          {`${Math.floor(timeRemaining / 180)}:${(timeRemaining % 180)
            .toString()
            .padStart(2, "0")}`}
        </p>
      )}
    </>
  );
};

export default React.memo(TimerDisplay);
