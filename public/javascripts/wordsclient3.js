window.addEventListener("load", function () {



    var searchField = document.getElementById("searchWord");
    var searchList = document.getElementById("wordlist");

    // function to populate options

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
        if (thresh && Number(thresh) > 4) {
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




    // function call GET by id route onclick





    searchField.addEventListener("click", function (evt) {

        console.log(evt);

        searchField.value = searchList.options[searchList.selectedIndex].label;





        var wordId = searchList.options[searchList.selectedIndex].value;

        console.log(wordId);

        var abbrev = searchWord.value;
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {



                var h2 = document.createElement("h2");


                h2.setAttribute("id", "h2")




                var myResponse = xhr.response;

                console.log(myResponse);


                var id = myResponse[0].id;
                var word = myResponse[0].word;



                console.log(id);

                console.log(word);

                //h2 = document.getElementById("h2");

                console.log(h2);

                h2.innerHTML = "  Id: " + id + "  Word: " + word + " ";


                //document.body.appendChild(h2);

                document.body.insertBefore(h2, document.getElementById("wordsearch"));


                var deleteButton = document.createElement("button");


                deleteButton.setAttribute("id", "deleteButton");

                deleteButton.innerHTML = " Delete word";

                //document.body.appendChild(deleteButton);

                document.body.insertBefore(deleteButton, document.getElementById("wordsearch"));



                deleteButton.addEventListener("click", deleteFunction); //add onclick for delete
                
                
                
                
                
                var updateButton = document.createElement("button");


                updateButton.setAttribute("id", "updateButton");

                updateButton.innerHTML = " Update word";

                //document.body.appendChild(deleteButton);

                document.body.insertBefore(updateButton, document.getElementById("wordsearch"));



                updateButton.addEventListener("click", updateFunction); //add onclick for update

                
                
                var createButton = document.createElement("button");


                createButton.setAttribute("id", "createButton");

                createButton.innerHTML = " Create word";

                //document.body.appendChild(deleteButton);

                document.body.insertBefore(createButton, document.getElementById("wordsearch"));



                updateButton.addEventListener("click", createFunction); //add onclick for update

                
                
                
                
                
                
                
                

            }
        }



        var uri = "/wordsapi/v3/dictionary/" + wordId;


       /* var thresh = searchField.dataset.threshold;
        if (thresh && Number(thresh) > 4) {
            params.push("threshold=" + Number(thresh)); //Add to array
        }

        var caseSens = document.getElementById("caseSearch").checked;
        if (caseSens) {
            params.push("caseSensitive=true"); //Add to array
        }
*/

        xhr.open("GET", uri);
        xhr.responseType = 'json';
        xhr.send();

    }); //Id search keyup callback









    // function call DELETE by id route onclick





    var deleteFunction = function (evt) {

        console.log(evt);

        searchField.value = searchList.options[searchList.selectedIndex].label;

        var wordId = searchList.options[searchList.selectedIndex].value;

        console.log(wordId);

        var abbrev = searchWord.value;
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {






                var h2 = document.getElementById("h2");

                console.log(h2);


                var myResponse = xhr.response;

                console.log(myResponse);


                var id = myResponse.id;
                var confirmation = myResponse.confirmation;


                console.log(id);

                console.log(confirmation);


                h2.innerHTML = "  Id: " + id + "  Word: " + confirmation + " ";







            }
        }



        var uri = "/wordsapi/v3/dictionary/" + wordId;


        /*var thresh = searchField.dataset.threshold;
        if (thresh && Number(thresh) > 4) {
            params.push("threshold=" + Number(thresh)); //Add to array
        }

        var caseSens = document.getElementById("caseSearch").checked;
        if (caseSens) {
            params.push("caseSensitive=true"); //Add to array
        }*/


        xhr.open("DELETE", uri);
        xhr.responseType = 'json';
        xhr.send();

    }; //Id delete keyup callback




    
    // function call PUT by id route onclick
    
    
    
    var updateFunction = function (evt) {

        console.log(evt);

        

        var wordId = 14445;

        console.log(wordId);
        
        

        var newword = searchField.value;
        
        
        console.log(newword);
        
        
        var xhr = new XMLHttpRequest();
        
        
        
        
        var newWordObject = {"id" : wordId , "word" : newword};
        
        
        var jsonString = JSON.stringify(newWordObject);
        
        console.log("This is my JSON String" + jsonString);
        
       
       

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {






                var h2 = document.getElementById("h2");

                console.log(h2);


                var myResponse = xhr.response;

                console.log(myResponse);


                var id = myResponse.id;
                var confirmation = myResponse.confirmation;


                console.log(id);

                console.log(confirmation);


                h2.innerHTML = "  Id: " + id + "  Word: " + confirmation + " ";







            }
        }



        var uri = "/wordsapi/v3/dictionary/" + wordId;


        /*var thresh = searchField.dataset.threshold;
        if (thresh && Number(thresh) > 4) {
            params.push("threshold=" + Number(thresh)); //Add to array
        }

        var caseSens = document.getElementById("caseSearch").checked;
        if (caseSens) {
            params.push("caseSensitive=true"); //Add to array
        }
*/

        xhr.open("PUT", uri);
        xhr.responseType = 'json';
        
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(jsonString);

    }; //Id put keyup callback

    
    
    
    
    
    
    
    var createFunction = function (evt) {

        console.log(evt);

        

        var wordId = 14445;

        console.log(wordId);
        
        

        var newword = searchField.value;
        
        
        console.log(newword);
        
        
        var xhr = new XMLHttpRequest();
        
        
        
        
        var newWordObject = {"id" : wordId , "word" : newword};
        
        
        var jsonString = JSON.stringify(newWordObject);
        
        console.log("This is my JSON String" + jsonString);
        
       
       

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {






                var h2 = document.getElementById("h2");

                console.log(h2);


                var myResponse = xhr.response;

                console.log(myResponse);


                var id = myResponse.id;
                var confirmation = myResponse.confirmation;


                console.log(id);

                console.log(confirmation);


                h2.innerHTML = "  Id: " + id + "  Word: " + confirmation + " ";







            }
        }



        var uri = "/wordsapi/v3/dictionary/" + wordId;


        /*var thresh = searchField.dataset.threshold;
        if (thresh && Number(thresh) > 4) {
            params.push("threshold=" + Number(thresh)); //Add to array
        }

        var caseSens = document.getElementById("caseSearch").checked;
        if (caseSens) {
            params.push("caseSensitive=true"); //Add to array
        }
*/

        xhr.open("PUT", uri);
        xhr.responseType = 'json';
        
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(jsonString);

    }; //Id delete keyup callback
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    




    // function to clear button and header




    var clearButtonsFunction = function() {};




    // function to grab word from option and display in choose text field


    searchList.addEventListener("change", function () {
        searchField.value = searchList.options[searchList.selectedIndex].label;
    });




}); // end of event listener
