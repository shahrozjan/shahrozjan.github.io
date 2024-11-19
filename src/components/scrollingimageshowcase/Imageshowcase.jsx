import React, { useEffect, useRef, useState } from 'react';
import styles from './Imageshowcase.module.css';
import Projects from '../projects/projects';
import Stack from '../stack/stack';
import Experience from '../experience/experience';
import About from '../about/about';
import dragImage from './images/Dragger.png';

const ImageShowCase = () => {
    const [focusedSection, setFocusedSection] = useState(null);
    const [focusedURL, setFocusedURL] = useState(null);
    const [dataMouseDownAt, setDataMouseDownAt] = useState(0);
    const [dataPrevPercentage, setDataPrevPercentage] = useState(0);
    const [dataPercentage, setDataPercentage] = useState(0);
    const [allowClick, setAllowClick] = useState(true);
    const [showDragImage, setShowDragImage] = useState(true);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const imagearray = [
        {
            'section name': 'Stack',
            'url': require('../../images/stack.jpg'),
            'route': '/stack',
        },
        {
            'section name': 'Projects',
            'url': require('../../images/projects.jpg'),
            'route': '/projects',
        },
        {
            'section name': 'Experience',
            'url': require('../../images/experience.jpg'),
            'route': '/experience',
        },
        {
            'section name': 'About Me',
            'url': require('../../images/about.jpg'),
            'route': '/about',
        },
    ];

    const track = useRef();
    const focusedimage = useRef();
    const expandedsection = useRef();
    const animationFrameId = useRef(null); // Define the animation frame ID reference

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowDragImage(false);
        }, 3000);

        const handleClick = () => setShowDragImage(false);
        window.addEventListener('click', handleClick);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('click', handleClick);
        };
    }, []);

    const handleMouseDown = (e) => {
        if (focusedURL) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        setDataMouseDownAt(clientX);
        setIsTouchDevice(!!e.touches);
    };

    const handleMouseMove = (e) => {
        if (focusedURL || dataMouseDownAt === 0) return;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const mouseDelta = parseFloat(dataMouseDownAt) - clientX;
        const maxDelta = window.innerWidth < 600 ? window.innerWidth * 2 : window.innerWidth;
        const percentage = (mouseDelta / maxDelta) * -100;
        const nextPercentageUnconstrained = parseFloat(dataPrevPercentage) + percentage;
        const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

        if (isTouchDevice) {
            // On touch devices, throttle the movement with requestAnimationFrame
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }

            animationFrameId.current = requestAnimationFrame(() => {
                const images = [...document.querySelectorAll(`.${styles.image}`)];
                images.forEach((image) => {
                    image.style.objectPosition = `${nextPercentage + 100}% 50%`;
                });
                track.current.style.transform = `translate(${nextPercentage}%, -50%)`;
                setDataPercentage(nextPercentage);
            });
        } else {
            // For desktop, keep original mouse movement behavior
            const images = [...document.querySelectorAll(`.${styles.image}`)];
            images.forEach((image) => {
                image.animate({
                    objectPosition: `${nextPercentage + 100}% 50%`,
                }, { duration: 1200, fill: "forwards" });
            });

            track.current.animate({
                transform: `translate(${nextPercentage}%, -50%)`,
            }, { duration: 1200, fill: "forwards" });

            setDataPercentage(nextPercentage);
        }
    };

    const handleMouseUp = () => {
        if (focusedURL) return;
        setDataMouseDownAt(0);
        if (dataPrevPercentage !== dataPercentage) setAllowClick(false);
        if (dataPrevPercentage === dataPercentage) setAllowClick(true);
        setDataPrevPercentage(dataPercentage ? dataPercentage : 0);
    };

    const handlesectionclick = (url, name, route) => {
        if (focusedURL) return;
        if (!allowClick) return;

        // Update the URL without reloading the page or changing the route
        window.history.pushState(null, '', route);

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
        window.history.replaceState(null, '', '/');
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
            <div className={styles.parent}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchMove={handleMouseMove}
                onTouchEnd={handleMouseUp}
            >
                <div className={`${styles.track}`} ref={track}>
                    {imagearray.map((item, index) => (
                        <div className={styles.section} key={index} onClick={() => handlesectionclick(item.url, item['section name'], item.route)}>
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
                            <Stack exitfn={handlesectionexit} />
                        )}
                        {focusedSection === 'Experience' && (
                            <Experience exitfn={handlesectionexit} />
                        )}
                        {focusedSection === 'Projects' && (
                            <Projects exitfn={handlesectionexit} />
                        )}
                        {focusedSection === 'About Me' && (
                            <About exitfn={handlesectionexit} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ImageShowCase;
