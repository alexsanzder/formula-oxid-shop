import React from 'react';

import { Portal } from '..';

interface ModalProps {
  showModal: boolean;
  setShowModal: (arg: boolean) => void;
  children: React.ReactNode;
  label: string;
}
const Modal = ({ children, showModal, setShowModal, label }: ModalProps) => {
  return (
    <>
      <Portal>
        <div
          className="fixed inset-0 z-[100] overflow-y-auto"
          aria-labelledby={label}
          role="dialog"
          aria-modal="true"
        >
          <div className="sm:block sm:p-0 flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center">
            <div
              className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75"
              aria-hidden="true"
              onClick={() => setShowModal(!showModal)}
            ></div>

            <span className="sm:inline-block sm:align-middle sm:h-screen hidden" aria-hidden="true">
              &#8203;
            </span>

            {children}
          </div>
        </div>
      </Portal>
    </>
  );
};

export default Modal;
