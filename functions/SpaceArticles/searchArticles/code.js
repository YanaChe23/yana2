// Отправляем запрос, чтобы получить статьи по термину
return Http.get({
url: "https://api.spaceflightnewsapi.net/v4/articles/",
params: {
    // Передаем в API-запрос параметр query
    search: query,
    ordering: "-published_at"
},
headers: {}
})
.then(function (response) {
var body = typeof response.body === "string" ? JSON.parse(response.body) : response.body;

// Сохраняем нужные данные о статьях
var articles = (body.results || []).map(function (a) {
    return {
    title: a.title,
    summary: a.summary,
    url: a.url,
    publishedAt: a.published_at
    };
});

// Если статей нет
if (articles.length === 0) {
    return "No data";
}

return JSON.stringify(articles);
})
.catch(function (err) {
return "Error fetching articles: " + err;
});