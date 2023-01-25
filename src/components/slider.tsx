import { useEffect, useState } from 'react'
import { getBlocksLength, getElementsByIndex } from '../data/dataController'
import { Swiper, SwiperSlide } from 'swiper/react';
import "../css/slider.scss"
import 'swiper/scss';
import { useAppSelector } from '../store/store';

export default function Slider() {
    const currentIndex = useAppSelector(state => state.counterReducer.currentIndex)
    
    const [swiper, setSwiper] = useState<any>();
    const [slideIndex, setSlideIndex] = useState(0)
    const [slidesPerView, setSlidesPerView] = useState(3)
    
    const mainClass = "slider"
    const buttonClass = `${mainClass}__button`

    const elementClass = "element"
    const headerClass = `${elementClass}__header`
    const textClass = `${elementClass}__text`

    useEffect(() => {
        setSlidesPerView(getElementsByIndex(currentIndex).length < 3 ? getElementsByIndex(currentIndex).length : 3)
    }, [currentIndex])

    function handleRightButtonClick() {
        swiper.slideNext()
    }

    function handleLeftButtonClick() {
        swiper.slidePrev()
    }

    return (
        <div className={mainClass}>
            <button className={`${buttonClass} ${buttonClass}-left`} onClick={handleLeftButtonClick} style = {slideIndex === 0 ? {visibility: "hidden"} : {}}>
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L1 11" stroke="#3877EE" stroke-width="2"/>
                </svg>
            </button>
            <Swiper
                spaceBetween={5}
                resizeObserver={false}
                slidesPerView={slidesPerView}
                onSlideChange={(swiper) => setSlideIndex(swiper.activeIndex)}
                onSwiper={(swiper) => setSwiper(swiper)}
            >
                {getElementsByIndex(currentIndex).map(item => {
                    return <SwiperSlide key={crypto.randomUUID()}> 
                        <div className={elementClass}>
                            <h3 className={headerClass}>
                                {item.year}
                            </h3>
                            <p className={textClass}>
                                {item.text}
                            </p>
                        </div>
                    </SwiperSlide>
                })}
            </Swiper>
            <button className={buttonClass} onClick={handleRightButtonClick} 
                style = {slideIndex === getElementsByIndex(currentIndex).length - 3 || getElementsByIndex(currentIndex).length <= 2  ? {visibility: "hidden"} : {}}>
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L1 11" stroke="#3877EE" stroke-width="2"/>
                </svg>
            </button>
        </div>
    )
}
