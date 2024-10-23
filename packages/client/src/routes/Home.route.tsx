import { CSSProperties, useEffect, useState } from "react"
import { card } from "../types";
import CardService from "../service/cards.service";
import { useNavigate } from "react-router-dom";

import "../styles/card.style.css"
import { Alertbox } from "../components/Alertbox.component";

const VList = {
    display: "flex",
    flexWrap: "nowrap",
    overflowY: "hidden",
    overflowX: "scroll",
    width: "100%",
    alignItems: "center",
} as CSSProperties

const HList = {
    display: "flex",
    flexWrap: "wrap",
    width: "60%",
    flexGrow: "2",
    gap: "12px",
    alignItems: "center",
    justifyContent: "center"
} as CSSProperties

export const Home = () => {

    const navigate = useNavigate();

    const [ cards, setCards ] = useState<card[]>();
    const [ card, setCard ] = useState<card>();

    const [ alertActive, setAlertActive ] = useState(false);


    const getCardsHandler = async () => {
        const res = await CardService.get()

        setCards(res.cards)
    }

    useEffect(() => {
        getCardsHandler()
    }, [])

    return(
        <div 
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <p style={{alignSelf: "start"}}>Random Cards:</p>
            <div
                style={VList}
            >
                {
                    cards ? 
                    cards.map(card => <img
                            loading="eager"
                            onClick={() => {
                                setAlertActive(true);
                                setCard(card);
                            }} 
                            className="card-style"
                            src={card.imageUrl}
                        />)
                    :
                        <h1>Loading</h1>
                }
            </div>
            {
                (alertActive && card) && 
                <Alertbox setAlert={setAlertActive}>
                    <img src={card.imageUrl} alt="Foda" />
                    <button
                        onClick={() => navigate(`/card/${card.name}/${card.id}`)}
                    >Mais detalhes</button>
                </Alertbox>
            }
        </div>
    )
}