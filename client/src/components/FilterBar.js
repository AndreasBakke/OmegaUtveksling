import React from 'react';
const FilterBar = ({searchValue, courseTypeValue, courseSemesterValue, onSearch, onTypeChange, onSemesterChange}) => (
    <div>
        <label htmlFor="searchInput">Søk: </label>
        <input  id="searchInput"
                type="text"
                value={searchValue}
                placeholder="Land, studiested, emnekode"
                onChange={onSearch} />
        <label htmlFor="typeInput" margin-left="10px">Fagtype: </label>
        <select id='typeInput' value={courseTypeValue} onChange={onTypeChange}>
            <option value="all">Alle</option>
            <option value="obligatorisk">Obligatorisk</option>
            <option value="valgfag">Valgfag</option>
            <option value="kemne">K-emne</option>
            <option value="ias">Ingeniøremne annet studieprogram</option>
            <option value="a">Annet</option>
        </select>
        <label htmlFor='semesterInput' margin-left="10px">Semester: </label>
        <select id='semesterInput' value={courseSemesterValue} onChange={onSemesterChange}>
            <option value="begge">Begge</option>
            <option value="høst">Høst</option>
            <option value="vår">Vår</option>
        </select>
    </div>
);
export default FilterBar;