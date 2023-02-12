import { useState } from "react";
import { Input, Modal } from "../components";
import { useRouter } from "next/router";
import { postData } from "../utils/service";

export default function Home() {
  const router = useRouter();
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [newUserObject, setNewUserObject] = useState({
    email: "",
    password: "",
    username: "",
  });
  const startLogin = () => {
    setLogin(true);
  };

  const handleLogin = async () => {
    try {
      const response = await postData("/auth/login", {
        email: newUserObject.email,
        password: newUserObject.password,
      });
      if (response.status == 200) {
        window.localStorage.setItem(
          "establish_app_user",
          JSON.stringify(response.data)
        );
        router.push("/dashboard");
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await postData("/auth/register", {
        email: newUserObject.email,
        password: newUserObject.password,
        username: newUserObject.username,
      });
      if (response.status == 201) {
        window.localStorage.setItem(
          "establish_app_user",
          JSON.stringify(response.data)
        );
        router.push("/dashboard");
      }
    } catch (e) {
      console.log("error", e);
    }
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
            onClick={() => setLogin(true)}
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
          onClick={() => setSignup(true)}
          className="text-xl lg:text-3xl made-gentle border border-white border-opacity-80 rounded-full py-2 px-6 hover:border-sunset mt-6"
        >
          Sign Up
        </button>
      </div>
      <Modal
        onClose={() => {
          setSignup(false);
          setNewUserObject({
            email: "",
            password: "",
            username: "",
          });
        }}
        isVisible={signup}
        title="Login"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLogin(false);
            handleSignup();
          }}
          className="px-6 py-2"
        >
          <Input
            onChange={(e) => {
              setNewUserObject({
                ...newUserObject,
                username: e.target.value,
              });
            }}
            autoComplete="off"
            required={true}
            type="text"
            title={"username"}
          />
          <Input
            onChange={(e) => {
              setNewUserObject({
                ...newUserObject,
                email: e.target.value,
              });
            }}
            autoComplete="off"
            required={true}
            type="email"
            title={"email"}
          />
          <Input
            onChange={(e) => {
              setNewUserObject({
                ...newUserObject,
                password: e.target.value,
              });
            }}
            autoComplete="off"
            required={true}
            type="password"
            title={"password"}
          />

          <button className="w-full border hover:border-sunset border-black rounded-lg text-center made-gentle py-2">
            Signup
          </button>
        </form>
      </Modal>
      <Modal
        onClose={() => {
          setLogin(false);
          setNewUserObject({
            email: "",
            password: "",
            username: "",
          });
        }}
        isVisible={login}
        title="Login"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLogin(false);
            handleLogin();
          }}
          className="px-6 py-2"
        >
          <Input
            onChange={(e) => {
              setNewUserObject({
                ...newUserObject,
                email: e.target.value,
              });
            }}
            type="email"
            required={true}
            autoCorrect="off"
            title={"email"}
          />
          <Input
            onChange={(e) => {
              setNewUserObject({
                ...newUserObject,
                password: e.target.value,
              });
            }}
            required={true}
            autoCorrect="off"
            type={"password"}
            title={"password"}
          />
          <button className="w-full border hover:border-sunset border-black rounded-lg text-center made-gentle py-2">
            Login
          </button>
        </form>
      </Modal>
    </div>
  );
}
