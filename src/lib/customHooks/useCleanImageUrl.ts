// export const cleanImageUrl = (url: string | null): string | null => {
//   if (!url) return null;

//   try {
//     if (url.startsWith('http://localhost:8080/["') || url.startsWith('http://localhost:8080/[\"')) {
//       const startIndex = url.indexOf('http', 1);
//       if (startIndex > -1) {
//         const endIndex = url.indexOf('"', startIndex);
//         return url.substring(startIndex, endIndex);
//       }
//     }

//     if (url === 'http://localhost:8080/[]') {
//       return null;
//     }

//     return url;
//   } catch (error) {
//     console.error('Error cleaning image URL:', error);
//     return null;
//   }
// };

export const cleanImageUrl = (url: string | null): string | null => {
  if (!url) return null;

  try {
    const problematicPrefixes = [
      'http://localhost:8080/["',
      'http://localhost:8080/["',
      'https://api.brandsquare.store/["',
      'https://api.brandsquare.store/["',
    ];

    const hasProblematicPrefix = problematicPrefixes.some((prefix) =>
      url.startsWith(prefix)
    );

    if (hasProblematicPrefix) {
      const startIndex = url.indexOf("http", 1);
      if (startIndex > -1) {
        const endIndex = url.indexOf('"', startIndex);
        return url.substring(startIndex, endIndex);
      }
    }

    const emptyArrayPatterns = [
      "http://localhost:8080/[]",
      "https://api.brandsquare.store/[]",
    ];

    if (emptyArrayPatterns.includes(url)) {
      return null;
    }

    return url;
  } catch (error) {
    console.error("Error cleaning image URL:", error);
    return null;
  }
};
