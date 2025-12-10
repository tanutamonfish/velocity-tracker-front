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
    label: 'v',
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
    label: 'a',
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
  {
    label: 'F',
    title: 'F analysis',
    plots: [
      {
        title: 'F_x(t)',
        yDataKey: 'F_x',
        yLabel: 'F_x, Н',
        color: '#8c564b'
      },
      {
        title: 'F_y(t)',
        yDataKey: 'F_y',
        yLabel: 'F_y, Н',
        color: '#e377c2'
      },
      {
        title: 'F(t)',
        yDataKey: 'F',
        yLabel: 'F, Н',
        color: '#7f7f7f'
      },
    ],
  },
  {
    label: 'p',
    title: 'p analysis',
    plots: [
      {
        title: 'p_x(t)',
        yDataKey: 'p_x',
        yLabel: 'p_x, кг*м/с',
        color: '#8c564b'
      },
      {
        title: 'p_y(t)',
        yDataKey: 'p_y',
        yLabel: 'p_y, кг*м/с',
        color: '#e377c2'
      },
      {
        title: 'p(t)',
        yDataKey: 'p',
        yLabel: 'p, кг*м/с',
        color: '#7f7f7f'
      },
    ],
  },
  {
    label: 'E',
    title: 'Energy analysis',
    plots: [
      {
        title: 'E_kin(t)',
        yDataKey: 'E_kin',
        yLabel: 'E_kin, Дж',
        color: '#8c564b'
      },
      {
        title: 'E_p(t)',
        yDataKey: 'E_p',
        yLabel: 'E_p, Дж',
        color: '#e377c2'
      },
      {
        title: 'E',
        yDataKey: 'E',
        yLabel: 'E, Дж',
        color: '#7f7f7f'
      },
    ],
  },
];