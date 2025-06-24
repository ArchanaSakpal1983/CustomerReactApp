import './App.css'
import AddCustomer from './components/AddCustomer'
import CustomerList from './components/CustomerList'
function App() {
 
  return (
      <div>
        <h1>Customer Management App</h1>
        <AddCustomer/>
        <CustomerList/>
      </div>
  )
}

export default App
