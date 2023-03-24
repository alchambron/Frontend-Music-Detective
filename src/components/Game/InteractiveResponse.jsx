import React from "react";

export default function InteractiveResponse({ displayDanger, displaySuccess }) {
    return (
        <div className="play__display__interactive">
            {displayDanger && (
                <div className="play__display__interactive__danger">
                    <p>Mauvaise réponse : Recommencer</p>
                </div>
            )}
            {displaySuccess && (
                <div className="play__display__interactive__success">
                    <p>Felicitation !</p>
                </div>
            )}
        </div>
    );
}