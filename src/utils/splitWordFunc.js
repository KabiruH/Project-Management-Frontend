export const  splitWordFunc = (str)=> {
    let formattedStr = str.replace(/([a-z])([A-Z])/g, '$1 $2');
    formattedStr = formattedStr.charAt(0).toUpperCase() + formattedStr.slice(1);
    return formattedStr;
  }
  
