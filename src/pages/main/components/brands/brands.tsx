import styles from './brands.module.scss'
import { Data } from './utils/const/Data'
const Brands = () =>{
    return(
        <div className={styles.wrapper}>
            {
                Data.map((item) =>(
                    <div className={styles.box}>
                        <img src = {item.logo} width={43} height={43} style={{mixBlendMode: 'multiply'}}/>
                        <p className={styles.logo}>{item.name}</p>
                        <p className={styles.text}>{item.text}</p>
                    </div>
                ))
            }
        </div>
    )
}
export default Brands