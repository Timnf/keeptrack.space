import * as transforms from './transforms';
// @ponicode
describe('transforms.getDayOfYear', () => {
  test('0', () => {
    let param1: any = new Date('01-01-2030');
    let result: any = transforms.getDayOfYear(param1);
    expect(result).toMatchSnapshot();
  });

  test('1', () => {
    let param1: any = new Date('32-01-2020');
    let result: any = transforms.getDayOfYear(param1);
    expect(result).toMatchSnapshot();
  });

  test('2', () => {
    let param1: any = new Date('01-01-2020');
    let result: any = transforms.getDayOfYear(param1);
    expect(result).toMatchSnapshot();
  });

  test('3', () => {
    let param1: any = new Date('01-13-2020');
    let result: any = transforms.getDayOfYear(param1);
    expect(result).toMatchSnapshot();
  });

  test('4', () => {
    let param1: any = new Date('');
    let result: any = transforms.getDayOfYear(param1);
    expect(result).toMatchSnapshot();
  });
});

// @ponicode
describe('transforms.jday', () => {
  test('0', () => {
    let result: any = transforms.jday(368.0, 275.0, 3, -100, 4, 60.0);
    expect(result).toMatchSnapshot();
  });

  test('1', () => {
    let result: any = transforms.jday(366.0, 9, 28, 100, 15, 60.0);
    expect(result).toMatchSnapshot();
  });

  test('2', () => {
    let result: any = transforms.jday(367.0, 275, 4, -5.48, 29, 60.0);
    expect(result).toMatchSnapshot();
  });

  test('3', () => {
    let result: any = transforms.jday(367.0, 9.0, 4, 0, 0, 59.0);
    expect(result).toMatchSnapshot();
  });

  test('4', () => {
    let result: any = transforms.jday(367.0, 276, 3, 1, 3, 60.0);
    expect(result).toMatchSnapshot();
  });

  test('5', () => {
    let result: any = () => transforms.jday();
    expect(() => result).not.toThrow();
  });
});

// @ponicode
describe('transforms.localToZulu', () => {
  test('0', () => {
    let param1: any = new Date('01-01-2030');
    let result: any = () => transforms.localToZulu(param1);
    expect(() => result).not.toThrow();
  });

  test('1', () => {
    let param1: any = new Date('01-01-2020');
    let result: any = () => transforms.localToZulu(param1);
    expect(() => result).not.toThrow();
  });

  test('2', () => {
    let param1: any = new Date('01-13-2020');
    let result: any = () => transforms.localToZulu(param1);
    expect(() => result).not.toThrow();
  });

  test('3', () => {
    let param1: any = new Date('');
    let result: any = () => transforms.localToZulu(param1);
    expect(() => result).not.toThrow();
  });
});

// @ponicode
describe('transforms.dateFromJday', () => {
  test('0', () => {
    let result: any = () => transforms.dateFromJday(28, 1);
    expect(() => result).not.toThrow();
  });

  test('1', () => {
    let result: any = () => transforms.dateFromJday(15, 28);
    expect(() => result).not.toThrow();
  });

  test('2', () => {
    let result: any = () => transforms.dateFromJday(2, 15);
    expect(() => result).not.toThrow();
  });

  test('3', () => {
    let result: any = () => transforms.dateFromJday(28, 2);
    expect(() => result).not.toThrow();
  });

  test('4', () => {
    let result: any = () => transforms.dateFromJday(29, 15);
    expect(() => result).not.toThrow();
  });

  test('5', () => {
    let result: any = () => transforms.dateFromJday(NaN, NaN);
    expect(() => result).not.toThrow();
  });
});

// @ponicode
describe('transforms.dateToLocalInIso', () => {
  test('0', () => {
    let param1: any = new Date('01-13-2020');
    let result: any = () => transforms.dateToLocalInIso(param1);
    expect(() => result).not.toThrow();
  });

  test('1', () => {
    let param1: any = new Date('01-01-2030');
    let result: any = () => transforms.dateToLocalInIso(param1);
    expect(() => result).not.toThrow();
  });

  test('2', () => {
    let param1: any = new Date('01-01-2020');
    let result: any = () => transforms.dateToLocalInIso(param1);
    expect(() => result).not.toThrow();
  });
});