import React,{useState} from 'react'
import { aiRun } from '../Api/ApiServices'
import Flashcard from './Flashcard'

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
              const [question, answer] = line.split(":") ;
              return {
                question: question?.trim(),
                answer: answer?.trim()
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
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">AI Flashcards Generator</h1>

    <div className="text-center flex justify-center mt-11">
      <div style={{ display: "flex" }}>
        <input
          type="text"
          placeholder="Search FlashCard Topic "
          onChange={handleChangeSearch}
          value={search}
          className="border px-4 py-2 rounded-lg w-80"
        />
        <button
          onClick={handleClick}
          style={{ marginLeft: "20px" }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </div>
    </div>


    {loading ? (
      <div className="text-center mt-6">Loading...</div>
    ) : (
 
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {response.map((fc, idx) => (
          <Flashcard
            key={idx}
            quetion={fc.question}
            answer={fc.answer}
            fliped={flippedIndex === idx}
            onFlip={() => setFlippedIndex(flippedIndex === idx ? null : idx)}
          />
        ))}
      </div>
    )}
  </div>
  )
}
