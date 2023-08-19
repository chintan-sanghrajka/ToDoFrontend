import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ViewTasks from "./components/taskComponents/ViewTasks.jsx";
import CompletedTask from "./components/taskComponents/CompletedTask.jsx";
import AddTask from "./components/taskComponents/AddTask.jsx";
import EditTask from "./components/taskComponents/EditTask.jsx";
import SignupPage from "./components/userComponents/SignupPage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/userComponents/LoginPage.jsx";
import PrivateRoute from "./auth/PrivateRoute.jsx";
import PublicRoute from "./auth/PublicRoute";
import Title from "./components/Title.jsx";

function App() {
  return (
    <>
      <Router>
        <Title />
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<ViewTasks />} />
            <Route path="/view-task" element={<ViewTasks />} />
            <Route path="/completed-task" element={<CompletedTask />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/edit-task/:userid" element={<EditTask />} />
          </Route>

          <Route path="/" element={<PublicRoute />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
