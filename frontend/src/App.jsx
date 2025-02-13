import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import { SignIn, SignUp } from "./pages/AuthSign";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
