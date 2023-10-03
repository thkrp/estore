import React, { FC } from 'react';
import { sanitizeUrl } from '@braintree/sanitize-url';

type Props = {
    href: string;
    title: string;
    className?: string;
};

const ExternalLink: FC<Props> = ({ href, title, className }) => {
    return (
        <a href={sanitizeUrl(href)} target="_blank" rel="noreferrer noopener" className={className}>
            {title}
        </a>
    );
};

export default ExternalLink;
