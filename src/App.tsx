import './App.css';
import Courses from './components/Courses';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div className="main" style={{
        width: '100%',
        boxSizing: 'border-box',
        padding: '0 calc(1rem + 7%)',
      }}>
        <Courses />
        <Footer/>
      </div>
    </>
  );
}

export default App;
