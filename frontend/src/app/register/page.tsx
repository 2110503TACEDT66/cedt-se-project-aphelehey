'use client'
import userRegister from "@/libs/userRegister";
import { useState } from "react";

export default function RegisterPage() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tel, setTel] = useState('');


    const handleRegister = async() =>{
        
        await userRegister(username,tel,email,password)
        alert("Register Complete")
    }

    return (
        <main className="bg-slate-100 p-5 w-[100%] flex flex-col items-center space-y-4 justify-center">
            <div className="text-2xl font-bold">Register</div>
            <form className="flex items-center flex-col">
                        <div className="flex items-center w-1/2 my-2 w-full">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="username">Username</label>
                            <input type='text' required id="username" name="username" placeholder="UserName"
                                className="bg-white border-2 border-gray-200 rounded w-full p-2
                                text-gray-700 focus:outline-none focus:border-blue-400" onChange={(e)=>{setUsername(e.target.value)}}></input>
                        </div>
                        <div className="flex items-center w-1/2 my-2 w-full">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="email">Email</label>
                            <input type='text' required id="email" name="email" placeholder="email@email.com"
                                className="bg-white border-2 border-gray-200 rounded w-full p-2
                                text-gray-700 focus:outline-none focus:border-blue-400" onChange={(e)=>{setEmail(e.target.value)}}></input>
                        </div>
                        <div className="flex items-center w-1/2 my-2 w-full">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="password">Password</label>
                            <input type='text' required id="password" name="password" placeholder="Password"
                                className="bg-white border-2 border-gray-200 rounded w-full p-2
                                text-gray-700 focus:outline-none focus:border-blue-400" onChange={(e)=>{setPassword(e.target.value)}}></input>
                        </div>
                        <div className="flex items-center w-1/2 my-2 w-full">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="tel">Tel.</label>
                            <input type='text' required id="tel" name="tel" placeholder="xxx-xxx-xxxx"
                                className="bg-white border-2 border-gray-200 rounded w-full p-2
                                text-gray-700 focus:outline-none focus:border-blue-400" onChange={(e)=>{setTel(e.target.value)}}></input>
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded" onClick={(e)=>{e.preventDefault(); handleRegister()}}>Register</button>
                </form>
        </main>
    )
}