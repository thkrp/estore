import { useLocation } from 'react-router-dom';

export const useSection = () => {
    const location = useLocation();
    const sections = location.pathname.split('/');
    return sections[sections.length - 1];
};
