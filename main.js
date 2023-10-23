function sendDataToFunction(data) {
  fetch("https://functions.yandexcloud.net/d4e373k1h9hg5udf01i6", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      // Обработка ответа от функции, если необходимо
    })
    .catch((error) => {
      console.error(error);
      // Обработка ошибок, если необходимо
    });
}

//первый api
const apiKey = "768e0288406389e6e0f9840659813b24";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-image i");
const weather = document.querySelector(".weather");
const errorText = document.querySelector(".error");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status != 200) {
    errorText.style.display = "block";
    weather.style.display = "none";
  } else {
    const data = await response.json();
    console.log(data);
    sendDataToFunction(data);

    

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "&#8451";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clear") {
      weatherIcon.className = "fa-solid fa-sun";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.className = "fa-solid fa-cloud-rain";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.className = "fa-solid fa-cloud-mist";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.className = "fa-solid fa-cloud-drizzle";
    }

    weather.style.display = "block";
    errorText.style.display = "none";
  }
}

searchButton.addEventListener("click", () => {
  checkWeather(searchInput.value);
  searchInput.value = "";
});

searchInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    checkWeather(searchInput.value);
    searchInput.value = "";
  }
});

//второй api
const searchInput2 = document.querySelector(".search-box2 input");
const searchButton2 = document.querySelector(".search-box2 button");
const weatherIcon2 = document.querySelector(".weather-image2 i");
const weather2 = document.querySelector(".weather2");
const errorText2 = document.querySelector(".error2");

async function checkWeather2(city) {
  
  const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '152b5931c0mshfc05152ad449c98p12c10bjsna8f15842c908',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};
const response = await fetch(url, options);



if (response.status != 200) {
  errorText2.style.display = "block";
  weather2.style.display = "none";
} else {
  const data2 = await response.json();
  console.log(data2);

  document.querySelector(".city2").innerHTML = city;
  document.querySelector(".temp2").innerHTML =
    Math.round(data2.temp) + "&#8451";
  document.querySelector(".humidity2").innerHTML = data2.humidity + "%";
  document.querySelector(".wind2").innerHTML = data2.wind_speed + " km/h";

  weather2.style.display = "block";
  errorText2.style.display = "none";

}


}

searchButton2.addEventListener("click", () => {
  checkWeather2(searchInput2.value);
  searchInput2.value = "";
});

searchInput2.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    checkWeather2(searchInput2.value);
    searchInput2.value = "";
  }
});

//третий api
const searchInput3 = document.querySelector(".search-box3 input");
const searchButton3 = document.querySelector(".search-box3 button");
const weatherIcon3 = document.querySelector(".weather-image3 i");
const weather3 = document.querySelector(".weather3");
const errorText3 = document.querySelector(".error3");

async function checkWeather3(city) {
  
  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '152b5931c0mshfc05152ad449c98p12c10bjsna8f15842c908',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};
const response = await fetch(url, options);
try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
} catch (error) {
	console.error(error);
}
    



  if (response.status != 200) {
    errorText3.style.display = "block";
    weather3.style.display = "none";
  } else {
    const data3 = await response.json();
    console.log(data3);

    document.querySelector(".city3").innerHTML = data3.location.name;
    document.querySelector(".temp3").innerHTML =
      Math.round(data3.current.temp_c) + "&#8451";
    document.querySelector(".humidity3").innerHTML = data3.current.humidity + "%";
    document.querySelector(".wind3").innerHTML = data3.current.wind_kph + " km/h";

    weather3.style.display = "block";
    errorText3.style.display = "none";

  }


}

searchButton3.addEventListener("click", () => {
  checkWeather3(searchInput3.value);
  searchInput3.value = "";
});

searchInput3.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    checkWeather3(searchInput3.value);
    searchInput3.value = "";
  }
});


async function uploadJSONToStorage(jsonData, fileName, bucketName, accessKeyId, secretAccessKey) {
  const url = `https://${bucketName}.storage.yandexcloud.net/${fileName}`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessKeyId}:${secretAccessKey}`
  };

  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: jsonData,
      headers: headers
    });

    if (response.ok) {
      console.log(`Файл ${fileName} успешно загружен в Object Storage`);
    } else {
      console.log('Произошла ошибка при загрузке файла в Object Storage');
    }
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}

// const jsonData = JSON.stringify(data);
// const fileName1 = 'api1.json';

// const jsonData2 = JSON.stringify(data2);
// const fileName2 = 'api2.json';

// const jsonData3 = JSON.stringify(data3);
// const fileName3 = 'api3.json';

const bucketName = 'my-bucket';
const accessKeyId = '768e0288406389e6e0f9840659813b24';
const secretAccessKey = 'your-secret-access-key';

// uploadJSONToStorage(jsonData1, fileName1, bucketName, accessKeyId, secretAccessKey);
// uploadJSONToStorage(jsonData2, fileName2, bucketName, accessKeyId, secretAccessKey);
// uploadJSONToStorage(jsonData3, fileName3, bucketName, accessKeyId, secretAccessKey);




/*// Export data to JSON file
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create a download link
    const link = document.createElement('a');
    link.href = url;
    link.download = 'api1.json';
    link.innerHTML = 'Download JSON';
    document.body.appendChild(link);*/