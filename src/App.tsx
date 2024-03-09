import  { useState, useEffect } from 'react';
import './App.css';
import formbricks from "@formbricks/js";

function App() {
  const [userId, setUserId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const initializeFormbricks = () => {
    if (typeof window !== "undefined") {
      formbricks.init({
        environmentId: "clth0x44u15myggxvrlb6cpoa",
        apiHost: "https://app.formbricks.com",
        userId: userId,
      });
    }
  };

  const handleLogout = () => {
    formbricks.logout(); 
    setIsLoggedIn(false);
    setUserId('');
  };

  const handleLogin = () => {
    if (userId.trim() !== '') {
      setIsLoggedIn(true);
      initializeFormbricks(); 
    }
  };

  const handleCssIdClick = () => {
    const button = document.querySelector('.css-id');
    console.log("🚀 ~ handleCssIdClick ~ button:", button)
    if (button) {
      button.classList.toggle('clicked');
    }
  };

  useEffect(() => {
    const handleClick = (event: any) => {
      const { target } = event;
      const cssSelector = '.css-id'; 

      if (target.matches(cssSelector)) {
        handleCssIdClick();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []); 

  return (
    <div>
      {isLoggedIn ? (
        <>
          <button>Install App</button>
          <button onClick={() => formbricks.track("Button Clicked")}>Click Me</button>
          <button className="css-id">Click Me css id</button>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter User ID"
          />
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
}

export default App;
