import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AddEmployee from './components/AddEmployee';
import ViewAllEmployee from './components/ViewAllEmployee';
import ViewOneEmployee from './components/ViewOneEmployee';
import EditEmployee from './components/EditEmployee';
import Header from './components/Header';

function App() {
  return (
    <div>
      <Router>

        <Header />
        <Routes>
          <Route exact path='/' element={<AddEmployee />} />
          <Route exact path='/viewAllEmployee' element={<ViewAllEmployee />} />
          <Route exact path='/viewEmployee/:id' element={<ViewOneEmployee />} />
          <Route exact path='/editEmployee/:id' element={<EditEmployee />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
