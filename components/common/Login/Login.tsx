import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

import { Modal } from '@components/common/';
import { yupResolver } from '@hookform/resolvers/yup';

interface LoginProps {
  showModal: boolean;
  setShowModal: (arg: boolean) => void;
}

type LoginFormInputs = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

function Login({ showModal, setShowModal }: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <Modal setShowModal={setShowModal} showModal={showModal} label="login">
      <div className="sm:my-8 sm:align-middle sm:max-w-lg sm:w-full inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl">
        <div className="sm:p-6 sm:pb-3 px-4 pt-5 bg-white">
          <div className="flex items-center justify-between w-full pb-4 border-b border-gray-300">
            Login or Register
            <button onClick={() => setShowModal(!showModal)} aria-label="Close modal">
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
              <form className="flex flex-col mt-4 space-y-3" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="text-sm" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="focus:outline-none w-full px-4 py-2 border border-gray-600 rounded-sm"
                    id="email"
                    type="email"
                    aria-required="true"
                    {...register('email')}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-600">{errors.email.message}</span>
                  )}
                </div>
                <div>
                  <label className="text-sm" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="focus:outline-none w-full px-4 py-2 border border-gray-600 rounded-sm"
                    id="password"
                    type="password"
                    aria-required="true"
                    {...register('password')}
                  />
                  {errors.password && (
                    <span className="text-xs text-red-600">{errors.password.message}</span>
                  )}
                </div>
                <button
                  className="w-full px-4 py-4 text-white bg-black border border-black rounded-sm"
                  aria-label="Sign in"
                  type="submit"
                >
                  Sign in
                </button>
              </form>
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
