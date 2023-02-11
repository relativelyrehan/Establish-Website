import { useState } from 'react';
import { Modal } from '../components';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [login, setLogin] = useState(false);
  const startLogin = () => {
    setLogin(true);
  };

  const handleLogin = () => {
    setLogin(false);
    router.push('/dashboard');
  };

  return (
    <div className="bg-black min-h-screen px-5 text-white">
      <nav className="flex justify-between py-5">
        <div>
          <p className="text-xl lg:text-3xl made-gentle">
            Establish <span className="text-sunset text-5xl">.</span>
          </p>
        </div>
        <div>
          <button
            onClick={startLogin}
            className="text-base lg:text-xl made-gentle border border-white border-opacity-80 rounded-full py-2 px-6 hover:border-sunset"
          >
            Login
          </button>
        </div>
      </nav>
      <div className="h-[80vh] flex justify-center items-center flex-col">
        <p className="text-5xl lg:text-9xl made-gentle">
          Establish <span className="text-sunset text-9xl">.</span>
        </p>
        <p className="text-base lg:text-2xl mt-6 text-center tracking-widest w-full lg:w-1/2 mx-auto">
          Establish your day effortlessly with the all-in-one solution that
          helps you manage your to-dos, reading, and more in one place
        </p>
        <button
          onClick={startLogin}
          className="text-xl lg:text-3xl made-gentle border border-white border-opacity-80 rounded-full py-2 px-6 hover:border-sunset mt-6"
        >
          Sign Up
        </button>
      </div>
      <Modal onClose={() => setLogin(false)} isVisible={login} title="Login">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLogin(false);
            handleLogin();
          }}
          className="px-6 py-2 text-black"
        >
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <input
              required
              autoCorrect="off"
              id="email"
              type="text"
              className="w-full bg-transparent border border-black border-opacity-10 rounded-lg py-2 px-4 focus:outline-none"
            />
          </div>
          <div className="flex flex-col mb-6">
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <input
              required
              autoCorrect="off"
              id="password"
              type="password"
              className="w-full bg-transparent border border-black border-opacity-10 rounded-lg py-2 px-4 focus:outline-none"
            />
          </div>
          <button className="w-full border hover:border-sunset border-black rounded-lg text-center made-gentle py-2">
            Login
          </button>
        </form>
      </Modal>
    </div>
  );
}
