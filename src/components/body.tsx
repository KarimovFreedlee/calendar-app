import { getBlockByIndex, getBlocksLength } from '../data/dataController'
import { counterSlice } from '../store/reducers/counterReducer'
import { useAppDispatch, useAppSelector } from '../store/store'
import "../css/body.scss"
import Circle from './circle'
import Slider from './slider'

export default function Body() {
    const currentIndex = useAppSelector(state => state.counterReducer.currentIndex) + 1
    const {incIndex, decIndex, setIndex} = counterSlice.actions
    const dispatch = useAppDispatch()

    const mainClass = "body"
    const headerContainerClass = `${mainClass}__header-container`
    const borderClass = `border-left`
    const headerClass = `header`
    const yearsContainerClass = `${mainClass}__years-container`
    const counterClass = `${mainClass}__counter`
    const buttonsClass = `buttons-container`
    const buttonClass = "button"

    function handleRightButtonClick() {
        if(currentIndex < getBlocksLength())
            dispatch(incIndex())
        else
            dispatch(setIndex(0))
    }

    function handleLeftButtonClick() {
        if(currentIndex > 1)
            dispatch(decIndex())
        else
            dispatch(setIndex(getBlocksLength() - 1))
    }

    return (
        <div className={mainClass}>
            <div className='axis axis-y'></div>
            <div className='axis axis-x'></div>
            <div className={headerContainerClass}>
                <div className={borderClass}></div>
                <h2 className={headerClass}>
                    Исторические даты
                </h2>
            </div>
            <div className={yearsContainerClass}>
                <h1 className="start-year">
                    {getBlockByIndex(currentIndex - 1).startingYear}
                </h1>
                <h1 className="end-year">
                    {getBlockByIndex(currentIndex - 1).endingYear}
                </h1>
            </div>
            <Circle/>
            <div className={counterClass}>
                <div className='text'>
                    0{currentIndex}/0{getBlocksLength()}
                </div>
                <div className={buttonsClass}>
                    <button className={`${buttonClass} ${buttonClass}-left`} onClick={handleLeftButtonClick} disabled={currentIndex === 1}>
                        <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.49988 0.750001L2.24988 7L8.49988 13.25" stroke="#42567A" stroke-width="2"/>
                        </svg>
                    </button>
                    <button className={`${buttonClass} ${buttonClass}`} onClick={handleRightButtonClick} disabled={currentIndex === getBlocksLength()}>
                        <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.49988 0.750001L2.24988 7L8.49988 13.25" stroke="#42567A" stroke-width="2"/>
                        </svg>
                    </button>    
                </div>
            </div>
            <Slider/>
        </div>
    )
}
