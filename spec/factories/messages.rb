FactoryBot.define do
  factory :message do
    content Faker::Lorem.sentence
    # 該当のフォルダに適当な画像をおいてやる
    image File.open("#{Rails.root}/public/images/no_image.jpg")
    user
    group
  end
end
