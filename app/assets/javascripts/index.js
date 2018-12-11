$(document).on('turbolinks:load',function(){

  var user_list = $(".chat-group-form__field--user-lists");

  function appendUser(user) {
   var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ user.name }</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
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

  $(".user-search-remove").on("click", function() {
    $(this).parent().remove();
  });

  $("#user-search-field").on("keyup", function() {
    var input = $.trim($("#user-search-field").val());
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

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

    $(document).off("click", ".user-search-add");

    $(document).on("click", ".user-search-add", function(){
      var user_id = $(this).data("userId");
      var user_name = $(this).data("userName");
      addUser(user_id, user_name);
      $(this).parent().remove();
      $('#user-search-field').val('');
    });

    $(document).on("click", ".user-search-remove", function(){
      $(this).parent().remove();
    });
  });
});
