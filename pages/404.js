import { useEffect, useState } from 'react';
import { useRouter } from "next/router";

export default function Page404() {
    const [countdown, setCountdown] = useState(5);
    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
            if(countdown < 2){
                router.push('/');
            }
            setCountdown(countdown -1)
        }, 1000);

    }, [countdown]);
    return (
        <div>
            <h1>
                Oopps
            </h1>
            <h2>
                Essa página não existe
            </h2>
            <span>Você será redirecionado em {countdown} segundos</span>

            <style jsx>{`
                div{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100vw;
                    height: 100vh;
                }
            
            `}
            </style>
        </div>

    )
}
