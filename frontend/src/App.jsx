import {
  Routes,
  Route,
} from "react-router";
import HomePage from "./pages/HomePage";
import { SignIn, SignUp } from "./pages/AuthSign";
import ChatPage from "./pages/ChatPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
        <Route path="/chatpage" element={<ChatPage />} />
      </Routes>
    </div>
  );
};

export default App;
