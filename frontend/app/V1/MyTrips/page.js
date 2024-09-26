"use client"

import { jwtDecode } from "jwt-decode";
import { useEffect , useState} from "react"
import axios from "axios";
import  TripsCard  from '../../components/TripsCard/TripsCard';
import { useRouter } from "next/navigation";

export default function MyTrips() { 
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/V1/Login');
        }
     }, []);
    const [trips,setTrips]=useState([]);
    async function getTrips(email) {
        const apiUrl = window.location.hostname === 'localhost'
        ? "http://localhost:8000/api/v1"
        : "https://tripplanner-backend.onrender.com/api/v1";
        try {
            const response = await axios.post(`${apiUrl}/mytrips`, {
                email:email
            });
            
            localStorage.setItem("trips", JSON.stringify(response.data.data.trip));
            setTrips(response.data.data.trip);
            console.log(trips);
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
            
            const email = decoded.user.email;
            
            getTrips(email);
        }
    },[])
    return (

        <div className="h-screen w-screen">
        <div className='font-semibold text-4xl'>MyTrips</div>
        <div className='flex flex-wrap m-10 '>
        {trips.map((trip, index) => (
                <div key={index}>
                    <div>
                        <TripsCard trip={trip} index={index} />
                    </div>
                </div>
            ))}
        </div>
        </div>
    )
}