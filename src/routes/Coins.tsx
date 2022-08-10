import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
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
        a{
            color:${(props)=>props.theme.accentColor};
        }
    }
`

export const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`

export const Title = styled.h1`
    font-size: 48px;
    color:${(props)=>props.theme.accentColor};
    display: flex;
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
      <Header>
        <Title>Coins</Title>
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