import React from 'react'

export default function PlayButtons({
    songFinished,
    abandon,
    matchingResults,
    handleAbandon,
    handleReplay
}) {
    return (
        <div className="play__buttons">
            {songFinished && !abandon && !matchingResults && (
                <button className="button-play" onClick={handleReplay}>
                    Réécouter
                </button>
            )}

            {songFinished && !matchingResults && !abandon && (
                <button className="button-play" onClick={handleAbandon}>
                    Réponse
                </button>
            )}
        </div>
    )
}