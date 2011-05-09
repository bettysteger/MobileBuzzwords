$(document).bind("ready", function(){
  
  var wl = window.location;
  if (wl.hash) {
    wl.href = wl.protocol + wl.port + '//' + wl.host + wl.pathname;
  }
  
  $.ajax({
    url: "http://buzzwords.tladesignz.com/data.pl",
    dataType: "jsonp",
    success: function(json) {
      var cat, page, i, html, tmp;
      var list = $("#list");
      
      for(cat in json) {
        list.append('<li><a href="#'+cat+'-page">'+cat+'</a></li>');
        
        page = $($("#page_template").html());
        page.attr("id", cat+"-page");
        page.attr("data-url", cat+"-page");
        
        html = "";
        for(i = 0;i<json[cat].length;i++) {
          tmp = json[cat][i]+"-"+cat;
          html += '<input type="checkbox" name="checkbox-'+i+'" id="checkbox-'+i+'" class="custom" /><label for="checkbox-'+i+'">'+json[cat][i]+'</label>';
        }
        page.find("fieldset[data-role=controlgroup]").html(html);
        page = $("body").append(page);
      }
      
      $('#list').listview('refresh');
    }
  });
});
