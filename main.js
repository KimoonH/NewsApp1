// 뉴스를 갖고 오는 함수.
const API_KEY = `1c373cb782eb496db82d499781dfdc42`
let newsList = []
let url = `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
const menus = document.querySelectorAll(".menus button")

menus.forEach(menu=>menu.addEventListener("click", (event)=>getNewsByCategory(event)))

// 사이드 바
const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
};

// 검색창

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
    } else {
    inputArea.style.display = "inline";
    }
};

// 중복되는거
const getNews = async () => {
    const response = await fetch(url)
    const data = await response.json()
    newsList = data.articles
    render();
}

// 검색 키워드
const getNewsByKeyword = async () => {
    const keyword = document.getElementById("serach-input").value;
    url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`);
    getNews();

};


const getLatesNews = async () => {
    url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`); 
    getNews();
};

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`);
    
    getNews();
}

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

// 1. 버튼들의 클릭 이벤트를 만들어준다.
// 2. 카테고리별 뉴스 가져오기
// 3. 그 뉴스를 보여주기.

