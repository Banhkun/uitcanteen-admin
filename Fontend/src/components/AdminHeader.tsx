import { FunctionComponent, useState, useCallback, useEffect } from "react";
import Option1 from "../components/Option1";
import PortalDrawer from "../components/PortalDrawer";
import styles from "./AdminHeader.module.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const AdminHeader: FunctionComponent = () => {
  const [isOptionOpen, setOptionOpen] = useState(false);

  const openOption = useCallback(() => {
    setOptionOpen(true);
  }, []);

  const closeOption = useCallback(() => {
    setOptionOpen(false);
  }, []);

  return (
    <>
      <header className={styles.adminHeader}>
        <div className={styles.greetingTextDiv}>
          <span className={styles.greetingTextTxt}>
            {localStorage.hasOwnProperty("login") ? (
              <>
                <span>{`Xin chào`}</span>
                <b>, Bảnh</b>
              </>
            ) : (
              <></>
            )}
          </span>
        </div>
        <button className={styles.menuButton} onClick={openOption}>
          <img
            className={styles.menuButtonIcon}
            alt=""
            src="../menu-button.svg"
          />
        </button>
      </header>
      {isOptionOpen && (
        <PortalDrawer
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Left"
          onOutsideClick={closeOption}
        >
          <Option1 onClose={closeOption} />
        </PortalDrawer>
      )}
    </>
  );
};

export default AdminHeader;
