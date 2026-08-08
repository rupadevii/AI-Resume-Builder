export default function StatsScore({score}) {
    let stats = {};

    if(score<45){
        stats = {color : "red", status: "Low"}
    }else if(score>=45 && score<75){
        stats = {color: "orange", status: "Average"}
    }else{
        stats = {color: "green", status: "Excellent"}
    }

    const styles = {
        width: `${score}%`,
        backgroundColor: stats.color
    }

    return (
        <section className='builder my-4 p-10 rounded-lg shadow-2xl'>
            <div className='flex justify-between items-center mb-4'>
                <div>
                    <h4 className='text-stone-400 text-sm'>COMPLETION SCORE</h4>
                    <span className='font-extrabold text-4xl'>{score}%</span>
                </div>
                <div>
                    <h4 className='text-stone-400 text-sm'>STATUS</h4>
                    <p>{stats.status}</p>
                </div>
            </div>
            <div className='h-2 border rounded-2xl'>
                <div style={styles} className='h-2 rounded-2xl'></div>
            </div>
        </section>
    )
}
