import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import { SignIn, SignUp } from "./pages/AuthSign";
import ChatPage from "./pages/ChatPage";
import ErrorBoundary from "./pages/ErrorBoundary";

const App = () => {
  return (
    <div>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Route>
          <Route path="/chatpage" element={<ChatPage />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

export default App;
