import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CardService from "../service/cards.service";
import { card } from "../types";
import { Switch } from "./Switch.component";

export const Navbar = () => {

    const timeout = useRef<number>();
    const [ target, setTarget ] = useState<string>()
    const [ found, setFound ] = useState<card[]>()
    const [ loading, setLoading ] = useState(false);
    const [ current, setCurrent ] = useState(0);

    const navigate = useNavigate()
    
    const searchChangeHandler = ( event: ChangeEvent<HTMLInputElement> ) => {
        const search = event.currentTarget.value;

        timeout.current && clearTimeout(timeout.current)

        search == "" ? setTarget(undefined)
        :
        timeout.current = setTimeout(() => {
            setTarget(search)            
        }, 500);
    }
    

    const searchEnterHandler = ( event: KeyboardEvent ) => {
        if(found)
        switch(event.key){
            case "Enter":
                navigate(`/card/${found[current].name}`)
                setTarget(undefined)
                setCurrent(0)
                break;
            case "ArrowUp":
                setCurrent(prev => prev <= 0 ? found.length-1 : prev - 1)
                break;
            case "ArrowDown":
                setCurrent(prev => prev >= found.length-1 ? 0 : prev + 1)
                break;
        }
    }
    
    const searchCardHandler = async () => {
        const cards = (await CardService.search(target!)).cards;

        let temp: card[] = [];

        const aux = cards!.filter(card => {
            if(
                temp.find(a => {
                    return a.name == card.name
                })
            )
                return false;
            else{
                temp.push(card)
                return true;
            }
        }).slice(0, 10)

        setFound(aux)

        setLoading(false);
    }
    

    useEffect(() => {
        if(!target){
            setFound(undefined)
        }
        else{
            setLoading(true)
            searchCardHandler()
        }
    }, [target])

    return(
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "18px",
                boxShadow: "0px 0px 10px 4px black"
            }}
        >
            <img 
                style={{
                    width: "20%"
                }}
                onClick={() => navigate('/')} 
                src="#" 
            />
            <div>
                <input 
                    onChange={searchChangeHandler}
                    onKeyDown={searchEnterHandler}
                    type="search" 
                    placeholder="search..."
                    style={{
                        width: "100%"
                    }}
                />
                {
                    !loading ?
                    (
                        found &&
                        (
                            found.length > 0 ?
                            <div style={{
                                position: "absolute",
                                display: "flex",
                                flexDirection: "column",
                                backgroundColor: "darkslategray",
                                gap: "4px",
                                width: "14%"
                            }}>
                            {
                                    found.map((card, index) => <Link 
                                            to={`/card/${card.name}`}
                                            style={ index == current ? { color: "white"} : {backgroundColor: "black"}}
                                        >{card.name}</Link>)
                            } 
                            </div> : "NOT FOUND"
                        )
                    )
                    :
                    "Loading"
                }
            </div>
            <Switch />
            <div
                style={{
                    width: "20%",
                    display: "flex",
                    flexDirection: "row",
                    gap: "12px"
                }}
            >
                <button>Register</button>
                <button>Login</button>
            </div>
        </div>
    )
}