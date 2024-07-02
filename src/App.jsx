
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Dashboard from './components/Dashboard/Dashboard'
import Contact from './components/Contact/Contact'
import Layout from './Layout'
import StaffDetail from './components/Home/StaffDetail'
import AddStaff from './components/Dashboard/AddStaff'
import EditStaff from './components/Dashboard/EditStaff'
import TablePaginationActions from './components/Dashboard/TablePaginationActions'
import Login from './components/Auth/Login'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/table-MUi' element={<TablePaginationActions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/staff/:id" element={<StaffDetail />} />
          <Route path="/add-staff" element={<AddStaff />} />
          <Route path='/edit-staff/:id' element={<EditStaff />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default App
