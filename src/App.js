import { useCallback, useState } from 'react';
import { calculateDiagonalSum } from './utils/helper';
import './App.css';

function App() {
  const [number, setNumber] = useState(0);
  const [stone, setStone] = useState({ count: 0, matrix: [] });

  const handleChangeNumber = useCallback((event) => {
    const { value } = event.target;
    setNumber(value);
  }, [])

  const handleSubmit = useCallback(() => {
    const results = calculateDiagonalSum(number);
    setStone(results)
  }, [number]);

  return (
    <div className="app">
      <h1>Case 1: Unearthing the Philosopher's Stone</h1>
      <div className="app-wrapper">
        <input className="input" type="number" placeholder="Masukan jumlah N" onChange={handleChangeNumber} />
        <button className="button" onClick={handleSubmit}>Submit</button>
      </div>
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
  );
}

export default App;
