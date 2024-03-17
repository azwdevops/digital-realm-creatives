import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Digital Realm</div>
      <div className={styles.text}>
        Digital Realm Creatives &copy; All right reserved
      </div>
    </div>
  );
};

export default Footer;
