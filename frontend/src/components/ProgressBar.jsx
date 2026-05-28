//Simple component for the progress bar

export default function ProgressBar({param}) {
    return (
        <div>
            <progress value={param["total"]} max={1000000}/>
            <span>Current progress: {param["total"]}/1000000 beers</span>
        </div>
    )
}