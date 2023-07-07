function saveMyUrl(){
	console.log('saveMyUrl',chrome.runtime);
  chrome.runtime.sendMessage(
      {
      type: 'post',
      url: "https://xxxx.com/api/users/login",
      data: {
          url: 'test'
      }
      },
      function response(res) {
          console.log("回调...")
          console.log(res)
      }
  )
}
function back(){
  chrome.runtime.sendMessage(
    {
    type: 'back',
    url: "isback",
    data: {
        url: '1111'
    }
    },
    function response(res) {
        console.log("回调back...")
        console.log(res)
    }
  )  
}

chrome.runtime.onMessage.addListener(
  (res)=>{
    console.log('我收到回调',res)
  }
)


const initApp = function (){
  const app2=document.createElement('div')
  const btn=document.createElement('span')
  const btn2=document.createElement('span')
  btn.onclick=saveMyUrl
  btn.innerHTML='ad'
  btn2.onclick=back
  btn2.innerHTML='back'
  app2.appendChild(btn)
  app2.appendChild(btn2)
  app2.id="app2"
  const body = document.getElementsByTagName('body')?.[0]
  if(body){
    body.appendChild(app2)
    // body.classList.add('app2-body')
    // body.classList.add('app2-body')
    const pluginWrap="width: 300px;height:100vh;position: fixed;right: 0;top:0;background: #fff;z-index:10000"
    app2.setAttribute('style',pluginWrap)
    body.setAttribute('style',"width: calc(100% - 600px)")

  }
}
initApp()

