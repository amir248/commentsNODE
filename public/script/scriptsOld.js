// const okHeaders=new Headers();
// okHeaders.append("Content-Type","application/json;charset=utf-8");
//
// const options={
//   mode: "cors",
//   cache: "no-cache",
//   credentials: "omit",
//   redirect: "follow",
//   referrerPolicy: "no-referrer",
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body:JSON.stringify(importantBag),
// };
// fetch('http://localhost:3700/comments/object/allow-cors', options)
// .then(response => response.text())
// // .then(result => console.log(result))
// .catch(error => console.log('error', error));

// const put3='https://nasobe.ru/comments/'+`${id}`+'.json/post';
// const puto3='https://nasobe.ru/comments/'+`${id}`+'.json/post';
// const puto3='http://localhost:3700/comments/'+`${importantBag.id}`+'.json/post';
const puto3='https://qucu.ru/comments/'+`${importantBag.id}`+'.json/post';
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
inputMessage.style.cssText=`width:100%;`
inputMessage.setAttribute('placeholder','Message');
inputMessage.setAttribute('required','');
document.querySelector('#comments > form > fieldset').append(inputMessage);
const button=document.createElement('button');
button.setAttribute('id','start');
button.setAttribute('type','button');
button.innerHTML='send';
document.querySelector('#comments > form > fieldset').append(button);
const messages=document.createElement('div');
messages.setAttribute('id','messages');
document.querySelector('#comments').append(messages);

document.querySelector('#start').disabled=true;// O_o
document.querySelector('#start').addEventListener('DOMContentLoaded',()=>{
  document.querySelector('#start').disabled=true;
});


document.querySelector('#start').addEventListener('click',()=>{
  keyTestSubject();// don't work!!!!
  // keyDown();// don't work!!!!
  document.querySelector('#start').disabled=true;// O_o

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json;charset=utf-8");

let userNameF=registerForm.elements['login'].value;
let messageF=registerForm.elements['message'].value;

// var urlencoded = new URLSearchParams();
const user = {
  userName: userNameF,
  message: messageF,
  date : new Date(),
  idea: importantBag
  //.getFullYear()+"/"+new Date().getMonth()+"/"+new Date().getDate()+'---'+new Date().getHours()+':'+new Date().getUTCMinutes()
}
// urlencoded.append("userName", `${user.userName}`);
var requestOptions = {
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "omit", // include, *same-origin, omit
  redirect: "follow", // manual, *follow, error
  referrerPolicy: "same-origin", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },

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

// const json ='https://nasobe.ru/comments/json/'+`${id}`+'.json/allow-cors';
// const json ='http://localhost:3700/comments/json/'+`${importantBag.id}`+'.json/allow-cors';
const json ='https://qucu.ru/comments/json/'+`${importantBag.id}`+'.json/allow-cors';
// amir248.github.io/
async function comments(){
  await fetch(json,{
    origin: "http://localhost/",
    method: "POST",
    headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  },
  // body: undefined,
    referrer: "http://localhost/",
    referrerPolicy: "same-origin",
    mode:"cors", //CORS - разрешены политикой cors
    credentials: "omit",
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
