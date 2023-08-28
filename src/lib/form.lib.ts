import { Router } from "next/router";
import { useEffect } from "react";

export const useWarnIfUnsavedChanges = (
  unsavedChanges: boolean,
  callback: () => boolean
) => {
  useEffect(() => {
    if (unsavedChanges) {
      const routeChangeStart = () => {
        const ok = callback();
        if (!ok) {
          Router.events.emit("routeChangeError");
          throw "Abort route change. Please ignore this error.";
        }
      };
      Router.events.on("routeChangeStart", routeChangeStart);

      return () => {
        Router.events.off("routeChangeStart", routeChangeStart);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unsavedChanges]);
};
