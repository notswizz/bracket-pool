import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
      
          <a href="/api/dev" style={{ fontWeight: 'semibold' }}>
            <code className={styles.code}>debug</code>
          </a>{' '}
         
        </p>
      </div>
    </main>
  )
}
