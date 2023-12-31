import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import AuthContext, { AuthProvider } from './context/AuthContext';
import { loadStripe } from "@stripe/stripe-js";

function App() {
  return (
      <Router>
        <AuthProvider>
          <Header/>
            <PrivateRoute path="/" exact Component={HomePage} />
          <Routes>          
            <Route Component={LoginPage} path='/login'/>
          </Routes>
        </AuthProvider>
      </Router>
  );
}

export default App;