import { saveAs } from 'file-saver';

export { saveAs };

export const getUnique = (arr: Array<any>): Array<any> => [...new Set(arr)];

export const stringPad = {
  pad: (val: string, len?: number): string => {
    val = String(val);
    len ??= 2;
    while (val.length < len) val = '0' + val;
    return val;
  },
  padEmpty: (num: string, size: number): string => {
    const s = '   ' + num;
    return s.substr(s.length - size);
  },
  pad0: (str: string, max: number): string => (str.length < max ? stringPad.pad0('0' + str, max) : str),
};

export const saveVariable = (variable: any, filename?: string): void => {
  try {
    filename ??= 'variable.txt';
    variable = JSON.stringify(variable);
    const blob = new Blob([variable], { type: 'text/plain;charset=utf-8' });
    if (!saveAs) throw new Error('saveAs is unavailable!');
    saveAs(blob, filename);
  } catch (e) {
    // Intentionally Left Blank
  }
};

export const saveCsv = (items: Array<any>, name?: string): void => {
  try {
    const replacer: any = (value: never) => (value === null ? '' : value); // specify how you want to handle null values here
    const header = Object.keys(items[0]);
    let csv: string | string[] = items.map((row: any) => header.map((fieldName: string) => JSON.stringify(replacer(row[fieldName]))).join(','));
    csv.unshift(header.join(','));
    csv = csv.join('\r\n');

    const blob = new Blob([csv], { type: 'text/plain;charset=utf-8' });
    if (!saveAs) throw new Error('saveAs is unavailable!');
    name ??= 'data';
    saveAs(blob, `${name}.csv`);
  } catch (error) {
    // Intentionally Left Blank
  }
};

type rgbaType = [string | number, string | number, string | number, string | number];
export const parseRgba = (str: string): [number, number, number, number] => {
  // eslint-disable-next-line no-useless-escape
  let [r, g, b, a]: rgbaType = <rgbaType>str.match(/[\d\.]+/gu);
  r = parseInt(<string>r) / 255;
  g = parseInt(<string>g) / 255;
  b = parseInt(<string>b) / 255;
  a = parseFloat(<string>a);
  if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
    return [1, 1, 1, 1];
  } else {
    return [r, g, b, a];
  }
};

export const hex2RgbA = (hex: string): rgbaType => {
  // eslint-disable-next-line prefer-named-capture-group
  if (/^#([A-Fa-f0-9]{3}){1,2}$/u.test(hex)) {
    let c: string[] | string = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    const r = ((parseInt(c) >> 16) & 255) / 255;
    const g = ((parseInt(c) >> 8) & 255) / 255;
    const b = (parseInt(c) & 255) / 255;
    return [r, g, b, 1];
  } else {
    return [1, 1, 1, 1];
  }
};

export const rgbCss = (values: [number, number, number, number]): string => `rgba(${values[0] * 255},${values[1] * 255},${values[2] * 255},${values[3]})`;

/**
 *
 * @param {string} str Input string
 * @param {number} num Maximum length of the string
 * @returns {string} Trunicated string
 */
export const truncateString = (str: string, num: number): string => {
  if (typeof str == 'undefined') return 'Unknown';

  // If the length of str is less than or equal to num
  // just return str--don't truncate it.
  if (str.length <= num) {
    return str;
  }
  // Return str truncated with '...' concatenated to the end of str.
  return str.slice(0, num) + '...';
};

export const slideOutLeft = (el: HTMLElement, duration: number, callback?: () => void): void => {
  if (el.style.display === 'none') return;
  el.style.transition = `all ${duration / 1e3}s ease-in-out`;
  el.style.transform = `translateX(-100%)`;
  setTimeout(() => {
    if (callback) callback();
  }, duration);
};

export const slideInRight = (el: HTMLElement, duration: number, callback?: () => void): void => {
  // Start off the screen
  el.style.display = 'block';
  el.style.transform = `translateX(-100%)`;
  el.style.transition = `all 0s ease-in-out`;
  setTimeout(() => {
    el.style.display = 'block';
    el.style.transition = `all ${duration / 1e3}s ease-in-out`;
    el.style.transform = 'translateX(0)';
  }, 50);
  setTimeout(() => {
    if (callback) callback();
  }, duration);
};

export const slideOutUp = (el: HTMLElement, duration: number, callback?: () => void): void => {
  if (el.style.display === 'none') return;
  el.style.transition = `all ${duration / 1e3}s ease-in-out`;
  el.style.transform = 'translateY(-100%)';
  setTimeout(() => {
    el.style.display = 'none';
    el.style.transition = '';
    el.style.transform = '';
    if (callback) callback();
  }, duration);
};

export const slideInDown = (el: HTMLElement, duration: number, callback?: () => void): void => {
  if (el.style.display === 'block') return;
  el.style.display = 'block';
  el.style.transition = `all ${duration / 1e3}s ease-in-out`;
  el.style.transform = 'translateY(100%)';
  setTimeout(() => {
    el.style.display = 'block';
    el.style.transition = '';
    el.style.transform = '';
    if (callback) callback();
  }, duration);
};

(<any>window).getUnique = getUnique;
(<any>window).saveCsv = saveCsv;
