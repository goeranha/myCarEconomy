export const lookup = (array: any[], key: string, value: any) => {
    const found = array.find(item => item[key] === value);
    return found ? found : null;
  };