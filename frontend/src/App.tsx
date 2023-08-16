import axios from 'axios'
import './App.css'

import { useForm , Controller } from "react-hook-form"

function App() {



  const {register,control, handleSubmit, formState:{errors}, watch} = useForm({
    defaultValues:{
      username:"Ian",
      password:'',
    }
  })


  //console.log(watch("username"))


const FormOnSubmit=(data)=>{console.log(data)}


const handleGetData = async()=>{
  try{
    let {data}= await axios.get('http://localhost:4000/data', {withCredentials:true})
  
    console.log(data)
  }catch(error:any){
    console.log(error.message)
  }
}


const handleLogin = async()=>{
  try{
    let res= await fetch('http://localhost:4000/login')
    const data =await  res.json()
    console.log(data)
  }catch(error:any){
    console.log(error)
  }
}




	return (
		<div className="flex flex-col items-center gap-4  mt-10">

      <form className="flex flex-col items-start gap-4" onSubmit={handleSubmit(FormOnSubmit)}>
        <h5 className='text-center text-3xl font-bold'>login/register</h5>
        <div className="flex flex-col items-start">
          <label htmlFor="username" className="f">username</label>
          <Controller
           name="username"
           rules={{required:"Username is Required"}}
           control={control}
           render={({ field }) => (

            <>
            <input {...field} type="text" className={`${errors.username? "border-red-500":"border-gray-400"} border-2  rounded text-lg py-2 px-3`} />
            <span className='text-red-500'>{errors.username?.message}</span>
            </>
            )}
            
           
           
          />
        
         
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="password" className="form-label">password</label>
          <input type="password" {...register("password", {required:"password is required", minLength:{
            value:4,
            message:'min length should be at least four characters'
          }}) } className="border-2 border-gray-400 rounded text-lg py-2 px-3" />
           <span className='text-red-500'>{errors.password?.message}</span>
        </div>
       
        <button type="submit" className="rounded-lg bg-purple-600 text-white py-3 px-6 text-lg mx-auto">submit</button>
      </form>
      <div className="flex flex-col items-start mt-4 gap-3 ">
        <h4 className='text-5xl font-bold '>Dashboard</h4>
        <p className="token">no token present</p>
        <div className="result"></div>
        <button onClick={handleGetData} className="rounded-lg bg-purple-800 text-white py-3 px-6 text-lg mx-auto" id="data">get data</button>
        <button onClick={handleLogin} className="rounded-lg bg-purple-800 text-white py-3 px-6 text-lg mx-auto" id="data">Login</button>
      </div>
		</div>
	);
}

export default App;