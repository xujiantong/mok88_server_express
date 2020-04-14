let salesOffices = {}; // 定义售楼处，发布源

salesOffices.clientList = []; // 缓存列表,存放订阅者的回调函数

salesOffices.listen = function( fn ) { // 增加订阅者
   this.clientList.push( fn ); //订阅的消息添加进缓存列表
};

salesOffices.trigger = function(){ // 发布消息
    for(var i = 0, fn; fn = this.clientList[i++];){
        fn.apply(this, arguments); //arguments 是发布消息时带上的参数
    }
};
