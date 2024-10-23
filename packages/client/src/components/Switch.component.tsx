import { useEffect, useState } from "react"

import "./switch.style.css"
import moon from "../images/moon.png"
import sun from "../images/sun.png"

export const Switch = () => {
    const [ theme, setTheme ] = useState<string>();

    const detectTheme = () => {
        if(localStorage.getItem("theme")) 
            localStorage.getItem("theme") == "dark" && setTheme("dark") 
        else if(!window.matchMedia)
            return;
        else if(window.matchMedia("(prefers-color-scheme: dark)").matches)
            setTheme("dark")
        else
            setTheme('light')
    }

    const [ image, setImage ] = useState<string>();

    const changeHandler = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const checked = e.currentTarget.checked;

        setImage(checked ? moon : sun)
        setTheme(checked ? "dark" : "light")
    }

    useEffect(() => {
        if(theme == "dark"){
            setImage(moon)
            document.documentElement.setAttribute("data-theme", "dark")
        }
        else{
            setImage(sun)
            document.documentElement.setAttribute("data-theme", "light")
        } 

    }, [theme])

    useEffect(() => {
        detectTheme()
    }, [])

    return(
        <label>
            <input
                onChange={changeHandler}
                className="checkbox-change-theme"
                type="checkbox"
                checked={theme == "dark" ? true : false}
            />
            <div
                className="change-theme"
            >
                <div
                    className="change-theme-img"
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: '80%',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }}
                />
            </div>
        </label>
    )
}