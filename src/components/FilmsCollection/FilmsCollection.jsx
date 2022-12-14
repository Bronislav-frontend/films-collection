import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filmsOperations } from '../../redux';
import { selectors } from '../../redux';
import SearchInput from '../SearchInput/SearchInput';
import FilmDetailsModal from '../FilmDetailsModal/FilmDetailsModal';
import filmImage from '../../assets/film.jpg';
import s from './FilmsCollection.module.css';

const FilmsCollection = () => {
  const [sortBy, setSortBy] = useState('year');
  const [isModalShown, setIsModalShown] = useState(false);
  const dispatch = useDispatch();
  const films = useSelector(selectors.getFilms);
  const filmDetails = useSelector(selectors.getFilmDetails);

  useEffect(() => {
    dispatch(filmsOperations.fetchFilmsList(`sort=${sortBy}`));
  }, [dispatch, sortBy]);

  const handleClick = id => {
    setIsModalShown(true);
    dispatch(filmsOperations.showFilm(id));
  };

  return (
    <section className={s.section}>
      <h2 className={s.title}>Films collection</h2>
      <SearchInput />
      {!films && (
        <p>
          You don`t have any film in your collection yet, but you can add it by
          filling the form or by importing a .txt file
        </p>
      )}
      <div className={s.sort}>
        <p className={s.text}>Sort by</p>
        <select
          name="sortBy"
          onChange={e => setSortBy(e.target.value)}
          className={s.select}
        >
          <option value="year">Year</option>
          <option value="title">Title</option>
        </select>
      </div>
      <ul className={s.list}>
        {films &&
          films.map((film, index) => (
            <li
              key={index}
              className={s.item}
              onClick={() => handleClick(film.id)}
            >
              <img
                src={filmImage}
                alt="default poster"
                width="140px"
                height="100px"
              ></img>
              <h2 className={s.film_title}>{film.title}</h2>
              <p>Year: {film.year}</p>
              <p>Format: {film.format}</p>
            </li>
          ))}
      </ul>
      {isModalShown && filmDetails && (
        <FilmDetailsModal
          filmInfo={filmDetails}
          onClose={() => setIsModalShown(false)}
        />
      )}
    </section>
  );
};

export default FilmsCollection;
