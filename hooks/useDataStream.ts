import { useMemo } from 'react';
import { useData } from '../components/providers/DataProvider';

export function useDataStats() {
  const { data, globalCategoryCount } = useData();

  const windowStats = useMemo(() => {
    if (!data.length) {
      return {
        last: null,
        byCategoryWindow: new Map<string, number>(),
      };
    }

    const byCategoryWindow = new Map<string, number>();
    for (const p of data) {
      byCategoryWindow.set(p.category, (byCategoryWindow.get(p.category) || 0) + 1);
    }

    return {
      last: data[data.length - 1],
      byCategoryWindow,
    };
  }, [data]);

  return {
    last: windowStats.last,
    byCategoryWindow: windowStats.byCategoryWindow,
    byCategoryGlobal: globalCategoryCount,
  };
}
