import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import MovieDetailsScreen from "./screens/MovieDetailsScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/movie/:id" element={<MovieDetailsScreen />} />
        <Route path="/profile/:id" element={<ProfileScreen />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
