import { useEffect, useState } from "react";
import { Link, Outlet, useMatch } from "react-router-dom";
import { Route, Routes, useLocation, useParams } from "react-router-dom"
import styled from "styled-components";
import { Chart } from "./Chart";
import { Container, Header, Loader, Title } from "./Coins";
import { Price } from "./Price";

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{isActive:boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  padding: 7px 0px;
  border-radius: 10px;
  background-color:  rgba(0,0,0,0.5);
  color: ${props=>props.isActive ? props.theme.accentColor : props.theme.textColor};
  transition: color .5s ease-in;
`;

const Description = styled.p`
  margin: 20px 0px;
`;

interface ICoinID {
    coinId: string;
}

interface ILocation {
    state: string;
}

interface ITag {
    id: string;
    name: string;
    coin_counter: number;
    ico_counter: number;
}

interface IInfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    tags: ITag[];
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface IPriceInfo {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD:{
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    }
}

export function Coin() {
    const [loading, setLoading] = useState(true);
    const { coinId } = useParams() as unknown as ICoinID
    const { state } = useLocation() as ILocation
    const [info, setInfo] = useState<IInfoData>()
    const [priceInfo, setPriceInfo] = useState<IPriceInfo>()
    //link의 state에서 넘긴 정보를 받을 수 있다.
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    useEffect(()=>{
        (async()=>{
          const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
          setLoading(false)
        })()
    },[coinId])
    useEffect(()=>{
        (async()=>{
          const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
          setPriceInfo(priceData)
        })()
    },[coinId])

    console.log(chartMatch)

    return (
        <Container>
            <Header>
                <Title>
                    {state ? state : loading ? "Loading..." : info?.name}
                </Title>
            </Header>
                {loading? (
                    <Loader>Loading...</Loader>
                    ) : (
                        <>
                            <Overview>
                                <OverviewItem>
                                    <span>Rank:</span>
                                    <span>{info?.rank}</span>
                                </OverviewItem>
                                <OverviewItem>
                                    <span>Symbol:</span>
                                    <span>${info?.symbol}</span>
                                </OverviewItem>
                                <OverviewItem>
                                    <span>Open Source:</span>
                                    <span>{info?.open_source ? "Yes" : "No"}</span>
                                </OverviewItem>
                            </Overview>
                            <Description>{info?.description}</Description>
                            <Overview>
                                <OverviewItem>
                                    <span>Total Suply:</span>
                                    <span>{priceInfo?.total_supply}</span>
                                </OverviewItem>
                                <OverviewItem>
                                    <span>Max Supply:</span>
                                    <span>{priceInfo?.max_supply}</span>
                                </OverviewItem>
                            </Overview>
                            <Tabs>
                                <Tab isActive={chartMatch !== null}>
                                    <Link to={`/${coinId}/chart`}>Chart</Link>
                                </Tab>
                                <Tab isActive={priceMatch !== null}>
                                    <Link to={`/${coinId}/price`}>Price</Link>
                                </Tab>
                            </Tabs>

                            <Routes>
                                <Route path={`chart`} element={<Chart />}></Route>
                                <Route path={`price`} element={<Price />} />
                            </Routes>

                            <Outlet />
                        </>
                    )
                }
        </Container>
    )
}