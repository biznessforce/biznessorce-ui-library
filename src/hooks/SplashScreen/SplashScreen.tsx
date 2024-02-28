import { useContext, useEffect } from "react";
import { SplashScreenContext } from "./SplashScreenProvider";

export function SplashScreen({ visible = true }) {
  // Everything are ready - remove splashscreen
  const setCount: any = useContext(SplashScreenContext);

  useEffect(() => {
    if (!visible) {
      return;
    }

    setCount((prev: number) => {
      return prev + 1;
    });

    return () => {
      setCount((prev: number) => {
        return prev - 1;
      });
    };
  }, [setCount, visible]);

  return null;
}

export default SplashScreen;
