export default function shortenText(text: string) {
  const maxLen = 10;
  if (text.length <= maxLen) {
    return text;
  }
  if (!text.includes(' ')) {
    return text.substr(0, maxLen) + '...';
  }
  return text.substr(0, text.lastIndexOf(' ', maxLen)) + '...';
}
