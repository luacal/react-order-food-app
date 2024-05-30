import {useRef} from 'react'
import {createPortal} from 'react-dom'
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import Cart from './components/Cart.jsx'

function App() {
  const dialog = useRef();
  
  function handleOpenCart () {
    console.log('handleOpenCart')
    dialog.current.open();
  }

  return (
    <main>
      {createPortal(<Cart ref={dialog} />, document.getElementById('modal'))}
      <Header onCartOpen={handleOpenCart} />
      <Meals />
    </main>
  );
}

export default App;
