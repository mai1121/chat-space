# JSON形式のデータを配列で返したいのでarray!使う。
# 返す時は[{"name":ドラえもん},{"name":ドラみ},…]となっている。
json.array! @users do |user|
  json.name user.name
  json.id user.id
end

# json.KEY VALUEの書き方。JavaScriptファイルに返ってきたデータをjbuilderで定義したキーとバリューの形で呼び出して使うことができる。
