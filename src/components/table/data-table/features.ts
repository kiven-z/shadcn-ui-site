import { rowSelectionFeature, tableFeatures } from '@tanstack/react-table';

export const dataTableFeatures = tableFeatures({
  rowSelectionFeature,
});

export type DataTableFeatures = typeof dataTableFeatures;
