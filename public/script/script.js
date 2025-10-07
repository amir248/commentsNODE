const url777='https://comments.qucu.ru/';
// const puto3='https://qucu.ru/comments/'+`${importantBag.id}`+'.json/post';
 const puto3=`${url777}`+`${importantBag.id}`+'.json';
// const puto3='https://qucu.ru/comments/'+`${importantBag.id}`+'.json/post';
const form=document.createElement('form');
form.setAttribute('action',puto3);
form.setAttribute('method','post');
form.setAttribute('name','registerForm');
document.querySelector('#comments').append(form);
const fieldset=document.createElement('fieldset');
document.querySelector('#comments > form').append(fieldset);
const legend=document.createElement('legend');
legend.innerHTML='CommentarySystem Baron Sajtoverstausen';
document.querySelector('#comments > form > fieldset').append(legend);
const inputName=document.createElement('input');
inputName.setAttribute('name','login');
inputName.setAttribute('placeholder','Name');
inputName.setAttribute('id','nameCommentsSystem');
inputName.setAttribute('required','');
document.querySelector('#comments > form > fieldset').append(inputName);
const inputMessage=document.createElement('input');
inputMessage.setAttribute('name','message');
inputMessage.setAttribute('id','message');
inputMessage.style.cssText=`width:calc(100% - 2px);`
inputMessage.setAttribute('placeholder','Message');
inputMessage.setAttribute('required','');
document.querySelector('#comments > form > fieldset').append(inputMessage);
const button=document.createElement('button');
button.setAttribute('id','start');
button.setAttribute('type','submit');
button.innerHTML='send';
document.querySelector('#comments > form > fieldset').append(button);
const messages=document.createElement('div');
messages.setAttribute('id','messages');
document.querySelector('#comments').append(messages);

document.querySelector('#start').disabled=true;// O_o
document.querySelector('#start').addEventListener('DOMContentLoaded',()=>{
  document.querySelector('#start').disabled=true;
});

window.onerror = function() {
  return true; 
};
document.querySelector('#start').addEventListener('click',()=>{
  keyTestSubject();// don't work!!!!
  // keyDown();// don't work!!!!
  document.querySelector('#start').disabled=true;// O_o

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json;charset=utf-8");

let userNameF=registerForm.elements['login'].value;
let messageF=registerForm.elements['message'].value;


let newUser = DOMPurify.sanitize(userNameF, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
let newMessagesF = DOMPurify.sanitize(messageF, {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
  ALLOWED_ATTR: ['href', 'target']
});

let newUserOld = userNameF.replace(/<\/?script>/g, (match) => {
  return '&lt;script&gt;';
})
 .replace(/<\/?script>/gi, '&lt;script&gt;')
  .replace(/<\/?style>/gi, '&lt;style&gt;')
  
  // Удаляем атрибут onerror и другие опасные атрибуты
  .replace(/onerror/gi, 'data-onerr0r')
  .replace(/on\w+/gi, '<span>🙀</span>')  // Удаляем все обработчики событий
  
  // Блокируем другие потенциально опасные теги
  .replace(/(?:applet|base|frame|iframe|object|embed|link|meta|source)/gi, '$1&gt;');
  
let newMessages = messageF.replace(/<\/?script>/g, (match) => {
  return '&lt;script&gt;';
});


// Очищаем сообщение от опасных тегов и атрибутов
let newMessagesF_old = messageF

  .replace(/<\/?script>/gi, '&lt;script&gt;')
  .replace(/<\/?style>/gi, '&lt;style&gt;')
  
  // Удаляем атрибут onerror и другие опасные атрибуты
  .replace(/onerror/gi, 'data-onerr0r')
  .replace(/on\w+/gi, '<span>🙀</span>')  // Удаляем все обработчики событий
  
  // Блокируем другие потенциально опасные теги
  .replace(/(?:applet|base|frame|iframe|object|embed|link|meta|source)/gi, '$1&gt;');

  // <
  // &lt;
  
  // // Сохраняем безопасные теги
  // .replace(/<(b|i|u|strong|em|p|br|span|div|a|img)(?:\s+[^>]*)?>/gi, '<$1>')
  // .replace(/<\/(b|i|u|strong|em|p|br|span|div|a|img)>/gi, '>$1')
  
  // // Удаляем оставшиеся опасные теги
  // .replace(/<[^>]+>/gi, '')
  // .replace(/<a\s+/gi, '<a ')
  // .replace(/href=["']?(.*?)["']?/gi, 'href="$1"')
  // .replace(/<img\s+/gi, '<img ')
  // .replace(/src=["']?(.*?)["']?/gi, 'src="$1"');
function onClicker(){
  fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
      const ip = [data.ip, location.href,new Date()];

      // Отправляем IP на сервер
      return fetch(`${url777}`+'/getIp', {
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "include", // include, *same-origin, omit
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "origin-when-cross-origin", 
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ip: ip })
      });
  })
  .then(response => {
      if (!response.ok) throw new Error("Ошибка отправки IP");
      return response.text(); // или .json(), если сервер возвращает JSON
  })
  .then(result => {
      console.log("Ответ сервера:", result);
  })
  .catch(error => {
      console.error("Ошибка:", error);
  });

  }
  onClicker();

