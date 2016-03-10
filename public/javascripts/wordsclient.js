window.addEventListener("load", function () {



    var countField = document.getElementById("countWord");
    var countDisplay = document.getElementById("displayCount");




    //    count function  first form

    countField.addEventListener("keyup", function (evt) {

        var abbrev = countField.value;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {

            if (xhr.readyState == 4 && xhr.status == 200) {


                //var resp = JSON.parse(xhr.responseText);

                var resp = xhr.response;

                //countDisplay.innerHTML = "<li>" + resp.count + " words match "
                //+ resp.abbrev + "</li>";


                countDisplay.innerHTML = "";

                for (var i = 0; i < resp.length; i++) {
                    var item = document.createElement("li");
                    item.innerHTML = resp[i].count + " words match " + resp[i].abbrev;
                    countDisplay.appendChild(item);
                }




            }
        }




        var uri = "/wordsapi/v2/count/" + abbrev + "?caseSensitive=";






        xhr.open("GET", uri);

        xhr.responseType = 'json';


        xhr.send();
    });









    //    search function  second form  




    var searchField = document.getElementById("searchWord");
    var searchList = document.getElementById("wordlist");








    searchField.addEventListener("keyup", function (evt) {
        var abbrev = searchField.value;
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                searchList.innerHTML = "";
                for (var i = 0; i < xhr.response.length; i++) {
                    var opt = document.createElement("option");
                    opt.value = xhr.response[i].id;
                    opt.label = xhr.response[i].word;
                    opt.innerHTML = xhr.response[i].word;

                    searchList.appendChild(opt);
                }
            }
        }
        var uri = "/wordsapi/v2/search/" + abbrev;

        var thresh = searchField.dataset.threshold;

        if (thresh && Number(thresh) > 0) {
            uri += "?threshold=" + Number(thresh);
        }







       


        xhr.open("GET", uri);
        xhr.responseType = 'json';

        xhr.send();
    }); //Word search keyup callback





    //    populate function  drop down form  



    searchList.addEventListener("change", function () {
        searchField.value = searchList.options[searchList.selectedIndex].label;
    });



}); //  close the onload function
