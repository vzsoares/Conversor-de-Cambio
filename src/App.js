import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <div className='title-container'>
        <h1>conversor de cambio</h1>
      </div>
      <div className='conversor-container'>
        <div className='moedas'>
          <select name='' id=''>
            <option value='+'>dolar</option>
            <option value='-'>real</option>
            <option value='*'>euro</option>
            <option value='/'>yen</option>
          </select>
          <select name='' id=''>
            <option value='-'>real</option>
            <option value='+'>dolar</option>
            <option value='*'>euro</option>
            <option value='/'>yen</option>
          </select>
        </div>
        <div className='results'>
          <input type='text' value={"$1,00"} />
          <input type='text' value={"$7,00"} />
        </div>
      </div>
    </div>
  );
}

export default App;
