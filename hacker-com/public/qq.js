function jsonp(url){
    return new Promise((resolve, reject) =>{
        const random = "frankJSONCallbackName" + Math.random()
        window[random] = (data)=>{
            resolve(data)
        }
        const script = document.createElement("script")
        script.src = `${url}?callback=${random}`  // 传递查询参数
        script.onload = ()=>{
            script.remove()  // 拿到数据后就删掉script，防止页面臃肿
        }
        script.onerror = ()=>{
            reject()
        }
        document.body.appendChild(script) 
    })
}

jsonp('http://qq.com:8888/friends.js')
    .then((data)=>{
        console.log(data)
    })





// const request = new XMLHttpRequest()
// request.open("GET", "http://qq.com:8888/friends.json")
// request.onreadystatechange = () =>{
//     if(request.readyState === 4 && request.status === 200) {
//         console.log(request.response)
//     } 
// }
// request.send()