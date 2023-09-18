import './App.css';
import Courses from './components/Courses';

function App() {
  return (
    <>
      <div style={{
        width: '100%',
        boxSizing: 'border-box',
        padding: '0 calc(1rem + 10%)',
      }}>
        <Courses />
      </div>
    </>
  );
}

export default App;
