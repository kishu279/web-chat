import { useNavigate } from "react-router";

const SignInButton = () => {
  const navigation = useNavigate();

  return (
    <div>
      <button
        onClick={() => {
          navigation("signin");
        }}
      >
        signin
      </button>
    </div>
  );
};

const SignUpButton = () => {
  const navigation = useNavigate();

  return (
    <div>
      <button
        onClick={() => {
          navigation("signup");
        }}
      >
        signup
      </button>
    </div>
  );
};

export { SignInButton, SignUpButton };
