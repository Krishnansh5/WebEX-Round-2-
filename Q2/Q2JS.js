async function getData(url) {
    const response = await fetch(url);
    const responseText = await response.json();
    return responseText;
}

function LoadData() {
    var UL_PlanetData = document.getElementById("PlanetData");

    getData('https://swapi.dev/api/planets/1/').then((data) => {
        for (DataKey in data) {
            // in case DataKey=residents/films form a nested list of urls 
            if (DataKey == "residents") {
                // create and append li element
                var Li = document.createElement("li")
                Li.innerHTML = "<p class='key'>" + String(DataKey) + "</p>"
                UL_PlanetData.appendChild(Li);
                // make a sublist of residents
                var UL_Res = document.createElement("ul");
                Li.appendChild(UL_Res);

                // async func to get names of residents and print while rest of page loads
                async function printResidents() {
                    for (Resident_url of data.residents) {
                        var Res_Li = document.createElement("li");
                        await getData(Resident_url).then((Resdata) => {
                            return Resdata.name;
                        }).then((ResidentName) => {
                            Res_Li.innerHTML = "<a class='urls' href='" + Resident_url + "'>" + ResidentName + "</a>";
                            UL_Res.appendChild(Res_Li);
                        })
                    }
                }
                printResidents();
            }
            else if (DataKey == "films") {
                // create and append li element
                var Li = document.createElement("li")
                Li.innerHTML = "<p class='key'>" + String(DataKey) + "</p>"
                UL_PlanetData.appendChild(Li);
                 // make a sublist of films
                var UL_Films = document.createElement("ul");
                Li.appendChild(UL_Films);

                // async func to get film names and print while rest of page loads
                async function printFilms() {
                    for (filmUrl of data.films) {
                        var Film_Li = document.createElement("li");
                        await getData(filmUrl).then((Filmdata) => {
                            return Filmdata.title;
                        }).then((FilmName) => {
                            Film_Li.innerHTML = "<a class='urls' href='" + filmUrl + "'>" + FilmName + "</a>";
                            UL_Films.appendChild(Film_Li);
                        })
                    }
                }
                printFilms();
            }
            else if (DataKey == "url") {
                let Li = document.createElement("li");
                Li.innerHTML = "<p class='key'>" + String(DataKey) + "  :  </p><a class='urls' href='" + data[DataKey] + "'>Link to the JSON file</a>";
                UL_PlanetData.appendChild(Li);
            }
            else {
                let Li = document.createElement("li");
                Li.innerHTML = "<p class='key'>" + String(DataKey) + " : </p>" + "<p class='value'>" + data[DataKey] + "</p>";
                UL_PlanetData.appendChild(Li);
            }

        }
    })
}
