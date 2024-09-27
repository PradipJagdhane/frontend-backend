import { useEffect, useState } from 'react';

const useVisitCounter = () => {
    const [visits, setVisits] = useState(0);

    useEffect(() => {
        const storedVisits = Number(localStorage.getItem("visitCounter")) || 0;
        setVisits(storedVisits + 1);
    }, []);

    useEffect(() => {
        if(visits > 0) {
            localStorage.setItem("visitCounter", visits);

        }
    }, [visits]);

    return visits;
       
    
}

export default useVisitCounter;