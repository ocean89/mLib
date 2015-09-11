mlib.addClass({"Employee" : "Person"}, {
    vars : {
        position : ""
    },
    _constructor : function(name, age, position, sex){
        this.super(name, age, sex);
        this.position = position;
    },
    getPosition : function(){
        return this.position;
    },
    getAge : function(){
        return this.age + " old";
    }
});