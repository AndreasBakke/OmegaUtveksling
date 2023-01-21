import React from 'react';
const FilterBar = (***REMOVED***searchValue, courseTypeValue, onSearch, onTypeChange}) => (
    <div>
        <label htmlFor="searchInput">Søk: </label>
        <input  id="searchInput"
                type="text"
                value=***REMOVED***searchValue}
                placeholder="Land, studiested, emnekode"
                onChange=***REMOVED***onSearch} />
        <label htmlFor="typeInput" margin-left="10x">Fagtype: </label>
        <select id='typeInput' value=***REMOVED***courseTypeValue} onChange=***REMOVED***onTypeChange}>
            <option value="all">Alle</option>
            <option value="obligatorisk">Obligatorisk</option>
            <option value="valgfag">Valgfag</option>
            <option value="kemne">K-emne</option>
            <option value="ias">Ingeniøremne annet studieprogram</option>
            <option value="a">Annet</option>
        </select>
    </div>
);
export default FilterBar;