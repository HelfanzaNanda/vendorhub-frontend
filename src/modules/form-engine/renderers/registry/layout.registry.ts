import { FormLayout } from '../../enums';
import {
  CardLayout,
  GridLayout,
  AccordionLayout,
  TabsLayout,
  TableLayout,
  TermsLayout,
  DefaultLayout
} from '../layout/layouts';
import type { LayoutRegistry } from './layout-registry.interface';

export const layoutRegistry = {
  [FormLayout.CARD]: CardLayout,
  [FormLayout.GRID]: GridLayout,
  [FormLayout.ACCORDION]: AccordionLayout,
  [FormLayout.TABS]: TabsLayout,
  [FormLayout.TABLE]: TableLayout,
  [FormLayout.TERMS]: TermsLayout,
  [FormLayout.DEFAULT]: DefaultLayout,
} as unknown as LayoutRegistry;
