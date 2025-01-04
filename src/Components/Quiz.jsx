import React, { useState } from "react";
import { aiRun } from "../Api/ApiServices";
import Flashcard from "./Flashcard";

export default function Quiz() {
  const [search, setSearch] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState(null);

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      const result = await aiRun(search);
      console.log("API Response:", result);

      if (result) {
        const data = result.split("\n").map((line) => {
          const [question, answer] = line.split(":");
          return {
            question: question?.trim(),
            answer: answer?.trim(),
          };
        });

        setResponse(data);
      } else {
        setResponse([{ question: "Error", answer: "No valid data found." }]);
      }
    } catch (err) {
      console.error("Error in handleClick:", err);
      setResponse([{ question: "Error", answer: "Could not fetch data." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800  hover:animate-rotate-y animate-once animate-duration-[3000ms]">
        AI Flashcards Generator
      </h1>
      <p className="text-center text-gray-600 mt-6 px-4">
        Enter a topic in the search box and click the "Generate" button to
        create study flashcards. Each card will display a question on the front,
        and you can click to flip it and reveal the answer on the back. Enhance
        your learning with AI-powered flashcards!
      </p>

      <div className="flex justify-center mt-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Enter Flashcard Topic"
            onChange={handleChangeSearch}
            value={search}
            className="border border-gray-300 px-4 py-2 rounded-md shadow-sm w-80 focus:ring focus:ring-blue-200 focus:outline-none"
          />
          <button
            onClick={handleClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:ring focus:ring-blue-300"
          >
            Generate
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-8 text-gray-600 font-medium">
          Loading...
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 animate-flip-up items-center justify-items-center ">
          {response.map((fc, idx) => (
            <Flashcard
              className="animate-flip-up"
              key={idx}
              question={fc.question}
              answer={fc.answer}
              flipped={flippedIndex === idx}
              onFlip={() => setFlippedIndex(flippedIndex === idx ? null : idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
