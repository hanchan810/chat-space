$(function(){ 

  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message" data-id=${message.id}>
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
      `<div class="message" data-id=${message.id}>
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
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    
    $('.messages').append(html);
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    $('form')[0].reset();
  })
    .fail(function(){
      alert('error');
    });
    return false;
  });

  function reloadMessages(){
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $(".message").last().data("id");
    console.log(last_message_id)

    $.ajax({
      url: "api/messages",
      type: "get",
      dataType: "json",
      data: { id: last_message_id }
    })
      .done(function(messages) {
        if (messages !== undefined) {
          messages.forEach(function(message) {
            var insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
            $(".messages").animate({ scrollTop: $(".messages")[0].scrollHeight },"fast");
          });
          
         
        } else {
          console.log("新着メッセージはありません");
        }
      })
      .fail(function() {
        // alert("メッセージ更新エラーです");
        console.log("error");
      });
  };
  setInterval(reloadMessages, 5000);
});
