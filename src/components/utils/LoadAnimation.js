import Lottie from "lottie-web";
import { useEffect, useRef } from "react";

export function LoadAnimation({animData}) {
    const animationContainer = useRef(null);

    useEffect(() => {
        // Load the Lottie animation
        const anim = Lottie.loadAnimation({
            container: animationContainer.current,
            animationData: animData,
            renderer: 'svg', // Choose the renderer ('svg', 'canvas', 'html')
            loop: true,
            autoplay: true,
        });

        // Clean up animation resources when the component unmounts
        return () => anim.destroy();
    }, []);

    return (
        <div
            ref={animationContainer}
            style={{ width: '300px', height: '300px' }}
        />
    );
}