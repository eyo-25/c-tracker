import { useQuery } from "@tanstack/react-query";
import { GetCoinHistory } from "../api";
import ApexChart from "react-apexcharts"
import { Loader } from "./Coins";
import { useRecoilState } from "recoil";
import { darkState } from "./atom";

interface IChart {
    coinId: string;
}

interface IOhlcvData {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}

export function Chart({coinId}:IChart) {
    const {isLoading, data} = useQuery<IOhlcvData[]>(["ohlcv", coinId], ()=>GetCoinHistory(coinId),
        // {refetchInterval: 1000}
    )
    const [isDark, setIsDark] = useRecoilState(darkState)
    //IOhlcvData[] IOhlcvData는 object자료이기 때문에 map을 사용하기위하여 배열로 변환시킨다.
    return(
        <>  
            { isLoading ? <Loader>Loading...</Loader> :
                        <ApexChart
                            type="candlestick"
                            series={[{ name: "Price",
                            data:(
                                data?.map((price)=>(
                                   {
                                        x: new Date(price.time_close*1000),
                                        y: [price.open, price.high, price.low, price.close]
                                    }
                                )) 
                            )
                            }] as unknown as number[]}
                            options={{
                                theme: {
                                    mode: isDark ? "dark" : "light",
                                },
                                chart: {
                                    height: 300,
                                    width: 500,
                                    toolbar: {
                                        show: false,
                                    },
                                    background: "transparent",
                                },
                                xaxis: {
                                    axisTicks: {
                                        show: false,
                                    },
                                    labels: {
                                        show: false,
                                    },
                                    type: "datetime",
                                },
                                tooltip: {
                                  y: {
                                      formatter: (value)=> `$${value.toFixed(2)}`
                                  }
                                },
                            }}
                        />
            }
        </>
    )
}