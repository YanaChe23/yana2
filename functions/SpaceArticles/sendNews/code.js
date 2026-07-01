// Получаем дату и время, которые были день назад в формате ISO
var oneDayAgoISO = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

// Отправляем запрос, чтобы получить статьи, опубликованные за последний день
return Http.get({
  url: "https://api.spaceflightnewsapi.net/v4/articles/",
  params: {
    published_at_gte: oneDayAgoISO,
    ordering: "-published_at"
  },
  headers: {}
})
.then(function (response) {
  var body = typeof response.body === "string" ? JSON.parse(response.body) : response.body;

  var articles = (body.results || []).map(function (a) {
    return {
      title: a.title,
      url: a.url,
      publishedAt: a.published_at
    };
  });

  // Если статей нет
  if (articles.length === 0) {
    return "☁️ Сегодня ничего нового";
  }

  // Формируем текст поста
  var postText = "🛰️ Статьи про космос за день:\n\n" +
    articles.map(function (a) {
      return "**" + a.title + "**\n" +
            "🔗 " + a.url + "\n" +
            "🗓 " + new Date(a.publishedAt).toUTCString();
    }).join("\n\n");

  return postText;
})
.catch(function (err) {
  return "Произошла ошибка: " + err;
});