var _mLib = function(){
    this.classes = {};
};

_mLib.prototype.addClass = function(name, obj){
    var cls = {};
    if(typeof(name) == "object"){
        var keys = Object.keys(name);
        cls.name = keys[0];
        cls.parent = name[keys[0]];
    }
    else{
        cls.name = name;
    }
    cls.cls = obj;
    this.classes[cls.name] = cls;
}

_mLib.prototype.create = function(clsName, args, ignoreConstructor){
    var cls = this.classes[clsName].cls;
    var instance = {};
    var parent = this.classes[clsName].parent;
    if(parent){
        this.createSub(instance, parent);
    }

    this.setVars(instance, cls);
    this.setFunctions(instance, cls, parent);
    if(typeof(ignoreConstructor) === "undefined"){
        cls._constructor.apply(instance, args);
    }

    return instance;
}

_mLib.prototype.createSub = function(instance, clsName){
    var cls =  this.classes[clsName].cls
    this.setVars(instance, cls);
    this.setFunctions(instance, cls);
    parent = this.classes[clsName].parent;
    if(parent){
        this.createSub(instance, parent);
    }
}

_mLib.prototype.setVars = function(instance, cls){
    var keys = Object.keys(cls.vars);
    for(var i = 0, length = keys.length; i < length; i++){
        key = keys[i];
        instance[key] = cls.vars[key];
    }
};

_mLib.prototype.setFunctions = function(instance, cls, parent){
    var keys = Object.keys(cls);
    for(var i = 0, length = keys.length; i < length; i++) {
        key = keys[i];
        if (key !== "vars"){
            instance[key] = cls[key];
        }
    }

    this.addLibFunctions(instance, parent);
};

_mLib.prototype.addLibFunctions = function(instance, parentClsName){
    if(parentClsName) {
        var self = this;
        instance.super = function () {
            var object = self.create(parentClsName, self.getValuesAsArray(arguments));
            var keys = Object.keys(object);
            for(var i = 0, max = keys.length; i < max; i++){
                var key = keys[i];
                var value = object[key];
                if(typeof(value) !== "function"){
                    console.log(value);
                    instance[key] = value;
                }
            }
        }
    }
};

_mLib.prototype.getValuesAsArray = function(object){
    var values = [];
    var keys = Object.keys(object);
    for(var i = 0, max = keys.length; i < max; i++){
        var key = keys[i];
        var value = object[key];
        values.push(value);
    }
    return values;
}


var mlib = new _mLib();