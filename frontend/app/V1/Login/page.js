"use client";
import React from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {Toaster , toast} from 'react-hot-toast';  

export default function Login() {
    const router = useRouter();
    const [loader,setLoader]=useState(false);
    async function handleLogin(e) {
       
        setLoader(true);
        e.preventDefault();
       
        const email = document.querySelector('input[name="email"]').value;
        const password = document.querySelector('input[name="password"]').value;
        console.log(email);
        console.log(password);
        const apiUrl = window.location.hostname === 'localhost'
        ? "http://localhost:8000/api/v1"
        : "https://your-public-url.com/api/v1";
      
        try {
            
            
          const response = await axios.post(`${apiUrl}/login`, {
            email,
            password,
          });
          console.log(response.data);
          
          if (response.data.token) {
                localStorage.setItem('email', email);
                localStorage.setItem('token', response.data.token);
                
                router.push('/V1/HomePage');
          }
          else {
            toast.error(response.data.message, {
                duration: 40000,
                
              });
              setLoader(false);
              
          }
        }
        catch (error) {
            console.log(error);
         }
        
    }
  if (loader) {
    return (
      <div id="loading" class="fixed inset-0 flex items-center justify-center bg-gray-100">
        <div class="text-2xl font-bold text-gray-700">
          Loading...
        </div>
      </div>)
  }
  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-[1000px] h-[650px] bg-[#7ad3f62a] flex rounded-2xl shadow-lg  p-4 pt-10">
        
        <div className="sm:w-[600px] px-16">
          <h2 className="font-bold text-2xl text-[#4527a5] text-center">Login</h2>
          <p className="text-sm mt-7 text-[#6c57b1] text-opacity-70 text-center">
            If you already a member, easily log in
          </p>

          
          <form className="flex flex-col gap-4" action="">
            <input
              className="p-2 mt-8 rounded-xl border"
              type="text"
              name="email"
              placeholder="Your email"
            />
            <div className="relative">
              <input
                className="p-2 mt-8 rounded-xl border w-full"
                type="password"
                name="password"
                placeholder="Your password"
              />

             
              <svg
                className="bi bi-eye-fill absolute top-1/2 right-4 translate-y-1/2"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                viewBox="0 0 16 16"
              >
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
              </svg>
            </div>

            <div className="flex justify-center">
            <button onClick={handleLogin}
                              className="w-[200px] align-center Login-button bg-gradient-to-r from-[#5234b3] to-[#03a9f4] hover:bg-gradient-to-r hover:from-[#8138f6ad] hover:to-[#03a8f4ab] rounded">
                Login
            </button>
            </div>


          </form>

          <div className="mt-10 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center text-sm">
            <img className="w-6 mr-3" src="./img/google_logo_icon.png" alt="" />
            Login with Google
          </button>

          <p className="mt-5 text-xs border-b border-gray-400 py-4">
            <a href="">Forgot Your password?</a>
          </p>

          <div className="mt-3 text-xs flex justify-between items-center">
            <p>
              <a href="#">If you don't have an account?</a>
            </p>
            <button className="py-2 px-5 bg-white border rounded-xl">
              Register
            </button>
          </div>
        </div>

        
        <div className="sm:block hidden w-[400px] pr-10 pt-6">
          <img
            className="sm:block hidden rounded-2xl"
            src="/traveler-girl-searching-right-direction-map.jpg"
            alt="img-login"
          />
        </div>
      <Toaster/>  
      </div>
      
    </section>
  );
}
