"use client"

import { jwtDecode } from "jwt-decode";
import { useEffect } from "react"
import axios from "axios";

export default function MyTrips() { 
    async function getTrips(email) {
        try {
            const response = await axios.post("http://localhost:8000/api/v1/mytrips", {
                email
            });
            console.log(response);
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/V1/Login');
        }
        else {
            const decoded = jwtDecode(token);
            const email = decoded.email;
            getTrips(email);
        }
    },[])
    return (
        <div className="h-screen w-screen">MyTrips
            <div>
                
        </div>
        </div>
    )
}