import { useEffect } from "react";
import ReactDOM from "react-dom";

const ModalPortal = ({ open, children }) => {
  useEffect(() => {
    const rootElement = document.body;
    if (open) {
      rootElement.classList.add("overlay");
    } else {
      rootElement.classList.remove("overlay");
    }
  }, [open]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className="">{children}</div>
    </>,
    document.body
  );
};

export default ModalPortal;
