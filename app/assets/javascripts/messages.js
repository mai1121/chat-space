$(document).on('turbolinks:load',function(){
  function buildHTML(message){
          var image = message.image ? `<img alt="" src="${message.image}" class="lower-message__image" />` : "";
          var html =`<div class="chat-content__message chat-content__message--top" data-message-id="${message.id}">
                     <div class="chat-content__message-info">
                      <div class="chat-content__member-name">
                           ${message.user_name}
                      </div>
                      <div class="chat-content__date">
                      ${message.created_at}
                       </div>
                        <div class="chat-content__message-main">
                           ${message.content}
                           ${image}
                        </div>
                    </div>
                </div>`
    return html;
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
      $('.chat-content__main').append(html)
      $('.chat-content__form-message').val('')
      $('.chat-content__form-submit').attr('disabled', false);
      $('.chat-content__main').animate({scrollTop: $('.chat-content__main')[0].scrollHeight}, 'slow');
    })
    .fail(function(){
      alert('error');
    })
  });

  setInterval(function(){
    $.ajax({
      url: window.location.href,
      type: "GET",
      dataType: 'json'
    })
    .done(function(data){
      var displayedId = $(".chat-content__message--top").filter(":last").data("messageId");
      data.forEach(function(message){
        console.log(message);
        if (message.id > displayedId){
          var html = buildHTML(message);
          $('.chat-content__main').append(html);
          $('.chat-content__main').animate({scrollTop: $('.chat-content__main')[0].scrollHeight}, 'slow');
        }
      });
    })
    .fail(function(){
      alert('error');
    })
  },5000);

});
