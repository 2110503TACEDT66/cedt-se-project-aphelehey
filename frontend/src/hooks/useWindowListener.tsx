import { useEffect, useState } from "react";

export function useWindowListener(evenType: string, listener: EventListener) {
    const [winwidth, setWinwidth] = useState(0)
    useEffect(() => {

        window.addEventListener(evenType, listener)

        return () => {
            window.removeEventListener(evenType, listener)
        }
    }, [evenType, listener])
}