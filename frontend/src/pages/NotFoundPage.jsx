import styles from '../css/NotFound.module.css';
import bgImage from '../assets/images/shape-bg.png';

export default function NotFound() {
  return (
    <div className={styles.container} style={{ backgroundImage: `url(${bgImage})` }}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Oops! The page you are looking for does not exist.</p>
      <a href="/" className={styles.homeLink}>Go back home</a>
    </div>
  );
}