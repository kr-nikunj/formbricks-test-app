import  { useState, useEffect } from 'react';
import './App.css';
import formbricks from "@formbricks/js";

function App() {
  const [userId, setUserId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to initialize Formbricks
  const initializeFormbricks = () => {
    if (typeof window !== "undefined") {
      formbricks.init({
        environmentId: "clth0x44u15myggxvrlb6cpoa",
        apiHost: "https://app.formbricks.com",
        userId: userId,
      });
    }
  };

  // Function to logout
  const handleLogout = () => {
    formbricks.logout(); // No arguments needed
    setIsLoggedIn(false);
    setUserId('');
  };

  // Function to handle login
  const handleLogin = () => {
    if (userId.trim() !== '') {
      setIsLoggedIn(true);
      initializeFormbricks(); // Initialize Formbricks after login
    }
  };

  // Function to handle click on elements with the 'css-id' class
  const handleCssIdClick = () => {
    const button = document.querySelector('.css-id');
    console.log("🚀 ~ handleCssIdClick ~ button:", button)
    if (button) {
      button.classList.toggle('clicked');
    }
  };

  // useEffect to attach click event listener when component mounts
  useEffect(() => {
    const handleClick = (event: any) => {
      const { target } = event;
      const cssSelector = '.css-id'; // Replace with your desired CSS selector

      // Check if the clicked element matches the CSS selector
      if (target.matches(cssSelector)) {
        // Trigger the action you want to perform
        handleCssIdClick();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []); // Empty dependency array to run the effect only once after mount

  return (
    <div>
      {isLoggedIn ? (
        <>
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
