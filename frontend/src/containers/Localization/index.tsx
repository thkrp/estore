import React, { FC, useEffect, useRef, useState } from 'react';
import { Localization, Locale, LocaleMessages } from 'app-shared';
import { IntlProvider } from 'react-intl';
import { localStorageService } from '../../services/local.storage.service';
import { appService } from '../../services/app.service';

type Props = {
    children: React.ReactNode;
};

type LocaleType = {
    messages?: {
        data?: LocaleMessages;
        hash: string;
    };
};

const localeKey = 'locale';

const LocalizationProvider: FC<Props> = ({ children }) => {
    const localization = localStorageService.getLocalization() as Localization;
    const localeData = localStorageService.getObject(localeKey) || {};
    const isCanceled = useRef(false);
    const [locale, setLocale] = useState<LocaleType>({
        messages: localeData[localization]
    });

    const initLocale = async () => {
        const { data: hash } = await appService.getTranslationHash(localization);

        if (hash && locale?.messages?.hash !== hash) {
            const { data } = await appService.getTranslation(localization);

            const newLocaleData = {
                data,
                hash
            };
            setLocale({ messages: newLocaleData });
            localStorageService.setObject(localeKey, { ...localeData, [localization]: newLocaleData });
        }
    };

    useEffect(() => {
        if (!isCanceled.current) {
            isCanceled.current = true;
            initLocale().catch(e => console.error(e));
        }
    }, []);

    return (
        <IntlProvider key={localization} locale={Locale[localization]} messages={locale?.messages?.data}>
            {children}
        </IntlProvider>
    );
};

export default LocalizationProvider;
