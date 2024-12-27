export const handleLogout = (navigate) => {
    // Clear user session or authentication tokens
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/");
  
    console.log("User has been logged out.");
  };