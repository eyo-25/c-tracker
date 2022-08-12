import { useQuery } from "@tanstack/react-query";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom"
import styled from "styled-components";
import { GetInfo, GetPriceInfo } from "../api";
import { Chart } from "./Chart";
import { Container, Img, Loader, Title } from "./Coins";
import { Price } from "./Price";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";

export const Header = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
`

export const HomeBtn = styled.div`
  color: ${props=>props.theme.accentColor};
  font-size: 30px;
  top: 25px;
  left: 25px;
  cursor: pointer;
  position: absolute;
  svg{
    transition: .5s ease-in;
    &:hover{
        scale: 1.2;
    }
  }
`

export const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props=>props.theme.boxColor};
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 2px 4px 12px rgba(0,0,0,.01);
`;

export const OverviewItem = styled.div`
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

export const Tabs = styled.div`
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
  background-color:  ${props=>props.isActive ? props.theme.accentColor : props.theme.boxColor};
  color: ${props=>(props.theme.accentColor == "#ff6b81" && props.isActive) ? "white" : props.theme.textColor};
  transition: color .5s ease-in;
  box-shadow: 2px 4px 12px rgba(0,0,0,.01);
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

interface IInfo {
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

export interface IPriceInfo {
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
    const { coinId } = useParams() as unknown as ICoinID
    const { state } = useLocation() as ILocation
    const { isLoading: infoLoading, data: infoData } = useQuery<IInfo>(["infoInfo", coinId], ()=>GetInfo(coinId))
    const { isLoading: priceLoading, data: priceData } = useQuery<IPriceInfo>(["priceInfo", coinId], ()=>GetPriceInfo(coinId),
        // {refetchInterval: 5000}
    )
    // priceInfo 쿼리키 중복을 막기위해 기입
    // argument를 fetch함수에 전달하기 위해서 ()=>GetPriceInfo(coinId) 익명함수안에 넣어주었다.
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    const navigate = useNavigate()

    const loading = infoLoading || priceLoading
    console.log(priceData)

    return (
        <>
            <HomeBtn onClick={()=>navigate(`/`)}>
                <FontAwesomeIcon
                    icon={faArrowLeft}
                />
            </HomeBtn>
            <Container>
                <Helmet>
                    <title>
                    {state ? state : loading ? "Loading..." : infoData?.name}
                    </title>
                </Helmet>
                <Header>
                    <Title>
                        <Img src={`https://coinicons-api.vercel.app/api/icon/${infoData?.symbol.toLowerCase()}`}></Img>
                        {state ? state : loading ? "Loading..." : infoData?.name}
                    </Title>
                </Header>
                    {loading? (
                        <Loader>Loading...</Loader>
                        ) : (
                            <>
                                <Overview>
                                    <OverviewItem>
                                        <span>Rank:</span>
                                        <span>{infoData?.rank}</span>
                                    </OverviewItem>
                                    <OverviewItem>
                                        <span>Symbol:</span>
                                        <span>{infoData?.symbol}</span>
                                    </OverviewItem>
                                    <OverviewItem>
                                        <span>Price:</span>
                                        <span>$ {priceData?.quotes.USD.price.toFixed(3)}</span>
                                    </OverviewItem>
                                </Overview>
                                <Description>{infoData?.description}</Description>
                                <Overview>
                                    <OverviewItem>
                                        <span>Total Suply:</span>
                                        <span>{priceData?.total_supply}</span>
                                    </OverviewItem>
                                    <OverviewItem>
                                        <span>Max Supply:</span>
                                        <span>{priceData?.max_supply}</span>
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
                                
                                {chartMatch? <Chart coinId={coinId}/>:null}
                                {priceMatch? <Price coinId={coinId}/>:null}
                            </>
                        )
                    }
            </Container>
        </>
    )
}