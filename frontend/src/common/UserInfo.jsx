import styles from '../css/UserInfo.module.css'

function UserInfo({ user }) {
  return (
    <div className={styles.userCard}>
      <div className={styles.avatarContainer}>
        <span className={styles.avatarInitial}>
          {user.username[0].toUpperCase()}
        </span>
      </div>
      <h3 className={styles.userName}>{user.username}</h3>
      <p className={styles.userEmail}>{user.email}</p>
    </div>
  )
}

export default UserInfo