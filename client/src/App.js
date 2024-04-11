import "./App.css";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Spinner from "./components/Spinner";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./components/Admin/Admin";
import AttemptQuiz from "./components/AttemptQuiz";
import LeaderBoard from "./components/LeaderBoard";

export const config = {
  endpoint: "http://localhost:8085/api",
};

function App() {
  const { loading } = useSelector((state) => state.loader);
  return (
    <div className="App min-h-screen flex justify-center items-center">
      {loading && <Spinner />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/attempt-quiz/:quizId"
          element={
            <ProtectedRoute>
              <AttemptQuiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard/:quizId"
          element={
            <ProtectedRoute>
              <LeaderBoard/>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={< Login/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
