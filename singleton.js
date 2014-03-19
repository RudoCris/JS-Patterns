var Singleton = new function() {
  var instance;
  // Конструктор
  function Singleton() {
    if ( !instance )
        instance = this;
    else return instance;
    
    //публичные поля
    this.buffer = [];
  }


  // Публичные методы
  Singleton.prototype.setData = function(data, pr){
    if(typeof(pr) != "number"){
      console.error('Приоритет должен быть числом');
    }
    var ttime = new Date();
    this.buffer.push({d: data, p: pr, time: ttime});            
  };
  Singleton.prototype.getData = function(){
    var res = [];
    for(var i=0; i<this.buffer.length && i<10; ++i){
      res.push(this.buffer[this.buffer.length - 1 - i]);
    }
    return res;
  } 
  return Singleton;
}

//генеретор рандомных id
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 5; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

