export default function shortenText(text: string, len = 10) {
  if (text.length <= len) {
    return text;
  }
  if (!text.includes(' ')) {
    return text.substr(0, len) + '...';
  }
  return text.substr(0, text.lastIndexOf(' ', len)) + '...';
}
