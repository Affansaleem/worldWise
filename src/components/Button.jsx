import styles from "./Button.module.css";
function Button({ onClick, type, children }) {
  return (
    <button onClick={onClick} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
