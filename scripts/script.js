'use strict';

const userName = document.getElementById('username'),
      registerUser = document.getElementById('registerUser'),
      login = document.getElementById('login'),
      list = document.getElementById('list');

// clock
const checkZero = function(number) {
  let stringNumber = String(number);
  if (stringNumber.length === 1) {
    return ('0' + stringNumber);
  }
  return number;
};

let date = new Date(),
    month = ["января","февраля","марта","апреля","мая","июня",
            "июля","августа","сентября","октября","ноября","декабря"];


function clock() {
  date = new Date();
  
  let text = (date.getDate() + ' ' + month[date.getMonth()] + ' ' + date.getFullYear() + ' г., ' +
   checkZero(date.getHours()) + ':' + checkZero(date.getMinutes()) +
   ':' + checkZero(date.getSeconds()));
  return text;
} 


let userData = [],
    storage = localStorage.getItem('users');


const render = function() {
  list.textContent = '';

  userData.forEach(function(item) {
    const li = document.createElement('li');
    li.classList.add('user');

    li.innerHTML = 'Имя: ' + item.firstName + ', ' + 'фамилия: ' + 
    item.lastName + ', ' + 'зарегистрирован: ' + item.regData + 
    '<button class="user-remove"></button>';
    list.append(li);

    const userRemove = li.querySelector('.user-remove');
    userRemove.addEventListener('click', function() {
      let position = userData.indexOf(item, 0);
      userData.splice(position, 1);
      render();
    });    
  });

  let jsonArr = JSON.stringify(userData);
  localStorage.setItem('users', jsonArr);
};


function registerUsers() {
  let obj = {
    firstName: '',
    lastName: '',
    login: '',
    password: '',
    regData: '',
  };
  let name = prompt('Введите через пробел Имя и Фамилию пользователя');
  let nameTrue = name.split(' ');

  if (nameTrue.length > 2 || nameTrue.length === 1) {
    alert('Введите через ОДИН пробел только Имя и только Фамилию пользователя');
    return;
  }
  let login = prompt('Введите Логин'),
      password = prompt('Введите Пароль');
      
  obj.firstName = nameTrue[0];
  obj.lastName = nameTrue[1];
  obj.login = login;
  obj.password = password;
  obj.regData = clock();

  userData.push(obj);
}


function checkLogin() {
  let login = prompt('Введите Логин'),
      user = false;

  for (let i = 0; i < userData.length; i++) {
    if (userData[i].login === login) {
      console.log(i);
      user = i;
    }
  } 
  if (user === false) {
    alert('Пользователя с таким Логином не существует');
  } 
  return user;
}

function checkPassword(login) {
  if (login === false) {
    return false;
  }
  let password = prompt('Введите Пароль');

  if (userData[login].password === password) {
    return login;
  } else {
    alert('Введен неверный пароль!');
    return false;
  }
}

registerUser.addEventListener('click', function() {
  registerUsers();
  render();
});

login.addEventListener('click', function() {
  let login = checkPassword(checkLogin());
  if (login || login === 0) {
    userName.textContent = userData[login].firstName;
    render();
  }
});

if (storage === null) {
  render();
} else {
  userData = JSON.parse(storage);
  render();
}
