$(function() {
  const reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $(".message")
      .last()
      .data("id");

    $.ajax({
      url: "api/messages",
      type: "get",
      dataType: "json",
      data: { id: last_message_id }
    })
      .done(function(messages) {
        if (messages !== undefined) {
          messages.forEach(function(message) {
            buildHTML(message);
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