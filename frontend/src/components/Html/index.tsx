import React from 'react';
import DOMPurify from 'dompurify';

type Props = {
    dirty: string;
};
const CleanHtml = ({ dirty }: Props) => {
    const clean = DOMPurify.sanitize(dirty);
    // eslint-disable-next-line react/no-danger
    return <div dangerouslySetInnerHTML={{ __html: clean }} />;
};

export default CleanHtml;
