import React, { FC } from 'react';
import { sanitizeUrl } from '@braintree/sanitize-url';
import { ReactComponent as EmailIcon } from '../../../assets/icons/mail.svg';
import { ReactComponent as PhoneIcon } from '../../../assets/icons/old-phone.svg';
import { ContactIconStyled, ContactLinkStyled } from './index.styles';

type Props = {
    value?: string;
    className?: string;
    hiddenIcon?: boolean;
    type: 'phone' | 'email';
};

const Icons = {
    phone: PhoneIcon,
    email: EmailIcon
};

const ContactLink: FC<Props> = ({ value = '', className, hiddenIcon = false, type }) => {
    const format = {
        phone: (tel: string) => `tel:${sanitizeUrl(tel.replace(/[^+\d]/g, ''))}`,
        email: (email: string) => `mailto:${sanitizeUrl(email)}`
    };

    const IconComponent = Icons[type];
    const formatContact = format[type];

    return (
        <ContactLinkStyled href={formatContact(value)} className={className}>
            {!hiddenIcon && (
                <ContactIconStyled>
                    <IconComponent />
                </ContactIconStyled>
            )}
            {value}
        </ContactLinkStyled>
    );
};

export default ContactLink;
