import { Landing, Error, Register, Dashboard } from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProtectedRoute } from "./components";
import {
  Profile,
  Stats,
  AllJobs,
  AddJob,
  SharedLayout,
} from "./pages/dashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="/alljobs" element={<AllJobs />} />
          <Route path="/addjob" element={<AddJob />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Error />} />

        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
}

export default App;
