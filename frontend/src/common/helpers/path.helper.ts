import { sanitizeUrl } from '@braintree/sanitize-url';
import noImage from '../../assets/images/no-image.png';

export const imageUrl = (url?: string | null): string => {
    if (!url) {
        return noImage;
    }
    return sanitizeUrl(url);
};
