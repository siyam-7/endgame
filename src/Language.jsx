import clsx from "clsx";
export default function(prop){
    const style = {
        backgroundColor : prop.backgroundColor,
        color: prop.color
    };
    return(
        <div className={clsx("language",{
            lost: prop.lost
        })} style={style}>{prop.name}</div>
    )
}