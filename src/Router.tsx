import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Helmet } from "react-helmet"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Coin } from "./routes/Coin"
import Coins from "./routes/Coins"
import { Price } from "./routes/Price"
import { faSun, faRocket } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components"
import { useRecoilState } from "recoil"
import { darkState } from "./routes/atom"

const LightToggle = styled.div`
    position: fixed;
    top: 25px;
    right: 25px;
    transition: .5s ease-in;
    color: ${(props)=>props.theme.accentColor};
    svg{
        width: 30px;
        height: 30px;
    }
    &:hover{
        scale: 1.3;
        color: #ffa502;
    }
`

export function Router(){
    const [dark, setDark] = useRecoilState(darkState)
    const darkHandler = ()=>setDark(()=>!dark)
    return(
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <LightToggle>
                    <FontAwesomeIcon
                    icon={dark ? faSun : faRocket}
                    onClick={darkHandler}
                    />
                </LightToggle>
                <Helmet>
                <link
                rel="icon"
                type="image/png"
                href="https://spng.pngfind.com/pngs/s/690-6900289_what-is-dogemap-doge-firefox-hd-png-download.png"
                sizes="16x16"
                />
                </Helmet>
                <Routes>
                    <Route path="/" element={<Coins />}/>
                    <Route path="/:coinId" element={<Coin />}>
                        <Route path={`chart`} element={<Price />} />
                        <Route path={`price`} element={<Price />} />
                    </Route>
                </Routes>
            </BrowserRouter>
    )
}