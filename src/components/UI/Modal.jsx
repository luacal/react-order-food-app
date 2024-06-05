import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, className = '' }) {
const dialog = useRef();

useEffect(()=> {
  if (open) {
    dialog.current.showModal();
  }
}, [open])

 return createPortal(
    <dialog className={`modal ${className}`} ref={dialog}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
