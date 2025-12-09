import React, { useState } from 'react';
import { CHART_CATEGORIES } from '../../config/chartConfig';
import { useChartDimensions } from '../../hooks/useChartDimensions';
import type { DataResponse } from '../../types/DataResponse';
import { ChartCategoryCompomemt } from '../newcharts/ChartCategory';
import { ChartTabs } from '../newcharts/ChartTabs';

interface Props {
  data: DataResponse;
}

const ChartCollection: React.FC<Props> = ({ data }) => {
  const [mainTabValue, setMainTabValue] = useState(0);
  const plotDimensions = useChartDimensions();

  const handleMainTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMainTabValue(newValue);
  };

  return (
    <>
      <ChartTabs
        value={mainTabValue}
        onChange={handleMainTabChange}
        labels={CHART_CATEGORIES.map(cat => cat.label)}
        ariaLabel="main-plot-tabs"
      />

      {CHART_CATEGORIES.map((category, index) => (
        <ChartCategoryCompomemt
          key={category.label}
          category={category}
          data={data}
          plotDimensions={plotDimensions}
          isActive={mainTabValue === index}
          mainTabIndex={index}
        />
      ))}
    </>
  );
};

export default ChartCollection;