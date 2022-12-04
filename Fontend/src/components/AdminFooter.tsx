import { FunctionComponent } from "react";
import styles from "./AdminFooter.module.css";

const AdminFooter: FunctionComponent = () => {
  return (
    <header className={styles.adminFooterHeader}>
      <div className={styles.logoDiv}>
        <div className={styles.canteenUITDiv}>Canteen UIT</div>
        <img className={styles.logoUit1Icon} alt="" src="../logouit-1@2x.png" />
      </div>
    </header>
  );
};

export default AdminFooter;
