export default function Compare(title1, title2) {
  const words1 = title1
    .toLowerCase()
    .split(/[\s\-]+/)
    .map((word) => word.replace(/[^\w\s]/gi, "").replace(/\s+/g, ""))
    .filter(Boolean);
  const words2 = title2
    .toLowerCase()
    .split(/[\s\-]+/)
    .map((word) => word.replace(/[^\w\s]/gi, "").replace(/\s+/g, ""))
    .filter(Boolean);
  let matchingWords = 0;
  for (let i = 0; i < words1.length; i++) {
    for (let j = 0; j < words2.length; j++) {
      if (words1[i] === words2[j]) {
        matchingWords++;
      }
    }
  }
return matchingWords >= 2;
}