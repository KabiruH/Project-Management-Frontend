import Button from "../Button";

const ButtonWithIcon = ({onClick,Icon,name})=>{
    return(
        <Button onClick={onClick} className="flex justify-center items-center gap-2 bg-buttonBg" >
        <span  className="text-white body2">{name}</span>
        {Icon}
      </Button>
)
}

export default ButtonWithIcon;