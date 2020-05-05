import React from "react";
import { Link } from "react-router-dom";

const NoFound = () => (
    <div>
        <div>
        <Link to="/"><button className="Button"> Regresar al login</button></Link>
        </div>

        <div>
            NoFound
        </div>
    </div>
);

export default NoFound;