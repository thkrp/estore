import React, { AriaRole, FC } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { sanitizeUrl } from '@braintree/sanitize-url';

type Props = {
    to: string;
    children?: React.ReactNode;
    className?: string;
    title?: string;
    role?: AriaRole;
};
/**
 * The "Link" component from react-router-dom with a sanitized url.
 */
const Link: FC<Props> = ({ to = '', children, className, title, role }) => {
    return (
        <ReactLink to={sanitizeUrl(to)} className={className} title={title} role={role}>
            {children}
        </ReactLink>
    );
};

export default Link;
