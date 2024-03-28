const encode = (str) => {
        let encodeVal = btoa(str).split("").reverse().join("");
        return encodeVal.split("=").join("");
};
      
const decode = (str) => {
        let decodeVal = str.split("").reverse("").join("");
        return atob(decodeVal + "==");
};

export { encode, decode }