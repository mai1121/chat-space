class UsersController < ApplicationController
  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  # 検索フォームの非同期通信用のアクション
  def index
    # ユーザー検索フォームのキーワードをあいまい検索（〜を含む）して、usersテーブルのnameカラムから10件のユーザー情報を取得する
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").limit(10)
    # html形式かjson形式かを判断。json形式の場合は、app/views/users/index.json.jbuilderが読まれる
    respond_to do |format|
     format.html
     format.json
   end
  end

  def user_params
    params.require(:user).permit(:name, :email)
  end



end