// var urlencoded = new URLSearchParams();
const user = {
  // userName: newUser,
  userName: userNameF,
  // message: newMessagesF,
  message: messageF,
  date : new Date(),
  idea: importantBag
  //.getFullYear()+"/"+new Date().getMonth()+"/"+new Date().getDate()+'---'+new Date().getHours()+':'+new Date().getUTCMinutes()
}
// urlencoded.append("userName", `${user.userName}`);
var requestOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "include", // include, *same-origin, omit
  redirect: "follow", // manual, *follow, error
  referrerPolicy: "origin-when-cross-origin", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  method: 'POST',
  
  body:JSON.stringify(user),
  // redirect: 'follow',
  // 'API-Key': 'secret'
};


fetch(puto3, requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));
document.querySelector('#message').value='';
});//addEventListenerClick
console.log(importantBag.id);

//const json ='https://qucu.ru/comments/json/'+`${importantBag.id}`+'.json/allow-cors';
const json =`${url777}`+`${importantBag.id}`;

// amir248.github.io/
async function comments(){
  await fetch(json,{
    // origin: "https://nasobe.ru/",
    method: "POST",
    headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  },
  // body: undefined,
    // referrer: "https://nasobe.ru/",
    referrerPolicy: "origin-when-cross-origin",
    mode:"cors", //CORS - разрешены политикой cors
    credentials: "include",
    cache: "no-store",
    body:JSON.stringify(importantBag)

}).then(response=>response.json()).then(message=>{
  let count=message.length;
  let num=count-1;
  // console.log(first.count+"__"+num);

  function firstMessage(){
    first.count=num;
    let newBox=document.createElement('div');
    newBox.className='box';
    document.querySelector('#messages').append(newBox);
    for(num;num>=0;num--){
      let newUser=document.createElement('p');
      newUser.innerHTML="<span style='display:flex;margin-left:0;color:red;float:left;font-size:17px;'><span style='color:orange;font-size:17px;'>></span>"+message[num]['userName']+"</span>";
      newUser.setAttribute('id','oK'+`${num}`);
      document.querySelector('.box').append(newUser);
      let newMessage=document.createElement('p');
      newMessage.innerHTML="<span style='color:grey;font-size:17px;'><span style='color:green;font-size:17px;'> : </span>"+message[num]['message']+"</span>";
      newMessage.setAttribute('id','oK'+`${num}`);
      document.querySelector('.box').append(newMessage);
      let newDate=document.createElement('p');
      newDate.innerHTML="<span style='color:blue;float:right;background:gray;border-radius:7px;'><span style='color:violet;font-size:14px;'>Date: </span>"+message[num]['date']+"</span>";
      newDate.setAttribute('id','oK'+`${num}`);
      document.querySelector('.box').append(newDate);

      let her=document.createElement('hr');
      her.style.cssText='margin-bottom:47px;color:lightgray;background-color:gray;'
      her.setAttribute('id','oK'+`${num}`);
      document.querySelector('.box').append(her);
    }
  }
  function secondMessage(){
    // console.log('second');
    for(num;num>=first.count;num--){

      if(first.count<num){
        let her=document.createElement('hr');
        her.style.cssText='margin-bottom:47px;color:lightgray;background-color:gray;'
        her.setAttribute('id','oK'+`${num}`);
        document.querySelector('.box').prepend(her);

        let newDate=document.createElement('p');
        newDate.innerHTML="<span style='color:blue;float:right;background:gray;border-radius:7px;'><span style='color:violet;font-size:14px;'>Date: </span>"+message[num]['date']+"</span>";
        newDate.setAttribute('id','oK'+`${num}`);
        document.querySelector('.box').prepend(newDate);

        let newMessage=document.createElement('p');
        newMessage.innerHTML="<span style='color:grey;font-size:17px;'><span style='color:green;font-size:17px;'> : </span>"+message[num]['message']+"</span>";
        newMessage.setAttribute('id','oK'+`${num}`);
        document.querySelector('.box').prepend(newMessage);

        let newUser=document.createElement('p');
        newUser.innerHTML="<span style='display:flex;margin-left:0;color:red;float:left;font-size:17px;'><span style='color:orange;font-size:17px;'>></span>"+message[num]['userName']+"</span>";
        newUser.setAttribute('id','oK'+`${num}`);
        document.querySelector('.box').prepend(newUser);

        first.count++;
      }
    }
  }
  if(first.count!==0){
    secondMessage();
  }else{
    if(first.message==true){
      secondMessage();
    }else{
      // console.log('ELSE');
      firstMessage();
      first.message=true;
      // console.log(first);
    }
  }
  function futureComments(){
    // console.log(count);
    for(let i=0;i<count;i++){
      let yyy=document.querySelectorAll('#oK1').length;
        for(let y=0;y<yyy;y++){
          console.log(
            document.querySelectorAll('#oK'+`${i}`)[y]
          )
        }
        //#oK4
      // console.log(document.querySelectorAll('#oK3')[3]);
    }
  }//futureComments <- just why?
  // futureComments();
// document.querySelector('#date').innerHTML="<p style='border:1px solid lightgray; border-radius:2px;'>"+`${new Date()}`+"</p>";

});
// console.log(message);
}//comments
// comments();
let timer=7000;
var first;
if(first==undefined){
  comments();
  first={
    "one": true,
    "count": 0
  };
}
function delite(){
  document.querySelector('.box').remove();
}
// setInterval(delite,timer);
setInterval(comments,timer);
//------------------------------------------------------------------------------
// document.querySelector('#start').addEventListener('click',()=>{
//   console.log('click');
//   newComment();
//   // window.location.reload();
//   setInterval(()=>window.location.href='/comments',1000);
// });
// setInterval(()=>newComment(),300);
//querySelector('input[type=text]')


// let testSubject=document.querySelector('#nameCommentsSystem').value.length>3||document.querySelector('#message').value.length>7;
function keyDown(){
  document.querySelector('#comments > form > fieldset').addEventListener('keydown',()=>{
    keyTestSubject();
  });
}//keyDown
keyDown();
function keyTestSubject(){
  if(document.querySelector('#nameCommentsSystem').value.length>2&&document.querySelector('#message').value.length>7){
    document.querySelector('#start').disabled=false;
  }else{
    document.querySelector('#start').disabled=true;
  }
  if(document.querySelector('#nameCommentsSystem').value.length>2){
    document.querySelector('#nameCommentsSystem').style.cssText=`background:rgba(0,255.0,0.1)`;
  }else{
    document.querySelector('#nameCommentsSystem').style.cssText=`background:rgba(255,0.0,0.1)`;
  }
  if(document.querySelector('#message').value.length>7){
    document.querySelector('#message').style.cssText=`background:rgba(0,255.0,0.1);width:100%;`;
  }else{
    document.querySelector('#message').style.cssText=`background:rgba(255,0.0,0.1);width:100%;`;
  }
}//keyTestSubject
