import { toJalaali } from 'jalaali-js';

export function convertToJalaali(dateString: string): string {
  const date = new Date(dateString);
  const { gy, gm, gd } = {
    gy: date.getFullYear(),
    gm: date.getMonth() + 1, // Months are 0-based in JS
    gd: date.getDate()
  };

  const { jy, jm, jd } = toJalaali(gy, gm, gd);
  return `${jy}/${jm.toString().padStart(2, '0')}/${jd.toString().padStart(2, '0')}`;
}
