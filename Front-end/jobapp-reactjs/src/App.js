import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { MyDispatchContext, MyUserContext } from './configs/Context';
import MyUserReducer from './configs/Reducers';
import { useReducer } from 'react';
import './index.css'; 
import Header from "./component/Header";
import Footer from "./component/Footer";
import Login from './pages/User/Login';

const noHeaderFooterRoutes = ['/login'];

function AppLayout() {
  const location = useLocation();
  const showHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

  return (
    <div>
      {showHeaderFooter && <Header />}
      <main className={`flex-grow ${showHeaderFooter ? 'mt-16' : ''}`}>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="*" element={() => <div>404 Not Found</div>} />
        </Routes>
      </main>
      {showHeaderFooter && <Footer />}
    </div>
  );
}

function MyTab() {
  return (
    <Router>
      <GoogleOAuthProvider clientId="19411555949-o6cesuh7bg7rl8u06v5679ldjssbeg59.apps.googleusercontent.com">
        <AppLayout />
      </GoogleOAuthProvider>
    </Router>
  );
}

const App = () => {
  const [user, dispatch] = useReducer(MyUserReducer, null);
  return (
    <MyUserContext.Provider value={user}>
      <MyDispatchContext.Provider value={dispatch}>
        <MyTab />
      </MyDispatchContext.Provider>
    </MyUserContext.Provider>
  );
};

export default App;
