import { useState } from "react";
import axios from "axios";
// import { useRecoilState, useSetRecoilState } from "recoil";
// import { userNameAtom } from "../state/atom";
import { userSchema } from "../schema/userData";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { userAtom } from "../state/atom";

const SignIn = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);
  const navigation = useNavigate();

  if (loading) {
    return <div>Loading ...</div>;
  }

  async function handleSignIn() {
    setRes("");
    if (!inputEmail || !inputPassword) {
      throw new Error("Required Fields are necessary !!!");
    }

    const result = userSchema.safeParse({
      userName: null,
      email: inputEmail,
      password: inputPassword,
    });

    if (!result.success) {
      throw new Error(result.error.format());
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/user/signin",
        result.data, //this is an  object
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.statusText) {
        setRes(
          response.data.message || `HTTTP error status: ${response.status}`
        );
        return;
      }

      console.log(response.data);

      setRes(response.data.message);
      localStorage.setItem("auth-token", response.data.token); // in localstorage
      setUser(response.data.user);
      navigation("/chatpage");
    } catch (err) {
      console.log(err.response.data.message || `An Unknown error occurred`);
      setRes(err.response.data.message || `An Unknown error occurred`);
      throw new Error(err.response.data.message || `An Unknown error occurred`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div>
        <input
          type="email"
          value={inputEmail}
          placeholder="email ..."
          onChange={({ target: { value } }) => {
            setInputEmail(value);
          }}
        />
        <input
          type="password"
          value={inputPassword}
          placeholder="password ..."
          onChange={({ target: { value } }) => {
            setInputPassword(value);
          }}
        />
        <button
          onClick={() => {
            handleSignIn();
            setInputEmail("");
            setInputPassword("");
          }}
        >
          verify
        </button>
      </div>
      <div>{res}</div>
    </div>
  );
};

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);

  // function handle signIn
  async function handleSignUp() {
    setRes("");
    if (!inputEmail || !inputPassword) {
      // || !userName
      throw new Error("Required Fields are necessary !!!");
    }

    const result = userSchema.safeParse({
      userName: userName,
      email: inputEmail,
      password: inputPassword,
    });

    if (!result.success) {
      throw new Error(result.error.format());
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/user/signup",
        result.data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // the response is already parsed

      if (!response.statusText) {
        setRes(
          response.data.message || `HTTP error status: ${response.status}`
        );
        return;
      }

      setRes(response.data.message);
    } catch (err) {
      // showing in the ui
      console.log(err.response.data.message || `An Unknown error occurred`); // err:{response:{data:{message: ""}}}
      throw new Error(err.response.data.message || `An Unknown error occurred`);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <div>
        <input
          type="text"
          value={userName}
          placeholder="your name..."
          onChange={({ target: { value } }) => {
            setUserName(value);
          }}
        />
        <input
          type="email"
          value={inputEmail}
          placeholder="email ..."
          onChange={({ target: { value } }) => {
            setInputEmail(value);
          }}
        />
        <input
          type="password"
          value={inputPassword}
          placeholder="password ..."
          onChange={({ target: { value } }) => {
            setInputPassword(value);
          }}
        />
        <button
          onClick={() => {
            handleSignUp();
            setInputEmail("");
            setInputPassword("");
            setUserName("");
          }}
        >
          create
        </button>
      </div>

      <div>{res}</div>
    </div>
  );
};

export { SignUp, SignIn };
