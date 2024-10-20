import React, { useRef, useState } from 'react';
import styles from './Imageshowcase.module.css';
import Projects from '../projects/projects';
import Stack from '../stack/stack';

const ImageShowCase = () => {
    const [focusedSection, setFocusedSection] = useState(null);
    const [focusedURL, setFocusedURL] = useState(null);
    const [dataMouseDownAt, setDataMouseDownAt] = useState(0);
    const [dataPrevPercentage, setDataPrevPercentage] = useState(0);
    const [dataPercentage, setDataPercentage] = useState(0);
    const [allowClick, setAllowClick] = useState(true);

    const track = useRef();
    const focusedimage = useRef();
    const expandedsection = useRef();

    const imagearray = [
        {
            'section name': 'Stack',
            'url': require('../../images/stack.jpg')
        },
        {
            'section name': 'Projects',
            'url': require('../../images/projects.jpg')
        },
        {
            'section name': 'Services',
            'url': require('../../images/services.jpg')
        },
        {
            'section name': 'About Me',
            'url': require('../../images/about.jpg')
        },
    ];

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

        images.map((image) => {
            image.animate({
                objectPosition: `${nextPercentage + 100}% 50%`
            }, { duration: 1200, fill: "forwards" });
        });

        setDataPercentage(nextPercentage);
        track.current.animate({
            transform: `translate(${nextPercentage}%, -50%)`
        }, { duration: 1200, fill: "forwards" });
    };

    const handleMouseUp = () => {
        if (focusedURL) return;
        setDataMouseDownAt(0);
        setAllowClick(dataPrevPercentage === dataPercentage);
        setDataPrevPercentage(dataPercentage || 0);
    };

    const handlesectionclick = (url, name) => {
        if (focusedURL) return;
        if (!allowClick) return;
        setFocusedURL(url);
        setFocusedSection(name);
        console.log(`Focused Section: ${name}`); // Debugging to check if section is clicked

        expandedsection.current.style.opacity = `1`;
        expandedsection.current.style.width = `100vw`;
        expandedsection.current.style.height = `100vh`;

        setTimeout(() => {
            focusedimage.current.classList.add(styles.bluredbg);
        }, 500);
    };

    const handlesectionexit = (e) => {
        e.stopPropagation(); // Prevent the click from closing the expanded section if the content is clicked
        expandedsection.current.style.opacity = `0`;
        expandedsection.current.style.width = `0px`;
        expandedsection.current.style.height = `0px`;
        focusedimage.current.classList.remove(styles.bluredbg);
        setTimeout(() => {
            setFocusedURL(null);
        }, 500);
    };

    return (
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
                    <div className={styles.section} key={index} onClick={() => handlesectionclick(item.url, item['section name'])}>
                        <img className={`${styles.image}`} src={item.url} draggable={false} alt='gallery images' />
                        <div className={styles.sectionname}>{item['section name']}</div>
                        <div className={styles.shadowbox}></div>
                    </div>
                ))}
            </div>

            <div className={styles.expandedsection} ref={expandedsection} onClick={(e) => handlesectionexit(e)}>
                <img className={styles.bgimg} src={focusedURL} ref={focusedimage} alt='Background Image' />
                <div className={styles.expandedcontainer} onClick={(e) => e.stopPropagation()}>
                    {focusedSection === 'Stack' && (
                        <Stack />
                    )}
                    {focusedSection === 'Projects' && (
                        <Projects />
                    )}
                    {focusedSection === 'Services' && (
                        <div>Services Content Here</div>
                    )}
                    {focusedSection === 'About Me' && (
                        <div>About Me Content Here</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageShowCase;
