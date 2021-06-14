import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Basket from "./components/Basket";
import data from "./data";
import { useState } from "react";

function App() {
  const { products } = data;
  const [cartItems, setCartItems] = useState([]);
  const onAdd = (product) => {
    const exist = cartItems.find((item) => item.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...exist, qty: exist.qty + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1  }]);
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((item) => item.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id))
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...exist, qty: exist.qty - 1 } : item
        )
      );
    }
  };

  const countCartItems = cartItems.reduce((a, b) => a + b.qty,0)

  return (
    <div className="App">
      <Header countCartItems={countCartItems}></Header>
      <div className="row">
        <Main onAdd={onAdd} products={products}></Main>
        <Basket onAdd={onAdd} onRemove={onRemove} cartItems={cartItems}></Basket>
      </div>
    </div>
  );
}

export default App;
