import { useContext } from 'react';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';

const MealItem = ({ id, name, description, price }) => {
  const prices = `$${price.toFixed(2)}`;
  const cartCtx = useContext(CartContext)
  const addToCartHandler = amount => {
    cartCtx.addItem({
      id,
      name,
      amount,
      price
    });
  }
  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{prices}</div>
      </div>
          <div>
              <MealItemForm id={id}  onAddToCart={addToCartHandler}/>
      </div>
    </li>
  );
};

export default MealItem;
