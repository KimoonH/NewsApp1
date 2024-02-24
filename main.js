// 뉴스를 갖고 오는 함수.
//const API_KEY = `1c373cb782eb496db82d499781dfdc42`
let newsList = []
let url = `https://precious-begonia-48742e.netlify.app/top-headlines?country=kr`
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


let totalResults = 0; // 왜하는거지? 데이터를 받기 위해서 하는건데
let page = 1;
const pageSize = 10; // 고정값으로
const groupSize = 5; // 고정값으로

// 중복되는거
const getNews = async () => {
    //에러 핸들링 try-catch
    try {

        url.searchParams.set("page", page); // => $page = page
        url.searchParams.set("pageSize", pageSize);

        const response = await fetch(url)
        const data = await response.json()
        if (response.status === 200) {
            // 검색해도 안나옴.
            if (data.articles.length === 0) {
                throw new Error("No result for this search")
            }
            newsList = data.articles;
            paginationRender()
            render();
        } else {
            throw new Error(data.message)
        }
    } catch (error) {
        errorRender(error.message)
    }
    

};

// 검색 키워드
const getNewsByKeyword = async () => {
    const keyword = document.getElementById("serach-input").value;
    url = new URL(`https://precious-begonia-48742e.netlify.app/top-headlines?country=kr&q=${keyword}`);
    getNews();

};


const getLatesNews = async () => {
    url = new URL(`https://precious-begonia-48742e.netlify.app/top-headlines?country=kr`); 
    getNews();
};

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    url = new URL(`https://precious-begonia-48742e.netlify.app/top-headlines?country=kr&category=${category}`);
    
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
            ${news.source.name || "no source"} ${moment(news.published_date).fromNow()} * ${moment(news.publishedAt).fromNow()}
            * ${news.author}
        </div>
    </div>
</div>`)
        .join('');
    

    // 어디에다 붙일 것인지?
    document.getElementById("news-board").innerHTML = newsHTML
}

const errorRender = (errorMessage) => {
    const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
    </div>`

    document.getElementById("news-board").innerHTML = errorHTML
};

// 페이지네이션

const paginationRender = () => {
    let paginationHTML = ``;
    const totalPages = Math.ceil(totalResults / pageSize);
    // pageGroup
    const pageGroup = Math.ceil(page / groupSize);
    // lastPage
    let lastPage = pageGroup * groupSize;
    // 마지막 페이지그룹이 그룹사이즈보다 작다? 마지막 페이지 = 토탈 페이지로
    if (lastPage > totalPages) {
        lastPage = totalPages;
    }

    // firstPage
    let firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);
    
    paginationHTML = `<li class="page-item" onclick="pageClick(1)">
        <a class="page-link" href='#js-bottom'>&lt;&lt;</a>
    </li>
    <li class="page-item" onclick="pageClick(${page - 1})">
        <a class="page-link" href='#js-bottom'>&lt;</a>
    </li>`;

    


    for (let i = firstPage; i <= lastPage; i++) {
        paginationHTML += `<li class="page-item ${i == page ? "active" : ""}" >
        <a class="page-link" href='#js-bottom' id='page-${i}' onclick="pageClick(${i})">${i}</a>
    </li>`

    }


    paginationHTML += `<<li class="page-item" onclick="pageClick(${page + 1})">
    <a  class="page-link" href='#js-program-detail-bottom'>&gt;</a>
    </li>
    <li class="page-item" onclick="pageClick(${totalPages})">
    <a class="page-link" href='#js-bottom'>&gt;&gt;</a>
    </li>`;

    
    document.querySelector(".pagination").innerHTML = paginationHTML
};

const moveToPage = (pageNum) => {
    console.log("movetopage", pageNum)
    page = pageNum
    getNews()
}


getLatesNews();

// 1. 버튼들의 클릭 이벤트를 만들어준다.
// 2. 카테고리별 뉴스 가져오기
// 3. 그 뉴스를 보여주기.

