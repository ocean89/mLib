mlib.addClass({"Person" : "Mamal"}, {
    vars : {
        name : "",
        age : 0
    },
    _constructor : function(name, age, sex){
        this.super(sex);
        this.name = name;
        this.age = age + 20;
    },
    getAge : function(){
        return this.age;
    },
    setName : function(name){
        this.name = name;
    }
});