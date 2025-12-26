const BASE_URL = "http://localhost:3003";


export const fetchCarsApi = async () => {
    const res = await fetch (`${BASE_URL}/cars`);
    if (!res.ok) throw new Error("Failed to fetch cars");
    return await res.json();
}


export const addCarApi = async (carData) => {
    const res = await fetch(`${BASE_URL}/cars` , {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carData),
     }); 
        if (!res.ok) 
            throw new Error("Failed to add car"); 
        return await res.json(); 
    
    };

