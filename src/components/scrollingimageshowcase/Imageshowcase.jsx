import React, { useEffect, useRef, useState } from 'react';
import styles from './Imageshowcase.module.css';
import Projects from '../projects/projects';
import Stack from '../stack/stack';
import Experience from '../experience/experience';
import About from '../about/about';
import dragImage from './images/Dragger.png'; // Import your drag image

const ImageShowCase = () => {
    const [focusedSection, setFocusedSection] = useState(null);
    const [focusedURL, setFocusedURL] = useState(null);
    const [dataMouseDownAt, setDataMouseDownAt] = useState(0);
    const [dataPrevPercentage, setDataPrevPercentage] = useState(0);
    const [dataPercentage, setDataPercentage] = useState(0);
    const [allowClick, setAllowClick] = useState(true);
    const [showDragImage, setShowDragImage] = useState(true); // State to control the visibility of the drag image

    const imagearray = [
        {
            'section name': 'Stack',
            'url': require('../../images/yourBackgroundImage1.jpg'),
        },
        {
            'section name': 'Projects',
            'url': require('../../images/yourBackgroundImage10.jpg'),
        },
        {
            'section name': 'Experience',
            'url': require('../../images/yourBackgroundImage4.jpg'),
        },
        {
            'section name': 'About Me',
            'url': require('../../images/yourBackgroundImage8.jpg'),
        },
    ];

    const track = useRef();
    const focusedimage = useRef();
    const expandedsection = useRef();

    useEffect(() => {
        // Hide the drag image after 3 seconds
        const timer = setTimeout(() => {
            setShowDragImage(false);
        }, 3000);

        // Hide the drag image on any click event
        const handleClick = () => setShowDragImage(false);
        window.addEventListener('click', handleClick);

        // Cleanup event listener and timer on component unmount
        return () => {
            clearTimeout(timer);
            window.removeEventListener('click', handleClick);
        };
    }, []);

    const handleMouseDown = (e) => {
        if (focusedURL) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        setDataMouseDownAt(clientX);
    };

    const handleMouseMove = (e) => {
        if (focusedURL) return;
        if (dataMouseDownAt === 0) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const mouseDelta = parseFloat(dataMouseDownAt) - clientX;
        const maxDelta = window.innerWidth < 600 ? window.innerWidth * 2 : window.innerWidth;
        const percentage = (mouseDelta / maxDelta) * -100,
            nextPercentageUnconstrained = parseFloat(dataPrevPercentage) + percentage,
            nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

        const images = [...document.querySelectorAll(`.${styles.image}`)];

        images.forEach((image) => {
            image.animate({
                objectPosition: `${nextPercentage + 100}% 50%`,
            }, { duration: 1200, fill: "forwards" });
        });

        setDataPercentage(nextPercentage);
        track.current.animate({
            transform: `translate(${nextPercentage}%, -50%)`,
        }, { duration: 1200, fill: "forwards" });
    };

    const handleMouseUp = (e) => {
        if (focusedURL) return;
        setDataMouseDownAt(0);
        if (dataPrevPercentage !== dataPercentage) setAllowClick(false);
        if (dataPrevPercentage === dataPercentage) setAllowClick(true);
        setDataPrevPercentage(dataPercentage ? dataPercentage : 0);
    };

    const handlesectionclick = (url, name) => {
        if (focusedURL) return;
        if (!allowClick) return;
        setFocusedURL(url);
        setFocusedSection(name);
        expandedsection.current.style.opacity = `1`;
        expandedsection.current.style.width = `100vw`;
        expandedsection.current.style.height = `100vh`;
        setTimeout(() => {
            focusedimage.current.classList.add(styles.bluredbg);
        }, 500);
    };

    const handlesectionexit = () => {
        expandedsection.current.style.opacity = `0`;
        expandedsection.current.style.width = `0px`;
        expandedsection.current.style.height = `0px`;
        focusedimage.current.classList.remove(styles.bluredbg);
        setTimeout(() => {
            setFocusedURL(null);
            setFocusedSection(null);
        }, 500);
    };

    return (
        <>
            {showDragImage && (
                <div className={styles.dragImageContainer}>
                    <img src={dragImage} alt="Drag Image" className={styles.dragImage} />
                </div>
            )}
            <div className={styles.parent} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}
                onTouchStart={handleMouseDown} onTouchMove={handleMouseMove} onTouchEnd={handleMouseUp}>
                <div className={`${styles.track}`} ref={track}>
                    {imagearray.map((item, index) => (
                        <div className={styles.section} key={index} onClick={() => handlesectionclick(item.url, item['section name'])}>
                            <img className={`${styles.image}`} src={item.url} draggable={false} alt='gallery images' />
                            <div className={styles.sectionname}>{item['section name']}</div>
                            <div className={styles.shadowbox}></div>
                        </div>
                    ))}
                </div>
                <div className={styles.expandedsection} ref={expandedsection}>
                    <img className={styles.bgimg} src={focusedURL} ref={focusedimage} alt='Background Image' />
                    <div className={styles.expandedcontainer}>
                        {focusedSection === 'Stack' && (
                            <Stack exitfn={handlesectionexit}/>
                        )}
                        {focusedSection === 'Experience' && (
                            <>
                                <Experience exitfn={handlesectionexit}/>
                            </>
                        )}
                        {focusedSection === 'Projects' && (
                            <Projects exitfn={handlesectionexit}/>
                        )}
                        {focusedSection === 'About Me' && (
                            <>
                                <About exitfn={handlesectionexit}/>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ImageShowCase;
