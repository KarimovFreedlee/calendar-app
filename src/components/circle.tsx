import { getAllBlocks, getBlocksLength } from '../data/dataController';
import { counterSlice } from '../store/reducers/counterReducer';
import { useAppDispatch, useAppSelector } from '../store/store';

export default function Circle() {
    const currentIndex = useAppSelector(state => state.counterReducer.currentIndex) + 1
    const {setIndex} = counterSlice.actions
    const dispatch = useAppDispatch()
    
    const mainClass: string = "circle-container"
    const circleClass: string = `${mainClass}__circle`
    const paginationClass: string = `${mainClass}__pagination`

    function calcRotationDeg(): number {
        return -360/getBlocksLength() * currentIndex
    }

    return (
        <div className={mainClass}>
            <div className={circleClass} style={{transform: `rotateZ(${calcRotationDeg()}deg)`}}>
                {getAllBlocks().map((item, key) => {
                    return <div className={`item item-${key}`} key={crypto.randomUUID()} style={{transform: `rotate(${360 / getBlocksLength() * key}deg) translateX(265px)`}}>
                        <div className='item__wrapper' style={{transform: `rotate(${-360 / getBlocksLength() * (key - currentIndex)}deg) `}}>
                            <div className={`item__circle ${key + 1 === currentIndex ? `item__circle-active` : ``}`} onClick={() => dispatch(setIndex(key))}>
                                <p>
                                    {key + 1} 
                                </p>
                            </div>
                            <p className='text'> 
                                {key + 1 === currentIndex && item.name}
                            </p>
                        </div>
                    </div>;
                })}
            </div>
            <div className={paginationClass}>
                {getAllBlocks().map((item, key) => {
                    return <div className={`item ${key + 1 === currentIndex ? `item-active` : ``}`} onClick={() => dispatch(setIndex(key))}>
                    </div>
                })}
            </div>
        </div>
    );
}
