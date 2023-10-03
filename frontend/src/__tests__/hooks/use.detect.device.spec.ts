import useDeviceDetect from '../../common/hooks/use.device.detect';

const setUserAgent = (userAgent: string) => {
    Object.defineProperty(navigator, 'userAgent', {
        value: userAgent,
        writable: true
    });
};

describe('useDeviceDetect', () => {
    it('Should return isMobile false', () => {
        const desktop = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0';
        setUserAgent(desktop);
        const isMobile = useDeviceDetect();
        expect(isMobile).toBeFalsy();
    });

    it('Should return isMobile true', () => {
        const android =
            // eslint-disable-next-line max-len
            'Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36';
        setUserAgent(android);
        const isAndroid = useDeviceDetect();
        expect(isAndroid).toBeTruthy();

        const iPhone =
            // eslint-disable-next-line max-len
            'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1';
        setUserAgent(iPhone);
        const isIPhone = useDeviceDetect();
        expect(isIPhone).toBeTruthy();
    });
});
