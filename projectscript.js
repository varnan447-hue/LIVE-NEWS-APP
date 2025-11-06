const newsContainer = document.getElementById("news-container");
const categorySelect = document.getElementById("category");
const countrySelect = document.getElementById("country");
const languageSelect = document.getElementById("language");

const API_KEY = "pub_44c90f9f57254ebcaeaac92cbba3698e"; 

async function fetchNews(category = "top", country = "in", language = "en") {
  newsContainer.innerHTML = "<p>Loading news...</p>";

  const realUrl = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=${country}&language=${language}&category=${category}`;
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(realUrl)}`;

  try {
    const response = await fetch(proxyUrl);
    const raw = await response.json();
    const data = JSON.parse(raw.contents);

    if (data.results && data.results.length > 0) {
      newsContainer.innerHTML = "";
      data.results.forEach(article => {
        const div = document.createElement("div");
        div.className = "article";
        div.innerHTML = `
          <img src="${article.image_url || 'https://via.placeholder.com/400x200?text=No+Image'}" alt="">
          <div class="article-content">
            <h3>${article.title}</h3>
            <p>${article.description ? article.description.slice(0, 100) + '...' : 'No description available.'}</p>
            <a href="${article.link}" target="_blank">Read More →</a>
          </div>
        `;
        newsContainer.appendChild(div);
      });
    } else {
      newsContainer.innerHTML = "<p>No news found for this selection.</p>";
    }
  } catch (error) {
    newsContainer.innerHTML = "<p>⚠️ Failed to fetch news. Please try again later.</p>";
    console.error(error);
  }
}

// Load default
fetchNews();

// Update news when filters change
[categorySelect, countrySelect, languageSelect].forEach(select => {
  select.addEventListener("change", () => {
    const category = categorySelect.value;
    const country = countrySelect.value;
    const language = languageSelect.value;
    fetchNews(category, country, language);
  });
});
