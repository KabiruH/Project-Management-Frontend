import Input from '../common/Input';
const InputContainer = ({label,placeholder,type,name,error,registerFunction})=> {
    return(
        <div className='flex flex-col gap-2'>
                 <label className='text-sm font-medium font-sans text-secondary'>{label}<span className='text-primary'>*</span></label>
                   <input  {...registerFunction(name)} placeholder={placeholder} type={type}  className="w-full p-2 border border-gray-300 rounded"/>
                {error ? <p className='text-red-600 body2'>{error}</p> : "" }
                </div>
    );
}

export default InputContainer;