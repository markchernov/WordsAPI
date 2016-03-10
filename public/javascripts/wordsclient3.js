window.addEventListener("load", function () {



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



                var uri = "/wordsapi/v3/search/" + abbrev;
                
                var params = []; // Empty array for optional URI parameters
                
                var thresh = searchField.dataset.threshold;
                if (thresh && Number(thresh) > 0) {
                    params.push("threshold=" + Number(thresh)); //Add to array
                }
                
                var caseSens = document.getElementById("caseSearch").checked;
                if (caseSens) {
                    params.push("caseSensitive=true"); //Add to array
                }
                
                // No more optional parameters to add.
                if (params.length) { //Do we have any optional parameters?
                    uri += "?" + params.join("&"); //Concatenate with &s, append after ?
                }
                xhr.open("GET", uri);
                xhr.responseType = 'json';
                xhr.send();
                
            }); //Word search keyup callback
    
    }); // end of event listener
