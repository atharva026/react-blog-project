import React from 'react'

function Spinner({ heightVH }) {
    return (
        <div className='flex space-x-2 justify-center items-center' style={{ height: heightVH }}> {/* add mt-40 in className if style not needed*/}
            <span className='sr-only'>Loading...</span>
            <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-.3s]'></div>
            <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-.15s]'></div>
            <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-.0s]'></div>
        </div>
    )
}

export default Spinner;