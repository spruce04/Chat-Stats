//Component for the leaderboard - map the names and counts to html divs

export default function Leaderboard({param}) {
    return (
        <div className="leaderboard">
            <div className="lbheader">
                Leaderboard:
            </div>
            May contain slight innacuracies, data from May 2026.
            <div className="content">
            {param.map((element, index) => (
            <div className="lb-row" key={element.name}>
                <span className="lb-rank">#{index + 1}. </span>
                <span className="lb-name">{element.name} - </span>
                <span className="lb-count">{element.count.toLocaleString()}</span>
            </div>
            ))}
            </div>
        </div>
    )
}