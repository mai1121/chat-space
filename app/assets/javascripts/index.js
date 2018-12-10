$(document).on('turbolinks:load',function(){

  var user_list = $(".chat-group-form__field--user-lists");

  function appendUser(user) {
   var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ user.name }</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    // JSON形式で取得した情報を反映したHTMLブロックを変数htmlに代入し、.chat-group-form__field--rightクラスのセレクタの後ろに追加している。
     user_list.append(html);
  }

  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ user }</p>
                </div>`
    user_list.append(html);
  }

  var members = $(".chat-group-form__field--members");

  function addUser(user_id, user_name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                <p class='chat-group-user__name'>${user_name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
    members.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    // e.preventDefault();
    // input内の入力値を取得して変数inputに代入
    var input = $.trim($("#user-search-field").val());
    // console.log(input);

    //非同期通信に必要なオプションを定義
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    // 非同期通信に成功した時の記述.usersには、jbuilderで作成したJSON形式のデータが配列で入っている。
    .done(function(users) {
     $(".chat-group-form__field--user-lists").empty();
     if (users.length !== 0) {
       users.forEach(function(user){
         appendUser(user);
       });
     }
     else {
       appendNoUser("一致するユーザーはいません");
     }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })

    // 追加ボタンをクリックした時のイベントを定義
    $(document).on("click", ".user-search-add", function(){
      // クリックしたボタンの独自データ属性を変数に代入
      var user_id = $(this).data("userId");
      var user_name = $(this).data("userName");
      addUser(user_id, user_name);
      // クリックされたボタンの親要素を取得し、親子要素全て検索結果のビューから消す
      $(this).parent().remove();
    });

    // 削除ボタンをクリックした時のイベントを定義
    $(document).on("click", ".user-search-remove", function(){
      // クリックされたボタンの親要素を取得し、親子要素全て検索結果のビューから消す
      $(this).parent().remove();
    });

  });
});
