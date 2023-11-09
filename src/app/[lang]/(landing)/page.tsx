import React from 'react'
import styles from './page.module.css'
interface IPage{
  params:{
    lang:string
  }
}
const Home:React.FC<IPage> = ({ params: { lang } }) => {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>
          Libling home page {lang}
        </h1>
      </div>
    </main>
  )
}

export default Home