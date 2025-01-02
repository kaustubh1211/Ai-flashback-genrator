import React from 'react'

export default function Flashcard({quetion , answer, fliped , onFlip}) {
  return (
    <div> 
            <div  className="w-64 h-40 p-4 bg-blue-100 shadow-lg rounded-md cursor-pointer flex items-center justify-center text-center"
            onClick={onFlip}
            >
                    {fliped ?answer: quetion}
            </div>


    </div>
  )
}
