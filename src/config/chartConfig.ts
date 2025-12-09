import type { ChartCategory } from '../types/chartTypes';

export const CHART_CATEGORIES: ChartCategory[] = [
  {
    label: 'Position',
    title: 'Position analysis',
    plots: [
      {
        title: 'x(t)',
        yDataKey: 'x',
        yLabel: 'x Position, m',
        color: '#1f77b4'
      },
      {
        title: 'y(t)',
        yDataKey: 'y',
        yLabel: 'y Position, m',
        color: '#ff7f0e'
      },
    ],
  },
  {
    label: 'Speed',
    title: 'Speed analysis',
    plots: [
      {
        title: 'v_x(t)',
        yDataKey: 'v_x',
        yLabel: 'Velocity X, m/s',
        color: '#2ca02c'
      },
      {
        title: 'v_y(t)',
        yDataKey: 'v_y',
        yLabel: 'Velocity Y, m/s',
        color: '#d62728'
      },
      {
        title: 'v(t)',
        yDataKey: 'v',
        yLabel: 'Velocity magnitude, m/s',
        color: '#9467bd'
      },
    ],
  },
  {
    label: 'Acceleration',
    title: 'Acceleration analysis',
    plots: [
      {
        title: 'a_x(t)',
        yDataKey: 'a_x',
        yLabel: 'Acceleration X, m/s^2',
        color: '#8c564b'
      },
      {
        title: 'a_y(t)',
        yDataKey: 'a_y',
        yLabel: 'Acceleration Y, m/s^2',
        color: '#e377c2'
      },
      {
        title: 'a(t)',
        yDataKey: 'a',
        yLabel: 'Acceleration magnitude, m/s^2',
        color: '#7f7f7f'
      },
    ],
  },
];