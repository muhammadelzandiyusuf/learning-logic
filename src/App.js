import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { calculateDiagonalSum, palindrome } from './utils/helper';

import './App.css';

function App() {
  const [stone, setStone] = useState({ count: 0, matrix: [] });
  const [isPalindrome, setIsPalindrome] = useState(false);

  const { register, handleSubmit } = useForm();

  const handleCalculateMatrix = useCallback((data) => {
    const results = calculateDiagonalSum(data.number);
    setStone(results)
  }, []);

    const handlePalindrome = useCallback((data) => {
        const results = palindrome(data.palindrome);
        setIsPalindrome(results)
    }, []);

  return (
    <div className="app">
      <div className="app-container">
        <h1>Case 1: Unearthing the Philosopher's Stone</h1>
        <form className="app-wrapper" onSubmit={handleSubmit(handleCalculateMatrix)}>
          <input
            className="input"
            type="number"
            placeholder="Masukan jumlah N"
            {...register("number")}
          />
          <button className="button" type="submit">Submit</button>
        </form>
        {stone.count > 0 && (
          <>
            <h2>Count: {stone.count}</h2>
            <h2>Matrix:</h2>
            {stone.matrix?.map((item, index) => (
              <div className="list" key={index}>
                {item?.map((size) => (
                   <div className="list-item" key={size}>{size}</div>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
      <div className="app-container">
        <h1>Case 3:  The Never ending Palindrome Quest</h1>
        <form className="app-wrapper" onSubmit={handleSubmit(handlePalindrome)}>
          <input
            className="input"
            type="text"
            placeholder="Input kata"
            {...register("palindrome")}
          />
          <button className="button" type="submit">Submit</button>
        </form>
        <h2>Result: {isPalindrome ? 'True' : 'False'}</h2>
      </div>
    </div>
  );
}

export default App;
