import logo from './logo.svg';
import { BrowserRouter } from "react-router-dom";
import HeaderApp from './components/Component-HeaderApp';
import RoutePath from './utils/RoutePath';
import "antd/dist/antd.css"
import "./css/App.css";
import { useEffect } from 'react';
import { Auth } from "@aws-amplify/auth"

function App() {
  useEffect(() => {
    Auth.currentCredentials();
    const init = async () => {
      try {
        await Auth.currentAuthenticatedUser();
      } catch {
        console.log(Auth.signIn("nghaninn", "1234Qwer"))
      }
    }
    init();
  }, [])

  return (
    <BrowserRouter>
      <div className="default-theme">
        <HeaderApp />
        <div className="content">
          <RoutePath />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
