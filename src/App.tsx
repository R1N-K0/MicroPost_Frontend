import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import SignIn from './pages/SignIn';
import { UserProvider } from './providers/UserProvider';
import SignUp from './components/SignUp';
import UserPage from './pages/UserPage';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/" element = {<SignIn/>}></Route>
          <Route path="/signUp" element={<SignUp/>}></Route>
          <Route path="/main" element={<Main/>}></Route>
          <Route path="/main/:id" element={<UserPage/>}></Route>
         
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
