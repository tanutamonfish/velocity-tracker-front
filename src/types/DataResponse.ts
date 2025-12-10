export interface DataResponse {
  time: number[];

  x: number[];
  y: number[];
  v_x: number[];
  v_y: number[];
  v: number[];
  a_x: number[];
  a_y: number[];
  a: number[];

  p_x: number[];
  p_y: number[];
  p: number[];
  F_x: number[];
  F_y: number[];
  F: number[];
  Ek: number[];
  Ep: number[];

  err_x: number[];
  err_y: number[];
  err_v: number[];
}