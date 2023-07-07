
let imgList=Array.from(document.getElementsByTagName?.('img')||[])
let imgDrcList=imgList.map(item=>{
  return item?.attributes?.src?.value
}).filter(src=>{
  return src
})
console.log('imgDrcList',imgDrcList)
console.log('chrome',chrome,chrome.tabs)
