import {useCallback, useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import {
  calculateDiagonalSum,
  isCircularPalindrome,
  decryptEmoji,
  generateSelfNumber,
  isSelfNumber
} from './utils/helper';

import './App.css';

function App() {
  const [stone, setStone] = useState({ count: 0, matrix: [] });
  const [isPalindrome, setIsPalindrome] = useState(false);
  const [decrypt, setDecrypt] = useState('');
  const [selfNumber, setSelfNumber] = useState([]);
  const [isSelfNumberData, setIsSelfNumber] = useState(false);

  const { register, handleSubmit } = useForm();

  const handleCalculateMatrix = useCallback((data) => {
    const results = calculateDiagonalSum(data.number);
    setStone(results)
  }, []);

  const handlePalindrome = useCallback((data) => {
    const results = isCircularPalindrome(data.palindrome);
    setIsPalindrome(results)
  }, []);

  const handleDecryptEmoji = useCallback((data) => {
    const results = decryptEmoji(data.decrypt);
    setDecrypt(results);
  }, []);

  const handleCalculateSelfNumber = useCallback((data) => {
    const res = isSelfNumber(data.selfNumber, selfNumber);
    setIsSelfNumber(res);
  }, [selfNumber]);

  useEffect(() => {
    const data = generateSelfNumber();
    setSelfNumber(data);
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
        <h2>Check Result: {isPalindrome ? 'True' : 'False'}</h2>
      </div>
      <div className="app-container">
        <h1>Case 4: Unveiling the Secrets of Self-Numbers</h1>
        <form className="app-wrapper" onSubmit={handleSubmit(handleCalculateSelfNumber)}>
          <input
            className="input"
            type="number"
            placeholder="Masukan angka"
            {...register("selfNumber")}
          />
          <button className="button" type="submit">Submit</button>
        </form>
        <h2>Check Result: {isSelfNumberData ? 'The number is self number' : 'The number is not self number'}</h2>
        <h2>Self Number Categories 1 - 4999:</h2>
        <div className="list">
          {selfNumber?.map((number) => (
            <div className="list-item" key={number}>{number}</div>
          ))}
        </div>
      </div>
      <div className="app-container">
        <h1>Case 5:  Decrypting the Emoji Code</h1>
        <form className="app-wrapper" onSubmit={handleSubmit(handleDecryptEmoji)}>
          <input
            className="input"
            type="text"
            placeholder="Input kata dan emoji"
            {...register("decrypt")}
          />
          <button className="button" type="submit">Submit</button>
        </form>
        <h2>Check Result: {decrypt}</h2>
      </div>
    </div>
  );
}

export default App;
