const BASE_URL = "https://api.coinpaprika.com/v1"

export function GetCoins(){
    return fetch(`${BASE_URL}/coins`).then(res=>
        res.json()
    );
}

export function GetInfo(coinId:string){
    return fetch(`${BASE_URL}/coins/${coinId}`).then(res=>
        res.json()
    );
}

export function GetPriceInfo(coinId:string){
    return fetch(`${BASE_URL}/tickers/${coinId}`).then(res=>
        res.json()
    );
}

export function GetCoinHistory(coinId: string){
    return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).then(res=>
        res.json()
    );
}