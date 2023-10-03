import React, { FC } from 'react';
import { WrapperStyled, ContactListStyled, PhoneLinkStyled, EmailLinkStyled } from './index.styles';
import { transformToKey } from '../../../common/helpers/key.helper';
import Search from '../../Search';

type Props = {
    phones?: string[];
    emails?: string[];
};

const Actions: FC<Props> = ({ phones, emails }) => {
    return (
        <WrapperStyled>
            {!!phones?.length && (
                <ContactListStyled>
                    {phones.map((phone, i) => (
                        <PhoneLinkStyled key={transformToKey(i, phone)} value={phone} type="phone" />
                    ))}
                </ContactListStyled>
            )}
            <Search />
            {!!emails?.length && (
                <ContactListStyled>
                    {emails.map((email, i) => (
                        <EmailLinkStyled key={transformToKey(i, email)} value={email} type="email" />
                    ))}
                </ContactListStyled>
            )}
        </WrapperStyled>
    );
};

export default Actions;
