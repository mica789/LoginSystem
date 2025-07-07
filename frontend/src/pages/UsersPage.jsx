import { useEffect, useState } from 'react'
import { fetchUsers } from '../api.js'
import UserInfo from '../common/UserInfo.jsx'
import bgImage from '../assets/images/shape-bg.png';
import styles from '../css/UsersPage.module.css'

function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetchUsers()
        const data = await res.json()

        if (res.ok) {
          setUsers(data)
        } else {
          alert(data.message || 'Failed to load users')
        }
      } catch (err) {
        console.error('Error fetching users:', err)
        alert('Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  return (
    <div className={styles.pageContainer} style={{ backgroundImage: `url(${bgImage})`}}>
      <h2 className={styles.pageTitle}>All Registered Users</h2>

      {loading ? (
        <p className={styles.statusMessage}>Loading users...</p>
      ) : users.length === 0 ? (
        <p className={styles.statusMessage}>No users found.</p>
      ) : (
        <div className={styles.usersGrid}>
          {users.map((user) => (
            <UserInfo key={user.id} user={user} />
          ))}
        </div>
      )}
    <a href="/" className={styles.homeLink}>Go back home</a>
    </div>
  )
}

export default UsersPage