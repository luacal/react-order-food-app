import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, className = '' }) {
const dialog = useRef();

useEffect(()=> {
  const modal = dialog.current; // recommended as a good practice

  if (open) {
    modal.showModal();
  } 
  // clean up function:
  return () => {
    modal.close();
  }
}, [open])

 return createPortal(
    <dialog className={`modal ${className}`} ref={dialog}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
