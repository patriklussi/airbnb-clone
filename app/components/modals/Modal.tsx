"use client";
import { useCallback, useEffect, useState } from "react";
import {IoMdClose} from "react-icons/io"
import Button from "../Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryLabel?: string;
}
const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryLabel,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    null;
  }
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focous:outline-none bg-neutral-800/70">
        <section
          className="
        relative
        w-full
        md:w-4/6
        lg:2-3/6
        xl:w-2/5
        my-6
        mx-auto
        h-full
        lg:h-auto
        md:h-auto
    
    "
        >
          {/* CONTENT */}
          <div
            className={`translate
            duration-300 
            h-full
            ${showModal ? `translate-y-0 ` : `translate-y-full`}
            ${showModal ? `opacity-100 ` : `opacty-0`}
            `}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none foucs:outline">
              <header className="flex items-center p-6 rounded-t justify-center relative border-b[1px]">
                    <button onClick={handleClose} className="p-1 border-0 hover:opacity-70 transition absolute left-9">
                        <IoMdClose size={16}/> 
                    </button>
                    <div className="text-lg font-semibold">
                        {title}
                    </div>
              </header>
              {/* Body */}
              <div className="relative p-6" flex-auto >
                {body}
              </div>
              {/* Footer */}
              <footer className="flex flex-col gap-2 p-6">
                  <div className="
                    flex
                    flex-row
                    items-center
                    gap-4
                    w-full
                  ">
                    <Button label="My Button"/>
                  </div>
              </footer>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Modal;
