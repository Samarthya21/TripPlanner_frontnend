"use client"
import React from "react"
import { useRouter } from "next/navigation";



export default function TripsCard({ trip, index }) { 
    const router = useRouter();
    
    function handleTrip() {
        
        localStorage.setItem("trip_from_saved", JSON.stringify(trip));
        router.push('/V1/Trip');
            
            
        
    }
    return (
        <div onClick={handleTrip}
            className="w-[300px] h-[300px] border border-gray-400  max-w-sm rounded overflow-hidden shadow-lg bg-white transform transition-transform duration-300 hover:scale-105 m-5">
            <div >{index}</div>
            
        </div>
    )
}