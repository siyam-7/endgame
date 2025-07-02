export default function(prop){
    const style = {
        backgroundColor : prop.backgroundColor,
        color: prop.color
    };
    return(
        <div className="language" style={style}>{prop.name}</div>
    )
}