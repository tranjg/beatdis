const gradients = [
    ["#FBB199", "#FFD12E"],
    ["#E2ECA6", "#77A3FA"],
    ["#A7A0EF", "#77A3FA"],
    ["#94BE39", "#FFF3B4"],
    ["#FFA4A4", "#737ABB"]
  ];
  
  const stringToGradient = (string: string) => {
    // trim the string, remove all spaces
    const trimmedString = string.trim().replace(/\s/g, "");
  
    // this is how we take the first letter. It works with emojies.
    const startHash = trimmedString
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
    // Covert the hash number into the number we can
    const gradient = startHash % gradients.length;
  
    // and return the linear-gradient
    return `linear-gradient(45deg, ${gradients[gradient][0]} 15%, ${gradients[gradient][1]} 90%)`;
  };
  
  export default stringToGradient;