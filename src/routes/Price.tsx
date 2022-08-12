import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { GetPriceInfo } from "../api";
import { IPriceInfo } from "./Coin";
import { Loader } from "./Coins";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

export const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props=>props.theme.boxColor};
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 2px 4px 12px rgba(0,0,0,.01);
  align-items: center;
  margin: 10px;
`;

export const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p{
    font-weight: 500;
  }
`;

export const AccentItem = styled.span<{isTrue?:boolean}>`
    color: ${props=>props.isTrue? props.theme.upColor : props.theme.accentColor}};
    font-weight: 700;
    font-size: 20px;
    svg{
        margin-left: 10px;
    }
`;

export const SubItem = styled.span`
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
`;

interface IPrice {
    coinId: string;
    }

export function Price({coinId}:IPrice) {
    const { isLoading, data } = useQuery<IPriceInfo>(["priceInfo", coinId], ()=>GetPriceInfo(coinId)
        ,{refetchInterval: 3000}
    )
    const upDownCheck = (rate:number|undefined)=>{
        if(rate){
            return rate > 0
        }
    }
    return(
        <>
            {isLoading ? <Loader>Loding...</Loader> : (
                <>
                    <Overview>
                        <OverviewItem>
                            <SubItem>Percent_Change</SubItem>
                            <p>15 minute :</p>
                        </OverviewItem>
                        <OverviewItem>
                            <AccentItem
                                isTrue={
                                upDownCheck(data?.quotes.USD.percent_change_15m) === true
                            }>
                                {data?.quotes.USD.percent_change_15m}
                                <FontAwesomeIcon
                                    icon={ upDownCheck(data?.quotes.USD.percent_change_15m) === true ? faChevronUp : faChevronDown}
                                />
                            </AccentItem>
                        </OverviewItem>
                    </Overview>
                    <Overview>
                        <OverviewItem>
                            <SubItem>Percent_Change</SubItem>
                            <p>30 minute :</p>
                        </OverviewItem>
                        <OverviewItem>
                            <AccentItem
                                isTrue={
                                upDownCheck(data?.quotes.USD.percent_change_30m) == true
                            }>
                                {data?.quotes.USD.percent_change_30m}
                                <FontAwesomeIcon
                                    icon={ upDownCheck(data?.quotes.USD.percent_change_30m) === true ? faChevronUp : faChevronDown}
                                />
                            </AccentItem>
                        </OverviewItem>
                    </Overview>
                    <Overview>
                        <OverviewItem>
                            <SubItem>Percent_Change</SubItem>
                            <p>1 hour :</p>
                        </OverviewItem>
                        <OverviewItem>
                            <AccentItem
                                isTrue={
                                upDownCheck(data?.quotes.USD.percent_change_1h) == true
                            }>
                                {data?.quotes.USD.percent_change_1h}
                                <FontAwesomeIcon
                                    icon={ upDownCheck(data?.quotes.USD.percent_change_1h) === true ? faChevronUp : faChevronDown}
                                />
                            </AccentItem>
                        </OverviewItem>
                    </Overview>
                    <Overview>
                        <OverviewItem>
                            <SubItem>Percent_Change</SubItem>
                            <p>12 hour :</p>
                        </OverviewItem>
                        <OverviewItem>
                            <AccentItem
                                isTrue={
                                upDownCheck(data?.quotes.USD.percent_change_12h) == true
                            }>
                                {data?.quotes.USD.percent_change_12h}
                                <FontAwesomeIcon
                                    icon={ upDownCheck(data?.quotes.USD.percent_change_12h) === true ? faChevronUp : faChevronDown}
                                />
                            </AccentItem>
                        </OverviewItem>
                    </Overview>
                    <Overview>
                        <OverviewItem>
                            <SubItem>Percent_Change</SubItem>
                            <p>30 day :</p>
                        </OverviewItem>
                        <OverviewItem>
                            <AccentItem
                                isTrue={
                                upDownCheck(data?.quotes.USD.percent_change_30d) === true
                            }>
                                {data?.quotes.USD.percent_change_30d}
                                <FontAwesomeIcon
                                    icon={ upDownCheck(data?.quotes.USD.percent_change_30d) === true ? faChevronUp : faChevronDown}
                                />
                            </AccentItem>
                        </OverviewItem>
                    </Overview>
                </>
            )}
        </>
    )
}