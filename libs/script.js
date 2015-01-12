$(document).ready(function(e){        
    $('input[type="text"]').live('keypress',function(e) {
        e.keyCode = (e.keyCode != 0)?e.keyCode:e.which; 
        var a = [];
        var k = e.which;

        for (x = 48; x < 58; x++)
            a.push(x);
            
        if (!($.inArray(k,a)>=0) && e.keyCode != 9 && e.keyCode != 8 && e.keyCode != 45 && e.keyCode != 13)
        {
            e.preventDefault();                   
            alert("please enter valid year only");
        }
        if(($(this).val().length+1)>4 && e.keyCode != 8 && e.keyCode != 13)
        {
            e.preventDefault();
            
        }
    });        

});

var dataToShow="";
var nameArr = new Array("","","","","","","");    
function fetchData()
{  
    var givenYear = $("#yearVal").val();    
    nameArr = new Array("","","","","","","");    
    dataToShow = $("#readFile").text();
    $(".cards").html("");
    if(givenYear!="")
    {    
        if(dataToShow=="")
        {
            $.ajax({
                url: "birthdays.json",        
                dataType: "text",
                success: function(data) 
                {            
                    $("#readFile").html(data);                                       
                    showData(givenYear);                    
                }
            });       
        }        
        else
           showData(givenYear); 
        
        
    }    
    else
    {
        alert("Please enter given year");
    }    
}
function showData(givenYear)
{
        dataToShow = $("#readFile").val();        
        var json = $.parseJSON(dataToShow);       
        json.sort(function(a,b) {                         
            return calculateAge(a.birthday) - calculateAge(b.birthday);
        });        
        for(var data1=0;data1<json.length;data1++)
        {            
            var splitDate = json[data1].birthday.split("/");                
            splitDate[2]=givenYear;                
            var bdate = new Date(splitDate.join("/"));                
            var a = bdate.getDay();  //storing day for all the given dates
            //storing initials day wise..                   
            nameArr[a]+=json[data1].name.split(" ")[0][0]+json[data1].name.split(" ")[1][0]+"|";
        }  
        for(var i=0;i<nameArr.length;i++)
        {
            nameArr[i]=nameArr[i].substr(0,nameArr[i].length-1);                 
            var lengthForDays = nameArr[i].split("|").length;
            var boxWidth = parseInt($(".cards").css("width"))/Math.ceil(Math.sqrt(lengthForDays)); 
            var boxHeight = parseInt($(".cards").css("height"))/Math.ceil(Math.sqrt(lengthForDays)); 
            for(var j=0;j<lengthForDays;j++)
            {
                if(nameArr[i].split("|")[j]!="")
                    $("#day"+i).append("<div style='width:"+boxWidth+"px;height:"+boxHeight+"px;line-height:"+boxHeight+"px;'>"+nameArr[i].split("|")[j]+"</div>");
            }               
        }
}
var calculateAge = function(birthday) {
    var oneDay = 24*60*60*1000;
    var now = new Date();
    var past = new Date(birthday);
    var nowYear = now.getTime();
    var pastYear = past.getTime();
    var age = Math.round(Math.abs((pastYear - nowYear)/(oneDay)));
    return age;
};