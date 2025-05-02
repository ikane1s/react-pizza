import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { list } from '../components/Sort';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

import Categories, { categories } from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = ({ searchValue }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sortType, currentPage } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.pizza);
  const [orderType, setOrderType] = React.useState('asc');

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };

  // Если изменили параметры и уже был первый рендер, то обновляем URL
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortProperty: sortType,
        order: orderType,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, orderType, currentPage, navigate]);

  // Парсим параметры при первом рендере
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  // Запрашиваем пиццы при изменении параметров
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      dispatch(
        fetchPizzas({
          currentPage,
          categoryId,
          sortType,
          orderType,
        }),
      );
    }

    isSearch.current = false;
  }, [categoryId, sortType, orderType, currentPage, dispatch]);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const filteredPizzas = items.filter((obj) =>
    obj.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const pizzas = filteredPizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort setOrderType={setOrderType} orderType={orderType} />
      </div>
      <h2 className="content__title">{categories[categoryId]}</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>Не удалось загрузить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
