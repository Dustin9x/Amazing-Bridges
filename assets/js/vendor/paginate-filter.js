'use strict';

angular.module("myApp.paginate-filter",[]).filter("paginate",function(){
    return function(arr,currentPage,pageSize){
        try{
            return arr.slice((currentPage-1)*pageSize, currentPage*pageSize);

        }catch(err){
            return arr;
        }
    }
})