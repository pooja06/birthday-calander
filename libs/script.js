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


function fetchData()
{  
    var givenYear = $("#yearVal").val();    
    var nameArr = new Array("","","","","","","");        
    $(".cards").html("");
    if(givenYear!="")
    {
        $.ajax({
            url: "birthdays.json",        
            dataType: "text",
            success: function(data) 
            {            
                $("#readFile").html(data);                        
                var json = $.parseJSON(data);            
                json.sort(function(a,b) {                 
                    return calculateAge(b.birthday) - calculateAge(a.birthday);
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
        });        
    }
    else
    {
        alert("Please enter given year");
    }    
}
var calculateAge = function(birthday) {
    var now = new Date();
    var past = new Date(birthday);
    var nowYear = now.getFullYear();
    var pastYear = past.getFullYear();
    var age = nowYear - pastYear;
    return age;
};