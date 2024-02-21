// 뉴스를 갖고 오는 함수.
const API_KEY = `1c373cb782eb496db82d499781dfdc42`
let newsList = []

const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
    } else {
    inputArea.style.display = "inline";
    }
};

const getLatesNews = async () => {
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`); 
    const response = await fetch(url)
    const data = await response.json()
    newsList = data.articles
    render();
    console.log("dddd", newsList)
};

const render = () => {
    // 무엇을 보여줄 것인가?
    const newsHTML = newsList.map(news => `<div class="row news">
    <div class="col-lg-4">
        <img class="news-img-size"
        src="${news.urlToImage
        || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"}"
        >
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>
            ${news.description == null || news.description == ""
        ? "내용없음"
        : news.description.length > 200
        ? news.description.substring(0, 200) + "..."
        : news.description
        }
        </p>
        <div>
            ${news.source.name || "no source"} ${moment(news.published_date).fromNow()} * ${news.publishedAt}
            * ${news.author}
        </div>
    </div>
</div>`)
        .join('');
    



    // 어디에다 붙일 것인지?
    document.getElementById("news-board").innerHTML = newsHTML
}

getLatesNews();