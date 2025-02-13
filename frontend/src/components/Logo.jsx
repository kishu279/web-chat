import { useNavigate } from "react-router";

const Logo = () => {
  const navigation = useNavigate();

  return (
    <div>
      <p
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
