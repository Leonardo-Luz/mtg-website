import { useParams } from "react-router-dom"
import CardService from "../service/cards.service";
import { useEffect, useState } from "react";
import { card } from "../types";

import placeholder from "../images/placeholder.jpg"

export const Card = () => {
    const { name, id } = useParams();

    const [ cards, setCards ] = useState<card[]>();
    const [ loading, setLoading ] = useState(false);

    const getCardHandler = async () => {
        const response = await CardService.getByName(name!)

        id ? 
            setCards([response.cards!.find(card => card.id == id)] as card[])
        :
            setCards(response.cards!)

        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        getCardHandler()
    }, [id, name])

    return( !loading ?
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px"
            }}
        >
            {
                (cards && cards.length > 0) ?
                cards.map( card => 
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                        padding: "20px",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "80%"
                    }}>
                    {
                        card != undefined ?
                        <>
                            <img style={{borderRadius: "12px", maxWidth: "300px"}} src={card.imageUrl ? card.imageUrl : placeholder} alt={card.name + " image"} />

                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px",
                                width: "60%"
                            }}>
                                <p>{card.name ? card.name : "unknown"}</p>
                                <p>{card.type ? card.type : "unknown"}</p>
                                <p>{card.text ? card.text : "unknown"}</p>
                            </div>
                        </>
                        :
                        <p>Error, Card with corrupted ID!</p>
                    }
                    </div>
                )
                :
                    <h1>Loading</h1>
            }
        </div> : "LOADING"
    )
}