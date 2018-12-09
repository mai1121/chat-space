$(document).on('turbolinks:load',function(){
  function buildHTML(message){
          var image = message.image ? `<img alt="" src="${message.image}" class="lower-message__image" />` : "";
          var html =`<div class="chat-content__message chat-content__message--top">
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

  // idクラスnew_messageのsubmitイベント
  $('#new_message').on('submit', function(e){
    // デフォルトのイベントを止める
    e.preventDefault();
    // new_messageセレクタのフォームの情報を送信データとして取得
    var formData = new FormData(this);
  // フォーム情報のうち、action属性の値（URL:"/groups/:group_id/messages"）を取得し変数urlに保存
    var url = $(this).attr('action')
    // 非同期通信に必要なオプションを定義
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    // 非同期通信に成功した時の記述.dataには、jbuilderで作成したJSON形式のデータが入っている。
    .done(function(data){
      // buildHTMLに引数dataを入れて変数htmlに代入
      var html = buildHTML(data);
      // .chat-content__message.chat-content__message--topセレクタの末尾に新規メッセージを追加
      $('.chat-content__main').append(html)
      // 入力欄を初期値
      $('.chat-content__form-message').val('')
      // 連続投稿できるようにボタンからdisabledを取り除く
      $('.chat-content__form-submit').attr('disabled', false);
      $('.chat-content__main').animate({scrollTop: $('.chat-content__main')[0].scrollHeight}, 'slow');
    })
    .fail(function(){
      alert('error');
    })
  });
});
