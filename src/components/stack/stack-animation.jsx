import { useEffect, useRef, useState } from "react";
import styles from "./stack-animation.module.css";
import imageone from "../../images/stack/file-type-html.902x1024.png";
import imagetwo from "../../images/stack/javascript-js.1024x1024.png";
import imagethree from "../../images/stack/react.1024x911.png";
import imagefour from "../../images/stack/net-logo.png";
import imagefive from "../../images/stack/c-sharp-logo.png";
import imagesix from "../../images/stack/python-logo.png";

const StackAnimation = () => {
    const imagebg = useRef();
    const images = [imageone, imagetwo, imagethree, imagefour, imagefive, imagesix];
    const colors = ['#264653', '#a59636', '#73a4ac', '#e0e0e0', '#eccaff', '#00509d'];
    const [image, setimage] = useState(imageone);
    const [fade, setfade] = useState(false);

    useEffect(() => {
        const parent = document.querySelector(`.${styles.homesearchparent}`);
        setTimeout(() => {
            parent.style.opacity = '1';
        }, 500);
    }, []);

    useEffect(() => {
        let timeoutFadeIn, timeoutUpdate, timeoutFadeOut;

        const finalindex = images.length - 1;
        const currentimageindex = images.findIndex(item => item === image);

        // Trigger fade-out effect
        timeoutFadeIn = setTimeout(() => {
            setfade(true);
        }, 4000);

        // Update image, and background
        timeoutUpdate = setTimeout(() => {
            const nextIndex = (currentimageindex === finalindex) ? 0 : currentimageindex + 1;

            setimage(images[nextIndex]);

            if (imagebg.current) {
                imagebg.current.style.backgroundColor = colors[nextIndex];
            }
        }, 5000);

        // Trigger fade-in effect
        timeoutFadeOut = setTimeout(() => {
            setfade(false);
        }, 6000);

        return () => {
            clearTimeout(timeoutFadeIn);
            clearTimeout(timeoutUpdate);
            clearTimeout(timeoutFadeOut);
        };
    }, [image]);

    return (
        <>
            <div className={styles.homesearchparent}>
                <div className={styles.homesearch_main}>
                    <div className={styles.bannerimage_holder}>
                        <img
                            className={`${styles.bannerimage} ${fade ? styles.fadedownup : ''}`}
                            src={image}
                            alt="banner image"
                        />
                        <div ref={imagebg} className={styles.image_background}></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StackAnimation;
