import { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import SelfNumberContext from './store/context/SelfNumber/SelfNumberContext';
import { addDbCollection, localDb, tbName } from './utils/localbase';
import {
  calculateDiagonalSum,
  decryptEmoji,
  generateSelfNumber,
  isCircularPalindrome,
  isSelfNumber,
  findCommonSlot,
  testCase1,
  testCase2
} from './utils/helper';

import './App.css';

function App() {
  const { data: selfNumberData, getSelfNumber } = useContext(SelfNumberContext)
  const [stone, setStone] = useState({ count: 0, matrix: [] });
  const [isPalindrome, setIsPalindrome] = useState(false);
  const [decrypt, setDecrypt] = useState('');
  const [isSelfNumberData, setIsSelfNumber] = useState(false);
  const [timeSlot, setTimeSlot] = useState({ testCase1: [], testCase2: [] })

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

  const getPromiseTimeSlot = useCallback((meetings) => {
    return new Promise((resolve) => {
      const data = findCommonSlot(meetings);
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
    };

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

  useEffect(() => {
    const doGetTimeSlot = async () => {
      const p1 = getPromiseTimeSlot(testCase1);
      const p2 = getPromiseTimeSlot(testCase2);

      const [timeSlot1, timeSlot2] = await Promise.all([p1, p2]);

      setTimeSlot({ testCase1: timeSlot1, testCase2: timeSlot2  });
    }
    doGetTimeSlot();
  }, [getPromiseTimeSlot]);

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
        <h1>Case 2: The Time Wizard's Gambit</h1>
        <h2>1. Test Case 1: [[9, 12], [14, 16]], [[10, 12], [15, 17]], [[11, 13], [16, 18]]</h2>
        <h2>
          Check Result:{' '}
          {timeSlot.testCase1?.length === 0 && 'No common slot available'}
        </h2>
        <div className="list">
          {timeSlot.testCase1?.length > 0 &&
            timeSlot.testCase1?.slice(0, 2)?.map((item) => (
              <div className="list-item" key={item}>{item}</div>
            ))}
          {timeSlot.testCase1?.length === 0 && (
            <h2>No common slot available</h2>
          )}
        </div>
        <h2>2. Test Case 2: [[8, 10], [12, 14], [9, 11]]</h2>
        <h2>
          Check Result:{' '}
          {timeSlot.testCase2?.length === 0 && 'No common slot available'}
        </h2>
        <div className="list">
          {timeSlot.testCase2?.length > 0 &&
            timeSlot.testCase2?.slice(0, 2)?.map((item) => (
                <div className="list-item" key={item}>{item}</div>
            ))}
        </div>
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
