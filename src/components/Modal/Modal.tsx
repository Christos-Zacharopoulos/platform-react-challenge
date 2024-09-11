import ReactDOM from "react-dom";
import { PropsWithChildren } from "react";
import Button from "../Button";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal = ({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<ModalProps>) => {
  const root = document.getElementById("modal-root");

  if (!isOpen || !root) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 right-0 bottom-0  bg-opacity-70 bg-slate-500 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className=" bg-gray-800 p-3 max-w-screen-xl w-full max-h-[100vh] overflow-auto  rounded-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4 ">
          <Button onClick={onClose}>Close</Button>
        </div>
        {children}
      </div>
    </div>,
    root
  );
};

export default Modal;
