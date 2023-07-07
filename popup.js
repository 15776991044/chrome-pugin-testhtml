// 获取网站的cookie，并打印出来
function handleCookie(params) {
	console.log('chrome',chrome)
	chrome.tabs.query({ }, tabs => {
		console.log('tabs',tabs)
    tabs.forEach(element => {
      let url= 'https://www.baidu.com/';
		// use `url` here inside the callback because it's asynchronous!
		console.log('url--', url);
		chrome.cookies.getAll({ url }, function (cookies) {
	console.log('cookies',cookies)

			const resList = cookies.map(item => {
				return `${item.name}=${item.value}`
			})
			const cookieStr = resList.join(";")
			console.log("cookies-----", cookieStr);
		});      
    });

	});
}

function saveMyUrl(){
	console.log('saveMyUrl',chrome.runtime)
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

document.getElementById("message").onclick = function () {
	console.log('bbb')
	// chrome.runtime.sendMessage({ 'msg': 'Hello' }, function (event) {
	// 	console.log('aaa')
	// })
	back()
}

function back(){
  chrome.runtime.sendMessage(
    {
    type: 'backpopup',
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
  (request, sender, sendResponse)=>{
    console.log('我收到回调',request, sender, sendResponse)
			const tabId = sender?.tab?.id
			console.log('back',tabId,sender)
			chrome.tabs.sendMessage(
				tabId,
				'messagewwww',
				{},
				()=>{console.log('我是callback')}
			)
  }
)

