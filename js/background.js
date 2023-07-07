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

function handleInstall(details){
console.log('chrome',chrome,chrome.tabs)
handleCookie()
  console.log('background-details',details)
}
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
		console.log('onMessageExternal',request, sender, sendResponse)
  });

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	console.log("addListener...")
	console.log(request)
			switch(request.type) {
					case 'get':
							fetch(request.url)
									.then(function(response) { sendResponse(response.json()) })
							.then(function(json) { sendResponse(json) })
							.catch(function(error) { sendResponse(null) });
					break;
					case 'post':
							fetch('http://face.dev.laningtech.net/personcollection/person/search', {
									method: 'POST',
									mode: 'cors',
									credentials: 'include',
									headers: {
											'Content-Type': 'application/json',
											'X-Token':'e24e46300bcbed3767150a1f238be72f'
									},
									body: JSON.stringify({page:1,page_size:1})
							})
									.then(function(response) { 
											console.log(response)
											sendResponse(response.json())
									})
									.then(function(json) {
											console.log(json)
											sendResponse(json)
									})
									.catch(function(error) {
											console.log(error)
											sendResponse(null)
									});
					break;
					// 你可以定义任意内容，使用sendResponse()来返回它
					case 'test':
							sendResponse({'msg': 'test'});
					break;
					// 后端主动发给web
					case 'back':
						const tabId = sender?.tab?.id
						console.log('back',tabId,sender)
						chrome.tabs.sendMessage(
							tabId,
							'message',
							{},
							()=>{console.log('我是callback')}
						)
					break;	
					// 后端主动发给popup
					case 'backpopup':
						const extensionId = sender?.id
						console.log('back',extensionId,sender)
						chrome.runtime.sendMessage(
							extensionId,
							'message',
							{},
							()=>{console.log('我是callback','backpopup')}
						)
					break;									
	}
})


chrome.tabs.onActivated.addListener((a,b,v,bv) => {
	console.log('onActivated',a,b,v,bv)
	chrome.tabs.sendMessage(a.tabId,'returnonActivated',{},()=>{console.log('我是callback','onActivated')});
});    


