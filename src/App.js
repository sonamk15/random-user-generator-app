import './App.css';
import Users from "./components/Users";
import { Provider } from "react-redux";
import store from "./store/index";

function App() {
  return (
    <Provider store={store()}>
      <div className='container-fluid'>
      <Users/>
      </div>
    </Provider> 
  );
}

export default App;
