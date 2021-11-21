import Link from 'next/link';

import { Modal } from '@components/common/';

interface LoginProps {
  showModal: boolean;
  setShowModal: (arg: boolean) => void;
}

function Login({ showModal, setShowModal }: LoginProps) {
  return (
    <Modal setShowModal={setShowModal} showModal={showModal} label="login">
      <div className="sm:my-8 sm:align-middle sm:max-w-lg sm:w-full inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl">
        <div className="sm:p-6 sm:pb-3 px-4 pt-5 bg-white">
          <div className="flex items-center justify-between w-full pb-4 border-b border-gray-300">
            Login or Register
            <button className="" onClick={() => setShowModal(!showModal)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="sm:flex sm:items-start py-4">
            <div className="sm:mt-0 sm:ml-4 sm:text-left mt-4 text-center">
              <h3 className="text-lg font-medium leading-6 text-gray-900" id="login">
                Welcome to Formula
              </h3>
              <div className="flex flex-col mt-4 space-y-2">
                <div>
                  <label className="text-sm" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="focus:outline-none w-full px-4 py-2 border border-gray-600 rounded-sm"
                    type="email"
                    name="email"
                  />
                </div>
                <div>
                  <label className="text-sm" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="focus:outline-none w-full px-4 py-2 border border-gray-600 rounded-sm"
                    type="password"
                    name="password"
                  />
                </div>
                <button className="w-full px-4 py-2 text-white bg-black border border-black rounded-sm">
                  Continue
                </button>
              </div>
              <div className="mt-8">
                <p className="text-xs text-gray-500">
                  By signing up, you agree to our
                  <Link href="/">
                    <a className="font-semibold underline"> Terms of Use</a>
                  </Link>{' '}
                  and{' '}
                  <Link href="/">
                    <a className="font-semibold underline"> Privacy Policy</a>
                  </Link>
                  . We may send you communications; you may change your preferences in your account
                  settings
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Login;
