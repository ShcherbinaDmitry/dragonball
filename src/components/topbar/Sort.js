import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from 'classnames';
import { sortGames } from "../../slices/gamesSlice";

const sortValues = [
  { value: "name", text: 'Название'},
  { value: "platform", text:'Платформа' },
  { value: "region", text:'Регион'},
  { value: "updatedAt", text:'Последнее обновление' },
];

const SortCompontent = () => {
  const dispatch = useDispatch();
  const uiState = useSelector((state) => state.games.uiState);

  const generateSortButtons = (buttons) => (buttons.map((btn, i) => {
      const btnClasses = cn('btn', 'col-auto', btn.value === uiState.sort ? 'btn-primary' : 'btn-outline-primary');
  
      return (
        <button
          key={i}
          onClick={() => {
            dispatch(sortGames(btn.value));         
          }}
          className={btnClasses}>
            {btn.text}
        </button>
      );
  }));

  return (
      <div className=" col-auto mb-3">
        {generateSortButtons(sortValues)}
      </div>
  );
};

export default SortCompontent;

