import { getAllBlocks, getBlocksLength } from '../data/dataController';
import { counterSlice } from '../store/reducers/counterReducer';
import { useAppDispatch, useAppSelector } from '../store/store';

export default function Circle() {
    const currentIndex = useAppSelector(state => state.counterReducer.currentIndex) + 1
    const {setIndex} = counterSlice.actions
    const dispatch = useAppDispatch()
    
    const mainClass = "circle-container"
    const circleClass = `${mainClass}__circle`

    function calcRotationDeg() {
        return -360/getBlocksLength() * currentIndex
    }

    return (
        <div className={mainClass}>
            <div className={circleClass} style={{transform: `rotateZ(${calcRotationDeg()}deg)`}}>
                {getAllBlocks().map((item, key) => {
                    return <div className={`item item-${key}`} style={{transform: `rotate(${360 / getBlocksLength() * key}deg) translateX(250px)`}}>
                        <div className={`item__circle ${key + 1 === currentIndex ? `item__circle-active` : ``}`} onClick={() => dispatch(setIndex(key))}>
                            <p style={{transform: `rotate(${-360 / getBlocksLength() * (key - currentIndex)}deg) `}}>
                                {key + 1} 
                            </p>
                        </div>
                        <p className='text'> 
                            {key + 1 === currentIndex && item.name}
                        </p>
                    </div>;
                })}
            </div>
        </div>
    );
}
