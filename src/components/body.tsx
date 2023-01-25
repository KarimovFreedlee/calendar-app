import { getAllBlocks, getBlockByIndex, getBlocksLength } from '../data/dataController'
import { counterSlice } from '../store/reducers/counterReducer'
import { useAppDispatch, useAppSelector } from '../store/store'
import "../css/body.scss"

export default function Body() {
    const currentIndex = useAppSelector(state => state.counterReducer.currentIndex) + 1
    const {incIndex, decIndex, setIndex} = counterSlice.actions
    const dispatch = useAppDispatch()

    const mainClass = "body"
    const circleClass = "circle"
    const counerClass = "counter"
    const buttonsClass = "counter__buttons"
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

    function calcRotationDeg() {
        return -360/getBlocksLength() * currentIndex
    }

    return (
        <div className={mainClass}>
            <div>
                <h1>
                    {getBlockByIndex(currentIndex - 1).startingYear} {getBlockByIndex(currentIndex - 1).endingYear}
                </h1>
            </div>
            <div className={circleClass} style = {{transform: `rotateZ(${calcRotationDeg()}deg)`}}>
                {getAllBlocks().map((item, key) => {
                    return <div className={`item item-${key}`} style={{ transform: `rotate(${360/(getBlocksLength()) * key}deg) translateX(250px)`}}>
                        <div className={`item__circle ${key+ 1 === currentIndex ? `item__circle-active` : ``}`} onClick={() => dispatch(setIndex(key))}>
                            <p style={{transform: `rotate(${-360/(getBlocksLength()) * (key - currentIndex)}deg) `}}>
                                {key + 1} 
                            </p>
                        </div>
                        <p className='text'> 
                            {key+ 1 === currentIndex && item.name}
                        </p>
                    </div>
                })}
            </div>
            <div className={counerClass}>
                <div>
                    0{currentIndex}/0{getBlocksLength()}
                </div>
                <div className={buttonsClass}>
                    <button className={`${buttonClass}`} onClick={handleLeftButtonClick} style = {{}}>
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L6 6L1 11" stroke="#3877EE" stroke-width="2"/>
                        </svg>
                    </button>
                    <button className={`${buttonClass} ${buttonClass}-right`} onClick={handleRightButtonClick} style = {{}}>
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L6 6L1 11" stroke="#3877EE" stroke-width="2"/>
                        </svg>
                    </button>    
                </div>
            </div>
        </div>
    )
}
