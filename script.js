async function fetchRecommendations() {
   
    const apiUrl = 'http://api.taboola.com/1.0/json/taboola-templates/recommendations.get';
    try {
        const params = {
            'app.type': getDeviceType(), //'desktop',
            'app.apikey': 'f9040ab1b9c802857aa783c469d0e0ff7e7366e4',
            'count': 4,
            'source.type': 'video', // 
            'source.id': '214321562187',
            'source.url': 'http://www.site.com/videos/214321562187.html' //
        };

        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${apiUrl}?${queryString}`);
        const data = await response.json();
        //
        console.log(response.status);
        console.log(data);
        console.log("------------------------------",getDeviceType());
        console.log(queryString);
        displayRecommendations(data.list);
    } catch (error) {
        console.error("Error fetching recommendations:", error);
    }
}


function displayRecommendations(recommendations) {
    const container = document.getElementById("recommendations");

    recommendations.forEach(item => {
        const recommendationDiv = document.createElement("div");
        recommendationDiv.classList.add("recommendation");

        const img = document.createElement("img");
        img.src = item.thumbnail[0].url;
        recommendationDiv.appendChild(img);

        switch (item.origin) {
            case "sponsored":
                createSponsoredRecommendation(item, recommendationDiv);
                break;
            case "organic":
                createOrganicRecommendation(item, recommendationDiv);
                break;
        }        
        
        container.appendChild(recommendationDiv);
    });
}

function createSponsoredRecommendation(item, div) {
    const link = document.createElement("a");
    link.href = item.url;
    link.innerText = item.name;
    link.target = "_blank";
    div.appendChild(link);
    
    const source = document.createElement("p");
    source.innerText = `Source: ${item.branding}`;
    div.appendChild(source);
}

function createOrganicRecommendation(item, div) {
    const link = document.createElement("a");
    link.href = item.url;
    link.innerText = item.name;
    link.target =  "_self";
    div.appendChild(link);
}

function getDeviceType() {
    if (window.innerWidth <= 768) {
        return 'mobile';
    } else {
        return 'desktop';
    }
}

document.addEventListener("DOMContentLoaded", fetchRecommendations);
