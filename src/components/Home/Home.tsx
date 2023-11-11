import React, { useEffect, useState } from 'react';
import './index.css'
import scoreboardservice from '../../services/scoreboard';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../helpers';
import { Link } from 'react-router-dom';
import PreLoad from '../PreLoad/PreLoad';

const Home = () => {

    // define a code state
    const [code, setCode] = useState(0)
    const [qrCode, setQrCode] = useState('' as string)
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true as boolean)

    useEffect(() => {

        let url = `${baseUrl}/scoreboards/${code}/admin`
        let encodedUrl = encodeURIComponent(url)
        setQrCode(
            `https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=15&data=${encodedUrl}`
        )

        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [code])

    // run a a function on mount
    useEffect(() => {
        if (document.cookie.indexOf('code=') >= 0) {
            let codeCookieValue = document.cookie.split('code=')[1].split(';')[0]
            document.cookie = `code=${codeCookieValue};max-age=600;path=/`
            setCode(parseInt(codeCookieValue))
        } else {
            scoreboardservice.reserve().then(data => {
                document.cookie = `code=${data.code};max-age=600;path=/`
                setCode(data.code)
            }).catch(err => {
                console.error(err)
                setCode(0)
            })
        }

        const requestInterval = setInterval(() => checkScoreBoard(), 5000);

        return () => {
            clearInterval(requestInterval);
        };
    }, [])

    function checkScoreBoard() {
        let codeStr = ""
        try {
            codeStr = document.cookie.split('code=')[1].split(';')[0]
        } catch (err) {
            console.log("No code cookie found, refreshing...")
            window.location.reload();
            return
        }

        scoreboardservice.get(parseInt(codeStr)).then(data => {
            // Scoreboard has been created
            console.log("Scoreboard has been created, redirecting to admin page")
            navigate(`/scoreboards/${codeStr}`)
        }).catch(err => {
            // Scoreboard has not been created yet
            console.log("Scoreboard not created yet, waiting...")
        })
    }

    return (<div className="home">
        <div hidden={isLoading}>
            <p className="flow-text center">Leia o QR Code para controlar este placard</p>
            <br />
            <p className='flow-text center'>
                <img className='qr-code-img' src={qrCode} />
            </p>
            <br />
            <p className='flow-text center'>
                <Link to={`/scoreboards/${code}/admin`}>
                    {code}
                </Link>
            </p>
        </div>

        <PreLoad isLoading={isLoading} />

    </div>)
}

export default Home