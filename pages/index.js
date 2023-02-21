import { useContext, useEffect, useState } from "react";
import { BorderButton, BottomSheet, Input, Modal } from "../components";
import { useRouter } from "next/router";
import { postData } from "../utils/service";
import { ACCESS_TOKEN_KEY, ESTABLISH_USER } from "../utils/constants";
import { StateContext } from "../utils/context/context";
import { toast, Toaster } from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [appState, dispatch] = useContext(StateContext);
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newUserObject, setNewUserObject] = useState({
    email: "",
    password: "",
    username: "",
  });

  useEffect(() => {
    if (appState.isLogin) {
      router.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);
      toast.dismiss();
      const response = await postData("/auth/login", {
        email: newUserObject.email,
        password: newUserObject.password,
      });
      if (response.status == 200) {
        window.localStorage.setItem(
          ESTABLISH_USER,
          JSON.stringify(response.data.user)
        );
        window.localStorage.setItem(ACCESS_TOKEN_KEY, response.data.token);
        setLoading(false);
        setLogin(false);
        dispatch({ type: "LOGIN", value: true });
        dispatch({ type: "USER", value: response.data.user })
        router.push("/dashboard");
      } else if (response.status == 400) {
        setLoading(false);
        toast.error(response.data.message);
      }
    } catch (e) {
      setLoading(false);
      console.log("error", e);
    }
  };

  const handleSignup = async () => {
    try {
      setLoading(true);
      const response = await postData("/auth/register", {
        email: newUserObject.email,
        password: newUserObject.password,
        username: newUserObject.username,
      });
      if (response.status == 201) {
        setLoading(false);
        window.localStorage.setItem(
          ESTABLISH_USER,
          JSON.stringify(response.data.user)
        );
        window.localStorage.setItem(ACCESS_TOKEN_KEY, response.data.token);
        dispatch({ type: "LOGIN", value: true });
        dispatch({ type: "USER", value: response.data.user })
        router.push("/dashboard");
      } else {
        setLoading(false);
        toast.error(response.data.message);
      }
    } catch (e) {
      setLoading(false);
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
          <BorderButton title={"Login"} onClick={() => setLogin(true)} />
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
        <BorderButton
          title={"Sign Up"}
          onClick={() => setSignup(true)}
          fontSize="text-xl lg:text-3xl"
          containerClass={"mt-6"}
        />
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
        title="Register"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLogin(false);
            handleSignup();
          }}
          className="px-6 py-2"
        >
          <div className="mb-6">
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
          </div>
          <div className="mb-6">
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
          </div>
          <div className="mb-6">
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
          </div>
          <BorderButton title={"Signup"} />
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
            // setLogin(false);
            handleLogin();
          }}
          className="px-6 py-2"
        >
          <div className="mb-6">
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
          </div>
          <div className="mb-6">
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
          </div>
          <BorderButton loading={loading} title={"Login"} />
        </form>
      </Modal>
      <BottomSheet
        onClose={() => {
          setLogin(false);
          setNewUserObject({
            email: "",
            password: "",
            username: "",
          });
        }}
        show={login}
        title="Login"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // setLogin(false);
            handleLogin();
          }}
          className="px-6 py-2 w-full"
        >
          <div className="mb-6">
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
          </div>
          <div className="mb-6">
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
          </div>
          <BorderButton loading={loading} title={"Login"} />
        </form>
      </BottomSheet>
      <BottomSheet
        onClose={() => {
          setSignup(false);
          setNewUserObject({
            email: "",
            password: "",
            username: "",
          });
        }}
        show={signup}
        title="Register"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLogin(false);
            handleSignup();
          }}
          className="px-6 py-2 w-full"
        >
          <div className="mb-6">
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
          </div>
          <div className="mb-6">
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
          </div>
          <div className="mb-6">
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
          </div>
          <BorderButton title={"Signup"} />
        </form>
      </BottomSheet>
      <Toaster />
    </div>
  );
}
