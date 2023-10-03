import { stringHash } from '../../../src/utils/encription.helper';

describe('encryption helper', () => {
    it('should return hash string', () => {
        const hash = stringHash('any string');
        expect(hash).toBe('97eac518be340bd26b7593cc247fbf415272c295');
    });
});
