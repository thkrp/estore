import { imageUrl } from '../../common/helpers/path.helper';
import noImage from '../../assets/images/no-image.png';

describe('image path helper', () => {
    it('should return the path to the image', () => {
        const url = '/image.png';
        expect(imageUrl(url)).toBe(url);
    });

    it("should return no-image.png if the image doesn't exist", () => {
        const url = '';
        expect(imageUrl(url)).toBe(noImage);
    });
});
