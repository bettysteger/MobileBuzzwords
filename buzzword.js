$(document).bind("ready", function(){
  
  var wl = window.location;
  if (wl.hash) {
    wl.href = wl.protocol + wl.port + '//' + wl.host + wl.pathname;
  }
  
  $.ajax({
    url: "http://buzzwords.tladesignz.com/data.pl",
    dataType: "jsonp",
    success: function(json) {
      var cat, page, i, html, tmp, bingoWords, allBingoWords;
      var list = $("#list");
      
      for(cat in json) {
        list.append('<li><a href="#'+cat+'-page">'+cat+'</a></li>');
        
        page = $($("#page_template").html());
        page.attr("id", cat+"-page");
        page.attr("data-url", cat+"-page");
        
        // 5 Zufällige Wörter der Kategorie auswählen
        allBingoWords = json[cat];
        bingoWords = [];
        for(i=0;i<5;i++) {
          do {
            var index = Math.round(Math.random()*(allBingoWords.length-1));
            var word = allBingoWords[index];
          } while(bingoWords.indexOf(word) !== -1)
          bingoWords.push(word);
        }
        
        html = "";
        for(i = 0;i<bingoWords.length;i++) {
          tmp = bingoWords[i]+"-"+cat;
          html += '<input type="checkbox" name="checkbox-'+i+'" id="checkbox-'+i+'" class="custom" /><label for="checkbox-'+i+'">'+bingoWords[i]+'</label>';
        }
        page.find("h1").text(cat);
        page.find("fieldset[data-role=controlgroup]").html(html);
        page = $("body").append(page);
      }
      
      $('#list').listview('refresh');
    }
  });
  
  $("input[type=checkbox]").live('change', function(ev) {
    var checkedCount=0;
    var checkboxes = $(ev.currentTarget).closest("fieldset").find("input[type=checkbox]");
    checkboxes.each(function(i, checkbox) {
      if($(checkbox).is(":checked")) {
        checkedCount++;
      }
    });
    if(checkedCount > 4) {
      $('audio').get(0).play();
      checkboxes.removeAttr('checked').checkboxradio("refresh");
    }
  });
});
