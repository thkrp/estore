import { StateElements } from '../../../common/enums/state.elements';
import { ProductsOfSection } from './home.state';

export type TabContent = Partial<{ [key in StateElements]: ProductsOfSection }>;
