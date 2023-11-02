import styles from './FooterStyle.module.scss'

const Footer = () =>{
    const PhoneNumbers = [
        {
            logo: "https://static.21vek.by/desktop/_next/static/images/a1.75e5f9be.svg",
            number: "+375 29 302 10 21"
        },
        {
            logo: "https://static.21vek.by/desktop/_next/static/images/life.91fa398a.svg",
            number: "+375 25 502 10 21"
        },
        {
            logo: "https://static.21vek.by/desktop/_next/static/images/home.8dee0cdf.svg",
            number: "+375 17 302 10 21"
        },
        {
            logo: "https://static.21vek.by/desktop/_next/static/images/viber.47679e0e.svg",
            number: "Viber"
        },
        {
            logo: "https://static.21vek.by/desktop/_next/static/images/telegram.811b1ccd.svg",
            number: "Tekegram"
        },
        {
            logo: "https://static.21vek.by/desktop/_next/static/images/email.f751aaaa.svg",
            number: "Почта"
        },
        {
            logo: "https://static.21vek.by/desktop/_next/static/images/email.f751aaaa.svg",
            number: "Написать нам"
        },
    ]
    return(
        <div className={styles.wrapper}>
            {
                PhoneNumbers.map((smt) =>(
                    <div className={styles.box}>
                        <img src={smt.logo}/>
                        <p>{smt.number}</p>
                    </div>
                ))
            }
        </div>
    )
}
export default Footer