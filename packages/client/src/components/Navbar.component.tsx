import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CardService from "../service/cards.service";
import { card } from "../types";
import { Switch } from "./Switch.component";

import "./navbar.style.css"

import logo from "../images/logo.webp"

export const Navbar = () => {

    const timeout = useRef<number>();
    const search = useRef<HTMLInputElement>(null);

    const [ target, setTarget ] = useState<string>()
    const [ found, setFound ] = useState<card[]>()
    const [ loading, setLoading ] = useState(false);
    const [ current, setCurrent ] = useState(0);

    const navigate = useNavigate()
    
    const searchChangeHandler = ( event: ChangeEvent<HTMLInputElement> ) => {
        const search = event.currentTarget.value;

        setLoading(true)

        timeout.current && clearTimeout(timeout.current)

        if(search == ""){
            setTarget(undefined)
            setLoading(false)
        } 
        else
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
            setLoading(false)
        }
        else{
            setLoading(true)
            searchCardHandler()
        }
    }, [target])

    useEffect(() => {
        const clickOutsideHandler = ( event: any ) => {
            (search.current && !search.current.contains(event.target)) && setFound(undefined)
        }

        document.addEventListener("mousedown", clickOutsideHandler);

        return(() => document.removeEventListener("mousedown", clickOutsideHandler))
    }, [search])

    return(
        <div
            className="navbar-container"
        >
            <img 
                className="navbar-logo"
                onClick={() => navigate('/')} 
                src={logo} 
            />
            <div
                className="navbar-search-container"
            >
                <input 
                    ref={search}
                    onChange={searchChangeHandler}
                    onKeyDown={searchEnterHandler}
                    type="search" 
                    placeholder="search..."
                    className="navbar-search-input"
                />
                {
                    !loading ?
                    (
                        found &&
                        (
                            found.length > 0 ?
                            <div
                                className="navbar-search-list"
                            >
                            {
                                    found.map((card, index) => <Link 
                                            to={`/card/${card.name}`}
                                            className="navbar-search-link"
                                            style={ 
                                                index == current ? 
                                                    { 
                                                        color: "white", 
                                                        backgroundColor: "darkgoldenrod"
                                                    }
                                                : {}
                                            }
                                        >{card.name}</Link>)
                            } 
                            </div> :
                            <div
                                className="navbar-search-list"
                            >
                                <p className="navbar-search-link">
                                    Card not found!
                                </p>
                            </div>
                        )
                    )
                    :
                    <div
                        className="navbar-search-list"
                    >
                        <p className="navbar-search-link">
                            Loading...
                        </p>
                    </div>
                }
            </div>
            <Switch />
            <div
                className="navbar-buttons-container"
            >
                <button>Register</button>
                <button>Login</button>
            </div>
        </div>
    )
}