import {useCallback, useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  calculateDiagonalSum,
  decryptEmoji,
  generateSelfNumber,
  isCircularPalindrome,
  isSelfNumber
} from './utils/helper';
import SelfNumberContext from './store/context/SelfNumber/SelfNumberContext';
import {addDbCollection, localDb, tbName} from "./utils/localbase";

import './App.css';

function App() {
  const { data: selfNumberData, getSelfNumber } = useContext(SelfNumberContext)
  const [stone, setStone] = useState({ count: 0, matrix: [] });
  const [isPalindrome, setIsPalindrome] = useState(false);
  const [decrypt, setDecrypt] = useState('');
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
    const res = isSelfNumber(data.selfNumber, selfNumberData);
    setIsSelfNumber(res);
  }, [selfNumberData]);

  const getPromiseSelfNumber = useCallback((from, to) => {
    return new Promise((resolve) => {
      const data = generateSelfNumber(from, to);
      resolve(data);
    });
  }, []);

  useEffect(() => {
    const doGetSelfNumber = async () => {
      const p1 = getPromiseSelfNumber(1, 1000);
      const p2 = getPromiseSelfNumber(1001, 2000);
      const p3 = getPromiseSelfNumber(2001, 3000);
      const p4 = getPromiseSelfNumber(3001, 4000);
      const p5 = getPromiseSelfNumber(4001, 5000);

      const [
        selfNumber1,
        selfNumber2,
        selfNumber3,
        selfNumber4,
        selfNumber5
      ] = await Promise.all([p1, p2, p3, p4, p5]);

      return [...selfNumber1, ...selfNumber2, ...selfNumber3, ...selfNumber4, ...selfNumber5];
    }

    localDb.collection(tbName).get().then((collections) => {
      if (collections.length === 0) {
        const dataList = doGetSelfNumber();
        dataList.then((res) => {
          addDbCollection(tbName, { data: res });
          getSelfNumber(res);
        })
      } else {
        getSelfNumber(collections[0]['data']);
      }
    });
  }, [getPromiseSelfNumber, getSelfNumber]);

  return (
    <div className="app">
      <div className="app-container">
        <h1>Case 1: Unearthing the Philosopher's Stone</h1>
        <form className="app-wrapper" onSubmit={handleSubmit(handleCalculateMatrix)}>
          <input
            className="input"
            type="number"
            placeholder="Input N"
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
            placeholder="Input word"
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
            placeholder="Input number"
            {...register("selfNumber")}
          />
          <button className="button" type="submit">Submit</button>
        </form>
        <h2>Check Result: {isSelfNumberData ? 'The number is self number' : 'The number is not self number'}</h2>
        <h2>Self Number Categories 1 - 4999:</h2>
        <div className="list">
          {selfNumberData?.map((number) => (
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
            placeholder="Input word and emoji"
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
