
import { ReactNode } from "react";
import "./alert-box.style.css";

type alertboxProps = {
    children: ReactNode,
    setAlert:  React.Dispatch<React.SetStateAction<boolean>>
}

export const Alertbox = ( { children, setAlert }: alertboxProps ) => {
    return(
        <div className="alert-container">
            <button 
                className="alert-close"
                onClick={() => setAlert(false)}
            >x</button>
            <hr className="alert-division"/>

            <div className="alert-data">
                {children}
            </div>

        </div>
    )
}