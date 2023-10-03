import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { SearchFormButtonStyled, SearchFromInputStyled, SearchFromStyled } from './index.styles';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const onSearch = (e: React.SyntheticEvent) => {
        e.preventDefault();
    };
    return (
        <SearchFromStyled onSubmit={(e: React.SyntheticEvent) => onSearch(e)}>
            <FormattedMessage id="search">
                {([placeholder]) => (
                    <SearchFromInputStyled
                        value={searchValue}
                        name="search"
                        placeholder={placeholder as string}
                        onChange={(v: string) => setSearchValue(v)}
                    />
                )}
            </FormattedMessage>
            <SearchFormButtonStyled type="submit">
                <SearchIcon />
            </SearchFormButtonStyled>
        </SearchFromStyled>
    );
};

export default Search;
