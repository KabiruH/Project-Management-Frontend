const Checkbox = ({label})=>{
    return(
        <div className="flex flex-row  items-center gap-1.5">
                <input
                id="chexkbox"
                type="checkbox"
                />
            <label className="body2 text-secondary" for="checkbox">{label}</label>
        </div>
    )
};

export default Checkbox;