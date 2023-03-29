function checkWebp() {
  try {
    return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
  } catch (e) {
    return false
  }
}

const supportWebp = checkWebp();

export function getWebpImageUrl(url) {
  if (!url) {
    throw Error('url is required');
  }
  if (url.startWith('data:')) {
    return url
  }
  if (!supportWebp) {
    return url
  }
  return url.replace(/\.(\w+)$/, '.webp')
} 
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