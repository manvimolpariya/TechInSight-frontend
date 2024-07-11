
const TextInput = (props) => {
  return (
    <div className='flex flex-col items-center w-full max-w-[350px]'>
     <input {...props}  className='py-3 px-7 m-2 outline-none w-full bg-[#e2e2e2] rounded-full'/> 
     {props.error && <p className='text-red-500 text-left px-7 w-full max-w-[355px] mb-2'>{props.errormessage}</p>}
    </div>
  )
}

export default TextInput
