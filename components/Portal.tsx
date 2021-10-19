import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal: FC = ({ children }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        console.log(mounted);
        setMounted(true);
        return () => setMounted(false);
    }, []);

    return mounted
        ? createPortal(
              children,
              document.querySelector("#portal") as HTMLElement
          )
        : null;
};

export default Portal;
