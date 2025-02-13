import { Outlet } from "react-router";
import { SignInButton, SignUpButton } from "../components/Button";
import Logo from "../components/Logo";

const HomePage = () => {
  return (
    <div>
      <div className="border display flex justify-between h-10 items-center">
        <div className="ml-4">
          <Logo />
        </div>
        <div className="display flex gap-6 mr-4">
          <SignUpButton />
          <SignInButton />
        </div>
      </div>

      <div>
        <p className="text-5xl animate-pulse font-light text-yellow-400 mt-10 ml-10">
          BUZZ TALK
        </p>
      </div>
      <Outlet />
    </div>
  );
};

export default HomePage;
