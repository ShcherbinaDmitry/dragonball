import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import Multiselect from 'multiselect-react-dropdown';

import { filterGamesByPlatform, filterGamesByRegion, filterByAvailable } from '../../slices/gamesSlice';

const regions = [
  { name: 'Европа', value: 'Europe' },
  { name: 'CША', value: 'USA' },
  { name: 'Япония', value: 'Japan' },
  { name: 'Другой регион', value: 'Other' },
];

const FilterCompontent = (props) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.games.uiState.loading);

  const platforms = useSelector((state) => {
    if (state.games.games.length === 0) return null;

    const platforms = _.sortedUniqBy(state.games.games, 'platform').map((game) => ({ name: game.platform, value: game.platform}));
    
    return platforms;
  });

  const handleRegionSelect = (selected) => {
    dispatch(filterGamesByRegion(selected.map((item) => item.value)));
  };

  const handlePlatformSelect = (selected) => {
    dispatch(filterGamesByPlatform(selected.map((item) => item.value)));
  };

  const handleAvailableCheck = (e) => {
    dispatch(filterByAvailable());
  };

  if (isLoading) return null;

  return (
    <div className="mb-3">
      <div className="form-check form-switch" >
        <input onChange={handleAvailableCheck} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">В наличии</label>
      </div>
      <div className="col-6">
        <Multiselect
          options={regions}
          onSelect={handleRegionSelect}
          onRemove={handleRegionSelect}
          placeholder="Регионы"
          hidePlaceholder={true}
          displayValue="name"
          name="filterRegions"
          id="filterRegions"
        />
      </div>
      <div className="col-6">
        <Multiselect 
          options={platforms}
          onSelect={handlePlatformSelect}
          onRemove={handlePlatformSelect}
          placeholder="Платформы"
          hidePlaceholder={true}
          displayValue="name"
          name="filterPlatforms"
          id="filterPlatforms"
        />
      </div>
    </div>
 
  );
};

export default FilterCompontent;