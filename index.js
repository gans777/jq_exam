$(document).ready(function(){
  var d;
  var entry_on_page = 3; // количество записей на странице
  var current_page = 0; // текущая страница
  $(".json_request").click(function(){
    let n = $('#numbers_of_ankets').val();// количество записей
    current_page = 0;
    console.log(n);
    let url_request = 'https://randomuser.me/api/?key=FWQS-YXVY-9X90-8CCF&ref=tele2roman&results' + '=' + n;
    $.ajax({
      url: url_request,
      dataType: 'json',
        success: function(data) {
          console.log(data.results)
          d = data.results;
          output(d,entry_on_page,current_page);
          $(".previous").hide();
          $(".pagination_menu").show();
        
        }
    });
  });
  $(".next").click(function(){
    if (d.length > current_page + entry_on_page){
      current_page += entry_on_page;
      output(d,entry_on_page,current_page);
      if (d.length <= current_page + entry_on_page){
        $(".next").hide();
      }
      if ($('.previous').attr('style') == 'display: none;'){
        $('.previous').show();
      }
    } 
  });
  $(".previous").click(function(){
    if ( current_page - entry_on_page >= 0){
      current_page -= entry_on_page;
      output(d,entry_on_page,current_page);
      if ( current_page - entry_on_page < 0){
        $(".previous").hide();
      }
      if ($('.next').attr('style') == 'display: none;'){
        $('.next').show();
      }
    }
  });
});

function output(d,entry_on_page,current_page){
  $(".wrap_all_info").empty(); // очистка предыдущих записей
  for (let i = current_page; i < current_page + entry_on_page; i++){
    if (i == d.length){
      break
    }
    note = "<div class='wrap_anket'>"+
    "<div class='main_photo'><img src='" + d[i].picture.large + "'>"+"<p>"+d[i].name.title +" "+d[i].name.first+" "+
    d[i].name.last+"</p>" +
    "</div>" +
    "<div class='wrap_other_info'>"+
    "<div class='other_info'>"+"<div class='cell'>cell:"+d[i].cell+"</div>" + "<div>"+d[i].dob.date+" age:" + d[i].dob.age+ 
    "</div>"+ "<div>"+ d[i].email+"</div>" +"<div>"+d[i].gender+"</div>" + 
    "<div> city: "+d[i].location.city+ " country:"+ d[i].location.country + " street:"+ d[i].location.street.name +" " 
    + d[i].location.street.number + "</div>"+
    "</div>" + 
    "</div>" + "<hr>";
    $(".wrap_all_info").append(note);
  }

}