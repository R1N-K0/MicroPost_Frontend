import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import SignIn from './pages/SignIn';
import { UserProvider } from './providers/UserProvider';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/" element = {<SignIn/>}></Route>
          <Route path="/main" element={<Main/>}></Route>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
