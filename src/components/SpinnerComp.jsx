import spinner from '../../src/assets/spinner.svg'
import React from 'react'
import './SpinnerComp.scss';

export default function SpinnerComp() {
    return (
        <div className='spinner-container'>
            <div>
                <img src={spinner} alt="Loading..." className='spinner' />
            </div>
        </div>
    )
}