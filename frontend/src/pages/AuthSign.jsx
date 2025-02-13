import { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    if (!inputEmail || !inputPassword) {
      throw new Error("Required Fields are necessary !!!");
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/user/signin",
        {
          email: inputEmail,
          password: inputPassword,
        },
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

      setRes(response.data.message);
    } catch (err) {
      console.log(err.response.data.message || `An Unknown error occurred`);
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
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);

  // function handle signIn
  async function handleSignUp() {
    if (!inputEmail || !inputPassword) {
      throw new Error("Required Fields are necessary !!!");
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/user/signup",
        {
          email: inputEmail,
          password: inputPassword,
        },
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
