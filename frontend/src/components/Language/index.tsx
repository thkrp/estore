import React, { useState } from 'react';
import { Localization } from 'app-shared';
import { localStorageService } from '../../services/local-storage';
import { ListItemStyled, ListStyled } from './index.styles';
import { reload } from '../../common/helpers/reload.helper';

const Language = () => {
    const [currentLocalization, setCurrentLocalization] = useState<Localization>(
        localStorageService.getLocalization() as Localization
    );

    const onLocalizationChange = (value: Localization) => {
        if (value !== currentLocalization) {
            setCurrentLocalization(value);
            localStorageService.setLocalization(value);
            reload();
        }
    };

    return (
        <ListStyled>
            {Object.entries(Localization).map(([key, value]) => (
                <ListItemStyled
                    key={key}
                    $active={value === currentLocalization}
                    onClick={() => onLocalizationChange(value)}
                    className={value === currentLocalization ? 'active' : ''}
                >
                    {value}
                </ListItemStyled>
            ))}
        </ListStyled>
    );
};

export default Language;
