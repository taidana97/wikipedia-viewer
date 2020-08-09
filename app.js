var api =
  "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";
var cb = "&callback=JSON_CALLBACK";
var page = "https://en.wikipedia.org/?curid=";
var results = [];

$(document).ready(function () {
  var form = $("form");
  var close = $(".eks");
  var input = $("input");
  var search = $("#search");
  var help = $("#help");

  close.on("click", function () {
    form.toggleClass("open");

    if (
      !form.hasClass("open") &&
      input.val() !== "" &&
      typeof input.val() !== "undefined"
    ) {
      search.toggleClass("fullHeight");
      help.toggleClass("hide");
      input.val("");
    }
    results.length = 0;
  });

  input.on("transitionend webkitTransitionEnd oTransitionEnd", function () {
    if (form.hasClass("open")) {
      input.focus();
    } else {
      return;
    }
  });

  search.submit(function () {
    event.preventDefault();
    help.addClass("hide");
    search.removeClass("fullHeight");
    results.length = 0;
    var title = input.val();
    var urlString = api + title;
    getWiki(urlString);
  });
});

function getWiki(urlString) {
  $.ajax({
    url: urlString,
    dataType: "jsonp",
    success: function (data) {
      var data = data.query.pages;
      Object.keys(data).forEach((key) => {
        results.push(
          `<a href='${page + data[key].pageid}' target='_blank'><li><h1>${
            data[key].title
          }</h1><p>${data[key].extract}</p></li></a>`
        );
      });
      $("ul").html(results.join(""));
    },
  });
}
