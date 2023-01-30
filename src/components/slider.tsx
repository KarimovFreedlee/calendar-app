import { useEffect, useState } from 'react'
import { getElementsByIndex } from '../data/dataController'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import "../css/slider.scss"
import 'swiper/scss';
import { useAppSelector } from '../store/store';

export default function Slider() {
    const currentIndex = useAppSelector(state => state.counterReducer.currentIndex)
    
    const [swiper, setSwiper] = useState<ReturnType<typeof useSwiper>>(useSwiper());
    const [slideIndex, setSlideIndex] = useState<number>(0)
    const [slidesPerView, setSlidesPerView] = useState<number>(3)
    
    const mainClass: string = "slider"
    const buttonClass: string = `${mainClass}__button`

    const elementClass: string = "element"
    const headerClass: string = `${elementClass}__header`
    const textClass: string = `${elementClass}__text`

    useEffect(() => {
        const { innerWidth: width } = window;

        if(width < 430) {
            setSlidesPerView(2)    
        } else
            setSlidesPerView(getElementsByIndex(currentIndex).length < 3 ? getElementsByIndex(currentIndex).length : 3)
    }, [currentIndex])

    function handleRightButtonClick(): void {
        swiper.slideNext()
    }

    function handleLeftButtonClick(): void {
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
                spaceBetween={25}
                resizeObserver={false}
                slidesPerView={slidesPerView}
                onSlideChange={(swiper) => setSlideIndex(swiper.activeIndex)}
                onSwiper={(swiper) => setSwiper(swiper)}
            >
                {getElementsByIndex(currentIndex).map((item, key) => {
                    return <SwiperSlide key={crypto.randomUUID()}> 
                        <div className={`${elementClass} ${elementClass}${slideIndex === key ? `-active` : ``}`}>
                            <p className={headerClass}>
                                {item.year}
                            </p>
                            <p className={textClass}>
                                {item.text}
                            </p>
                        </div>
                    </SwiperSlide>
                })}
            </Swiper>
            <button className={buttonClass} onClick={handleRightButtonClick} 
                style = {slideIndex === getElementsByIndex(currentIndex).length - 3 || getElementsByIndex(currentIndex).length <= 2  ? {visibility: "hidden"} : {}}
            >
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L1 11" stroke="#3877EE" stroke-width="2"/>
                </svg>
            </button>
        </div>
    )
}
