import styles from "./Container2.module.scss";

const Container2 = ({ stickyNav, content }) => {
  return (
    <div className={styles.container}>
      {stickyNav}
      {content}
    </div>
  );
};

export default Container2;
