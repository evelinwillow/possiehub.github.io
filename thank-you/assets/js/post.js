function getBlogPost() {
  var postId = getUrlParameter("postId");
  if (postId) {
    loadPost(postId);
  } else {
    loadPostList();
  }
}

function loadPost(postId) {
  $(document).ready(function () {
    $.get("/blog/posts/" + postId + ".html", function (data) {
      var postTitle = $(data).find(".post_title").text();
      var postDate = $(data).find(".post_date").text();
      var postContent = $(data).find(".post_content").text();

      $("#blog-content").html(
        '<h1 class="box_light" >' +
          postTitle +
          "</h1>" +
          '<p class="small_body post_date">' +
          postDate +
          "</p>" +
          '<div class="box"><p>' +
          postContent +
          "</p></div>"
      );
    });
  });
}

function loadPostList() {
  $(document).ready(function () {
    var postListHtml = "";
    $.ajax({
      url: "/blog/posts/",
      success: function (data) {
        $(data)
          .find("a")
          .each(function () {
            var postLink = $(this).attr("href");

            if (postLink.endsWith(".html")) {
              var postId = postLink
                .substr(0, postLink.length - 5)
                .split("/")
                .pop();
              $.get("/blog/posts/" + postId + ".html", function (postData) {
                var postTitle = $(postData).find(".post_title").text();
                var postDate = $(postData).find(".post_date").text();
                var postContent = $(postData)
                  .find(".post_content")
                  .text()
                  .split(" ")
                  .slice(0, 51)
                  .join(" ");

                postListHtml +=
                  '<div class="small_header"><a href="/blog/" class="blog-link" data-post-id="' +
                  postId +
                  '"><div class="prev_title">' +
                  postTitle +
                  '</div><div class="prev_date">(' +
                  postDate +
                  ')</div></a></div><div class="small_body"><p>' +
                  postContent +
                  '... <a href="/blog/?postId=' +
                  postId +
                  '">  read more</a></div>';
                $("#blog-content").html(postListHtml);
              });
            }
          });
          BlogClick()
      },
    });
  });
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function BlogClick() {
  $(document).ready(function () {
    $(document).on("click", ".blog-link", function (event) {
      event.preventDefault();
      var postId = $(this).data("post-id");
      window.location.href = "/blog/?postId=" + postId;
    });
  });
}

BlogClick();