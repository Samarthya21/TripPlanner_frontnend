"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import  PlaceCard  from '../../components/PlaceCard/PlaceCard.js';

export default function TripPage() {
    
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        const tripData = localStorage.getItem("trip_from_saved");
        if (tripData) {
            setTrip(JSON.parse(tripData));
        }
    }, []);

    if (!trip) {
        return <div>Loading...</div>;
    }

    const { attractions = [], hotels = [], foods = [] } = trip;   

    return (
        <div>
            <h1>Trip Details</h1>
            <div className="flex flex-wrap h-screen w-screen m-10 ">
                <div className="flex flex-wrap h-10 ">
                {hotels.map((hotel, idx) => (
                    <PlaceCard key={idx} name={hotel.name} rating={hotel.rating} image={hotel.image} />
                ))}
                {attractions.map((attraction, idx) => (
                    <PlaceCard key={idx} name={attraction.name} rating={attraction.rating} image={attraction.image} />
                ))}
                {foods.map((food, idx) => (
                    <PlaceCard key={idx} name={food.name} rating={food.rating} image={food.image} />
                ))}
                </div>
                
            </div>
        </div>
    );
}