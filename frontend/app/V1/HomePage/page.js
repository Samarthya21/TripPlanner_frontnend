"use client";
import { useState ,useEffect} from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useStateStore from "../../useCreateStore";
const dotenv = require('dotenv');
dotenv.config();

export default function Page() {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/V1/Login');
        }
    }, []);
    
    
    const [loader,setLoader]=useState(false);
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count > 0 ? count - 1 : 0);

    
    
    const handleSearch = async () => {
        try {
            /*const min_lat = 18.920617;
            const min_lon = 72.754134;
            const max_lat = 19.303749;
            const max_lon = 72.977323;
            */
            //const cityName = "Mumbai";
            const city=document.getElementById("loc").value;    
            setLoader(true);
            const location_response = await axios.get('https://api.geoapify.com/v1/geocode/search', {
                params: {
                  text: city,
                  apiKey: "2fe681d99c6141298640c0d2a22141b4"
                }
            });
            const location = location_response.data.features[0];
            
            const min_lat = location.bbox[1] - 0.5;
            const min_lon = location.bbox[0] - 0.5;
            const max_lat = location.bbox[3] + 0.5;
            const max_lon = location.bbox[2] + 0.5;
            

            const response_foods = await axios.request("http://api.opentripmap.com/0.1/ru/places/bbox", {
                params: {
                    lon_min: min_lon,
                    lat_min: min_lat,
                    lon_max: max_lon,
                    lat_max: max_lat,
                    kinds: 'foods',
                    format: 'geojson',
                    limit: 2,
                    apikey: '5ae2e3f221c38a28845f05b670e9cbb504c3f6a3a7c469e490983311'
                }
            });
            
        
            const response_hotels = await axios.request("http://api.opentripmap.com/0.1/ru/places/bbox", {
                params: {
                    lon_min: min_lon,
                    lat_min: min_lat,
                    lon_max: max_lon,
                    lat_max: max_lat,
                    kinds: 'accomodations',
                    format: 'geojson',
                    limit: 2,
                    apikey: '5ae2e3f221c38a28845f05b670e9cbb504c3f6a3a7c469e490983311'
                }
            }); 
            const response_attractions = await axios.request("http://api.opentripmap.com/0.1/ru/places/bbox", {
                params: {
                    lon_min: min_lon,
                    lat_min: min_lat,
                    lon_max: max_lon,
                    lat_max: max_lat,
                    kinds: 'interesting_places',
                    format: 'geojson',
                    limit: 2,
                    apikey: '5ae2e3f221c38a28845f05b670e9cbb504c3f6a3a7c469e490983311'
                }
            });
            
            const foods = response_foods.data.features;
            const hotels = response_hotels.data.features;
            const attractions = response_attractions.data.features;
            
            const food_Details = [];
            const hotel_Details = [];
            const attraction_Details   = [];
            
            
            for (let i = 0; i < foods.length; i++) {
                const xid = foods[i].properties.xid;
                
                const food_DetailResponse = await axios.get(`http://api.opentripmap.com/0.1/ru/places/xid/${xid}`, {
                    params: { apikey: '5ae2e3f221c38a28845f05b670e9cbb504c3f6a3a7c469e490983311' }
                });

                const food_DetailData = food_DetailResponse.data;

                
                if (food_DetailData.rate >= 2) {
                    food_Details.push({
                        name: food_DetailData.name,
                        rating: food_DetailData.rate,
                        image: food_DetailData.preview ? food_DetailData.preview.source : null
                    });
                }

                
            }
           
            for (let i = 0; i < attractions.length; i++) {
                
                
                const xid = attractions[i].properties.xid;
                
                const attraction_DetailResponse = await axios.get(`http://api.opentripmap.com/0.1/ru/places/xid/${xid}`, {
                    params: { apikey: '5ae2e3f221c38a28845f05b670e9cbb504c3f6a3a7c469e490983311' }
                });
                
                const attraction_DetailData = attraction_DetailResponse.data;

                
                
                    attraction_Details.push({
                        name: attraction_DetailData.name,
                        rating: attraction_DetailData.rate,
                        image: attraction_DetailData.preview ? attraction_DetailData.preview.source : null
                    });

                
            }
            for (let i = 0; i < hotels.length; i++) {
                
                
                const xid = hotels[i].properties.xid;
                
                const hotels_DetailResponse = await axios.get(`http://api.opentripmap.com/0.1/ru/places/xid/${xid}`, {
                    params: { apikey: '5ae2e3f221c38a28845f05b670e9cbb504c3f6a3a7c469e490983311' }
                });
               
                const hotels_DetailData = hotels_DetailResponse.data;
               
                
                
                    hotel_Details.push({
                        name: hotels_DetailData.name,
                        rating: hotels_DetailData.rate,
                        image: hotels_DetailData.preview ? hotels_DetailData.preview.source : null
                    });

                
            }

            
            
            
            
            localStorage.setItem("foods", JSON.stringify(food_Details));
            localStorage.setItem("hotels", JSON.stringify(hotel_Details));
            localStorage.setItem("attractions", JSON.stringify(attraction_Details));
            localStorage.setItem("city", JSON.stringify(city));
            router.push('/V1/Selection');
        }
        catch (err) {
            console.log(err);
        }
    };

    if (loader) {
        return (
            <div id="loading" class="fixed inset-0 flex items-center justify-center bg-gray-100">
            <div class="text-2xl font-bold text-gray-700">
            Loading...
    </div>
</div>
        )
    }
    return (
        
        <div className="w-screen h-screen">
            <nav className="p-4">
                <div className="container mx-auto flex justify-between items-center h-[60px] pb-2">
                    <div className="font-semibold text-3xl">Trip Planner</div>
                    <ul className="flex space-x-4">
                        <li><a href="#" className="">Home</a></li>
                        <li><a href="/V1/MyTrips" className="">MyTrips</a></li>
                        <li><a href="#" className="">Contact</a></li>

                    </ul>
                </div>
                <hr className="border bg-gray-600"/>    
            </nav>
            <div className="flex flex-col items-center mt-32 ">
                <h1 className="text-5xl p-2 my-4">Plan your next adventure</h1>
                <h1 className="text-4xl font-semibold my-8">Where do you want to go?</h1>
                <input id="loc" type="text" placeholder="Enter a location" className="p-2 border rounded mb-4 w-[600px] h-[50px]" />
                <button 
                    onClick={handleSearch}
                    className="p-2 m-6 w-[200px] h-[40px] bg-gradient-to-r from-gray-400 to-gray-800 text-white rounded mb-4">Create new trip</button>
            </div>
            <div className="flex flex-col justify-start ml-[560px] mt-10">
                <h2 className="text-xl font-semibold mb-4">Add date</h2>
                <div className="flex items-center space-x-4 mt-4 mb-4">
                    <input type="date" className="p-2 border rounded" />
                </div>
                <h2 className="text-xl font-semibold mt-4">Add No. of people</h2>
                <div className="flex items-center space-x-4 mt-4">
                    <button onClick={decrement} className="p-2 bg-gray-300 rounded"><FaMinus /></button>
                    <div className="p-2 bg-green-200 rounded w-12 text-center">{count}</div>
                    <button onClick={increment} className="p-2 bg-gray-300 rounded"><FaPlus /></button>
                </div>
            </div>
        </div>
    );
}