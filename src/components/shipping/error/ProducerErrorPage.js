import { useNavigate, useLocation } from "react-router-dom";
import styles from "../css/ProducerErrorPage.module.css";

function ProducerErrorPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the error message from the router state or use a default emssage
  const errorMessage = location.state?.errorMessage || "An error occurred.";

  const handleGoBack = () => {
    // Option 1: Simple and directly reloads the page
    navigate(-1); //
    // Option 2: Use when you want more control over the navigation state
    // navigate(window.location.pathname, { replace: true });
  };

  return (
    <div className={styles["errorPage"]}>
      <h1 className={styles["errorHeader"]}>Oops! Something went wrong.</h1>
      <p className={styles["errorMessage"]}>{errorMessage}</p>
      <button className={styles["backButton"]} onClick={handleGoBack}>
        다시시도
      </button>
    </div>
  );
}

export default ProducerErrorPage;
