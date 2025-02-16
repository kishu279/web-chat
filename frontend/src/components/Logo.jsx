import { useNavigate } from "react-router";

const Logo = () => {
  const navigation = useNavigate();

  return (
    <div>
      <p
      className="cursor-pointer"
        onClick={() => {
          navigation("/");
        }}
      >
        Buzz Talk
      </p>
    </div>
  );
};

export default Logo;
