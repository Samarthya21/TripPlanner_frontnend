import { create } from 'zustand';

const useStore = create((set) => ({
    foods: [],
    hotels: [],
    attractions: [],
    
    addFood: (food) => set((state) => {
        if (state.foods.some(existingFood => existingFood.id === food.id)) {
            return state;
        }
        return {
            foods: [...state.foods, food]
        };
    }),
    //might not work as food.id is not defined in the obj can replcae with food.name
    deleteFood: (foodId) => set((state) => ({
        foods: state.foods.filter(food => food.id !== foodId)
    })),
    
    addHotel: (hotel) => set((state) => {
        if (state.hotels.some(existingHotel => existingHotel.id === hotel.id)) {
            return state; 
        }
        return {
            hotels: [...state.hotels, hotel]
        };
    }),
    
    deleteHotel: (hotelId) => set((state) => ({
        hotels: state.hotels.filter(hotel => hotel.id !== hotelId)
    })),
    
    addAttraction: (attraction) => set((state) => {
        if (state.attractions.some(existingAttraction => existingAttraction.id === attraction.id)) {
            return state; 
        }
        return {
            attractions: [...state.attractions, attraction]
        };
    }),
    
    deleteAttraction: (attractionId) => set((state) => ({
        attractions: state.attractions.filter(attraction => attraction.id !== attractionId)
    }))
}));

export default useStore;