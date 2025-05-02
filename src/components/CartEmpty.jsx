import React from 'react';
import { Link } from 'react-router-dom';
import cartEmptyImg from '../assets/img/empty-cart.png';

const CartEmpty = () => {
  return (
    <>
      <div class="container container--cart">
        <div class="cart cart--empty">
          <h2>
            Корзина пустая <icon>😕</icon>
          </h2>
          <p>
            Вероятней всего, вы не заказывали ещё пиццу.
            <br />
            Для того, чтобы заказать пиццу, перейди на главную страницу.
          </p>
          <img src={cartEmptyImg} />
          <Link to="/" class="button button--black">
            <span>Вернуться назад</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartEmpty;
