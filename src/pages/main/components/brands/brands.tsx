import styles from './brandsStyle.module.scss'
const Data = [
    {
        name: 'Xiaomi',
        text: "Популярные товары",
        logo: "	https://cdn21vek.by/img/tmp/b/63d923452e2a9Mi%20Logo%20-%20Xiaomi%20Orange.png"
    },
    {
        name: 'LG',
        text: "Лучшие предложения",
        logo: "	https://cdn21vek.by/img/tmp/b/647758c702c6eScreenshot_6.png"
    },
    {
        name: 'Kitfort',
        text: "скидки до 30%",
        logo: "	https://cdn21vek.by/img/tmp/b/647861df216dbimage_2023-06-01_12-11-34.png"
    },
    {
        name: 'Липонеум',
        text: "Большой выбор",
        logo: "	https://cdn21vek.by/img/tmp/b/652929c429e91%D0%BB%D0%B8%D0%BD%D0%BE%D0%BB%D0%B5%D1%83%D0%BC.png"
    },
    {
        name: 'Наручные часы',
        text: "Оплата частями",
        logo: "https://cdn21vek.by/img/tmp/b/6529292fa4759%D1%87%D0%B0%D1%81%D1%8B.png"
    },
    {
        name: 'Rondell',
        text: "Подарочнвя акция",
        logo: "	https://cdn21vek.by/img/tmp/b/6523f784ad985%D1%80%D0%B5%D0%BD%D0%B4%D0%B5%D0%BB.png"
    },
   
]
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