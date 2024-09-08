"use client"
import React from "react";
import useStore from '/Users/samarthyaalok/Desktop/TripPlanner/frontend/app/useCreateStore.js'; 
import {Toaster , toast} from 'react-hot-toast'; 

export default function PlaceCard({ name, rate, image, type,selectedCategory }) {
    const foods = useStore(state => state.foods); // Accessing the 'foods' array from the store
    const addFood = useStore(state => state.addFood);
    const hotels = useStore(state => state.hotels);
    const addHotel = useStore(state => state.addHotel);
    const attractions = useStore(state => state.attractions);
    const addAttraction = useStore(state => state.addAttraction);
    const email = localStorage.getItem('email');
    function handleClick(e){
        e.preventDefault();
        
        toast.success('Added to your trip');
        
        let obj = {
            name: name,
            rate: rate,
            image: image,
            email: email,
            type:type,
        }
        console.log(obj);
        if (obj.type === "hotels") {
            
            addHotel(obj);
        }
        if (obj.type === "attractions") {
            addAttraction(obj);
        }
        if (obj.type === "foods") {
            addFood(obj);
        }
        
        
        try {
           
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white transform transition-transform duration-300 hover:scale-105">
            <img className="w-full h-48 object-cover" src={image} alt={name} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 ">{name}</div>
                <div className="flex flex-row justify-between mt-4">
                    <p className="text-gray-700 text-base pt-2">
                        Rating: {rate} ★
                    </p>
                

                    {selectedCategory !== 'all' && (
                        <button 
                            onClick={handleClick}
                            className="border-2 border-red-400 rounded p-2 bg-gradient-to-l from-green-300 to-blue-300">
                            Add to Your Trip
                        </button>
                    )}
                </div>
                
            </div>
          <Toaster/>
        </div>
    );
}

