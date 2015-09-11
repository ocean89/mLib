mlib.addClass("Mamal", {
    vars : {
        sex : ""
    },
    _constructor : function(sex){
        this.sex = sex;
    },
    getSex : function(){
        return this.sex;
    }
});