$(function() {
  function buildHTML(message){
    if ( message.image.url !== null ) {
      var html =
       `<div class="message" data-message-id=${message.id}>
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="upper-message__date">
              ${message.date}
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `<div class="message" data-message-id=${message.id}>
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="upper-message__date">
              ${message.date}
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  };
  const reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得

    last_message_id = $(".message:last").data("message-id");

    $.ajax({
      url: "api/messages",
      type: "get",
      dataType: "json",
      data: { id: last_message_id }
    })
      .done(function(messages) {
        console.log(messages)
        if (messages.length !== 0) {
          messages.forEach(function(message) {
            var html = buildHTML(message);
            $('.messages').append(html);
          });
          $(".messages").animate(
            { scrollTop: $(".messages")[0].scrollHeight },
            "fast"
          );
        } else {
          console.log("新着メッセージはありません");
        }
      })
      .fail(function() {
        alert("メッセージ更新エラーです");
      });
  };
  setInterval(reloadMessages, 5000);

});