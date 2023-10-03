import { transformToKey } from '../../common/helpers/key.helper';

describe('transform to a key helper', () => {
    it('should return a string key from index and str', () => {
        const index = 1;
        const str = 'any string';
        expect(transformToKey(index, str)).toBe(`${index}_${str}`);
    });

    it('should return a string key from index without str', () => {
        const index = 1;
        const str = undefined;
        expect(transformToKey(index, str)).toBe(`${index}_`);
    });
});
