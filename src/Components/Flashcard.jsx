import React from "react";

const Flashcard = ({ question, answer, flipped, onFlip, save ,del}) => {
  return (
    <div className="relative w-64 h-40 perspective ">
      <div>
        <div
          className=" bg-white shadow-lg rounded-lg cursor-pointer flex items-center justify-center text-center transform transition-transform duration-500 "
          onClick={onFlip}
        >
          <div
            className={`w-64 h-40 p-4 transition-transform duration-500 transform ${
              flipped ? "rotate-y-180" : ""
            }`}
          >
            {flipped ? (
              <div className="card__front absolute top-0 bottom-0 right-0 left-0 p-8 bg-teal-600 flex items-center justify-center">
                <span
                  style={{ transform: "rotateY(180deg)" }}
                  className="text-lg font-semibold text-gray-100"
                >
                  {answer}
                </span>
              </div>
            ) : (
              <div className="card__back absolute top-0 bottom-0 right-0 left-0 p-8 bg-pink-500 flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-100">
                  {question}
                </span>
              </div>
            )}
          </div>
        </div>
        <div>
          {
            save?
            <button
            className="mt-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300 w-full"
            onClick={save}
            >
            Save Flashcard
          </button>
          :
          <button
          className="mt-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300 w-full"
          onClick={del}
          >
          Delete Flashcard
        </button>
          }
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
