export const formatTextWithLineBreaks = (text) => {
  if (!text) return '';
  return text.replace(/\n/g, '<br /><br />');
};