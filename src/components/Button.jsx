import styles from './Button.module.css';

const Button = ({ children, onClick, kind, type }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${styles.btn} ${styles[kind]}`}
        >
            {children}
        </button>
    );
};

export default Button;
