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
    console.log(words1);
    console.log(words2);
    let matchingWords = 0;
    // comparer chaque mot des deux titres
    for (let i = 0; i < words1.length; i++) {
        for (let j = 0; j < words2.length; j++) {
            if (words1[i] === words2[j]) {
                matchingWords++;
                console.log("mot qui match = " + matchingWords);
            }
        }
    }
    console.log("fin = " + matchingWords);
    // calculer le pourcentage de mots correspondants
    // const matchPercentage = (matchingWords / Math.max(words1.length, words2.length)) * 100;
    // console.log("% total = "+ matchPercentage)
    // retourner vrai si au moins 2/3 des mots correspondent
    // return matchPercentage >= 40;
    return matchingWords >= 2;
};
