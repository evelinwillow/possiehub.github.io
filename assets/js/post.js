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
    $.get("/blog/posts/" + postId + ".html", function (data) {  /* <---- HIER DIE URL ANPASSEN */
      var postTitle = $(data).find(".post_title").text();
      var postDate = $(data).find(".post_date").text();
      var postContent = $(data).find(".post_content").text();

      $("#blog-content").html(
        '<div class="content_header_container" id="space-between">' +
          '<div id="blog_header" class="smallbox_dark" >' +
            "<h1>" +
              postTitle + 
            "</h1>" +
          "</div>" +
          '<div id="blog_date" class=smallbox_dark>' +
            "<p>" + 
              postDate +
            "</p>" +
          '</div>' +
        "</div>" +
        '<div class="box">' +
          '<div class="content_header_container" id="space-between">' +
            '<div class="smallbox_dark" >' +
            "</div>" +
          "</div>" +
            '<div class="sheet">' +
            "<p>" +
              postContent +
            "</p>" +
          "</div>" +
        "</div>"
      );
    });
  });
}

async function loadPostList() {
  const postListHtml = [];
  const data = await $.ajax({
    url: "/blog/posts/posts.json",   /* <---- HIER DIE URL ANPASSEN */
  });

  postListHtml.push(
    '<div class="content_header_container"><h1>Hi! I\'m Evelin Anastazia Willow, and these are all my blog posts!</h1></div>'
  )

  for (let i = 0; i < data.posts.length; i++) {
    const postId = data.posts[i].id;
    const postUrl = "/blog/posts/" + postId + ".html";  /* <---- HIER DIE URL ANPASSEN */
    const postData = await $.get(postUrl);

    const postTitle = $(postData).find(".post_title").text();
    const postDate = $(postData).find(".post_date").text();
    const postContent = $(postData)
      .find(".post_content")
      .text()
      .split(" ")
      .slice(0, 51)
      .join(" ");

    postListHtml.push(
      `<section>
      <div class="content_header_container" id="space-between">
      <div class="smallbox_dark">
      <p></p>
      <a href="/blog/" class="blog-link" data-post-id="${postId}">
      <div class="prev_title">${postTitle}</div>
      </a>
      </div>
      <div id="blog_date" class=smallbox_dark>
      <p>
      ${postDate}
      </p>
      </div>
      </div>
      <div class="box">
        <div class="content_header_containter"><p></p></div>
        <div class="sheet">
          <p>${postContent}... <a href="/blog/?postId=${postId}">  read more</a></p>  
        </div>
      </div>
      </section>`
    );                                                      /* <---- HIER DIE URL ANPASSEN (zeile 61) */
  }  

  $("#blog-content").html(postListHtml.join(""));
  BlogClick();
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
      window.location.href = "/blog/?postId=" + postId;  /* <---- HIER DIE URL ANPASSEN */
    });
  });
}

BlogClick();
