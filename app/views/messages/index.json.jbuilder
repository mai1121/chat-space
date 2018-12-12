# コントローラで取得した@messagesのデータをjson形式に変換する。
json.array! @messages do |message|
  json.content  message.content
  json.image  message.image.url
  json.created_at  message.created_at.strftime('%Y/%m/%d %H:%M')
  json.user_id  message.user_id
  json.user_name  message.user.name
  json.id  message.id
end
