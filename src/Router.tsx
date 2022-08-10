import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Chart } from "./routes/Chart"
import { Coin } from "./routes/Coin"
import Coins from "./routes/Coins"
import { Price } from "./routes/Price"

export function Router(){
    return(
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<Coins />}/>
                <Route path="/:coinId/*" element={<Coin />}>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}