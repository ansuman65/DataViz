import { useMemo } from 'react';
import { useData } from '../components/providers/DataProvider';

export function useDataStats() {
  const { data, globalCategoryCount } = useData();

  const windowStats = useMemo(() => {
    if (!data.length) return { last: null, byCategory: new Map<string, number>() };
    const map = new Map<string, number>();
    for (const p of data) {
      map.set(p.category, (map.get(p.category) || 0) + 1);
    }
    return { last: data[data.length - 1], byCategory: map };
  }, [data]);

  return {
    last: windowStats.last,
    byCategoryWindow: windowStats.byCategory,
    byCategoryGlobal: globalCategoryCount,
  };
}
