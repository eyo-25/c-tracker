import { useQuery } from "@tanstack/react-query"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { GetCoins } from "../api"

export const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto
`

export const Header = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
`

export const CoinList = styled.ul``

export const Loader = styled.div`
    text-align: center;
`

export const Coin = styled.li`
    background-color: white;
    color: black;
    border-radius: 4px;
    margin-bottom: 10px;
    a{
        transition: color .5s ease-in;
        display: flex;
        align-items: center;
        padding: 20px;
    }
    &:hover {
        border-radius: 4px;
        color: white;
        background-color: ${(props)=>props.theme.accentColor};
        transition: background-color .5s linear;
    }
`

export const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`

export const DogyImg = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 20px;
    margin-right: 5px;
`


export const Title = styled.h1`
    font-size: 48px;
    font-weight: 500;
    color:${(props)=>props.theme.accentColor};
    display: flex;
    align-items: center;
`

interface ICoin {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

function Coins() {
  const { isLoading,data } = useQuery<ICoin[]>(["allCoins"], GetCoins)
  return(
    <Container>
      <Helmet>
        <title>C-tracker</title>
      </Helmet>
      <Header>
        <DogyImg src={`https://yt3.ggpht.com/CF1dIIbgWiTgvKBvbfv7H_YThSFuna6JHqVIjMS4MEDIinbywrK5ur7s7jOExz_tFB7B3ccl=s900-c-k-c0x00ffffff-no-rj`}/>
        <Title>Go to Mars</Title>
      </Header>
      {isLoading? (
          <Loader>Loading...</Loader>
        ):(
          <CoinList>
            {data?.slice(0,20).map((coin)=>(
              <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={coin.name}>
                  <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}></Img>
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))}
          </CoinList>
        )}
    </Container>
  )
}

export default Coins