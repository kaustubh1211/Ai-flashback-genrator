import React from "react";

const Flashcard = ({ question, answer, flipped, onFlip }) => {
  return (
    <div className="relative w-64 h-40 perspective">
        <div> 
            <div  className="w-64 h-40 p-4 bg-blue-100 shadow-lg rounded-md cursor-pointer flex items-center justify-center text-center "
            onClick={onFlip}
            >
         {flipped ?
         
         
         <div
         className={`absolute inset-0 bg-blue-200 backface-hidden flex items-center justify-center transform `}
       >
         <span className="text-lg font-semibold text-gray-700">{answer}</span>
       </div>
         
         : 
         <div
         className={`absolute inset-0 backface-hidden flex items-center justify-center `}
       >
         <span className="text-lg font-semibold text-gray-700">
           {question}
         </span>
       </div>
         
         }
            </div>


    </div>
    </div>
  );
};

export default Flashcard;
