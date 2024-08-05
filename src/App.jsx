import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Houses from "./pages/AdminDashboard/Houses.jsx";
import Bookings from "./pages/AdminDashboard/Bookings.jsx";
import Clients from "./pages/AdminDashboard/Clients.jsx";
import ProtectedRoute from "./pages/Auth/ProtectedRoute.jsx";
import Reviews from "./pages/AdminDashboard/Reviews.jsx";
import Payments from "./pages/AdminDashboard/Payments.jsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.jsx";
import Home from "./pages/UserDashboard/Home/Home.jsx";
import PropertyDetails from "./pages/UserDashboard/SingleProperty/PropertyDetails.jsx";
import SignUp from "./pages/Auth/SignUp/SignUp.jsx";
import LogIn from "./pages/Auth/Login/LogIn.jsx";
import Landing from "./pages/UserDashboard/Landing/Landing.jsx";
import Error from "./pages/Error/Error.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}>
          <Route index element={<Home />} />
          <Route path="property/:id" element={<PropertyDetails />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route index element={<AdminDashboard />} />
          <Route path="houses" element={<Houses />} />
          <Route path="/dashboard/clients" element={<Clients />} />
          <Route path="/dashboard/bookings" element={<Bookings />} />
          <Route path="/dashboard/payments" element={<Payments />} />
          <Route path="/dashboard/reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
