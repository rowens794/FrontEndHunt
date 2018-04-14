//temporary username/password combinations
users = ["Sarah", "Alexis", "Gail", "Andrea", "Josh", "Ryan"];
passwords = ["hunt", "hunt", "hunt", "hunt", "hunt", "hunt"];
clueIdTags = ["#clue1", "#clue2", "#clue3", "#clue4", "#clue5", "#clue6", "#clue7", "#clue8"];
var currentUser = "";
var currentClue = 0;


//clue structure: outer array:  each of the clues sequentially
//                  inner array [short clue, long clue, x coord, ycoord, imageURL ]                              
clues = [
    //clue #1
    [   ["A Parked Horse"], 
        ["In a park there sits a man atop a stallion, he faught a war for the northern battalion."],
        [38.351356],
        [-81.633093],
        []],
    //clue #2
    [   ["A Tickled Soldier"], 
        ["A little tickle doesn't hurt, in fact it makes me want to squirt"],
        [38.351356],
        [-81.633093],
        []],
    //clue #3
    [   ["10 Cans of Beans"], 
        ["In a park there sits a man atop a stallion, he faught a war for the northern battalion."],
        [38.351356],
        [-81.633093],
        []],
]

//initialize gps variables
var xCord = "";
var yCord = "";


//designated action when Mark Location is clicked------------------------------
$("#markLocation").click(function() {
    var gpsHTMLElement = document.getElementById("GPSWarning");
    
    if (!navigator.geolocation){
        console.log("Didn't Work");
        return;
      }

    function testCoordinates(x, y){
        trueX = clues[currentClue][2]; //pulls actual x coordinate from clue array
        trueY = clues[currentClue][3]; //pulls actual y coordinate from clue array
        xTrue = false; //sets both x and y text coordinates to false
        yTrue = false;
        var marginOfError = .000884 //roughly 100ft of error allowance

        if ( Math.abs(trueX - x) < marginOfError ){
            if (Math.abs(trueY - y)< marginOfError){
                console.log("You found the location!");
                gpsHTMLElement.innerHTML = "You've Found Clue#" + (currentClue + 1);
                currentClue += 1;
                updateClueMenu();

            }
            else{
                console.log("you are not in the correct location");
                gpsHTMLElement.innerHTML = "You're off the mark";
            }
            
        } 
        else{
            console.log("You're off the mark");
            gpsHTMLElement.innerHTML = "You're off the mark";
        }
    }
    

    function success(position) {
        var xCord  = position.coords.latitude;
        var yCord = position.coords.longitude;

        testCoordinates(xCord, yCord);

        setTimeout(function() {
            gpsHTMLElement.innerHTML = "";
            $("#GPSWarning").removeClass("GPSBox");
          }, 3000);

    }
    
    function error() {
        gpsHTMLElement.innerHTML = "You must share your location to play";
        
        setTimeout(function() {
            gpsHTMLElement.innerHTML = "";
            $("#GPSWarning").removeClass("GPSBox");
          }, 3000);
    }
    
    gpsHTMLElement.innerHTML = "<p>COLLECTING GPS COORDINATES...</p>"; //message displayed while collecting gps info
    $("#GPSWarning").addClass("GPSBox");
    navigator.geolocation.getCurrentPosition(success, error); //function run to collect and test coords
  });
// END ** designated action when Mark Location is clicked------------------------------




//designated action when loginButton is clicked------------------------------
$("#loginButton").click(function() {
    username = $('#userName').val();  //$("#userName").innerHTML;  this needs corrected
    password = $('#inputPassword').val()   //$("#inputPassword").innerHTML;

    if (users.indexOf(username) != -1){
        console.log("password success");
        userPassword = passwords[users.indexOf(username)];
        if (password == userPassword){
            currentUser = username; //save user's name to input on welcome page
            $("#loginWrapper").addClass("hidden");  //hide login screen
            $("#dashboard").removeClass("hidden");
            $("#welcomeText").text("Welcome " + currentUser);
        }
        else{
            console.log("here password fails");
            $("#badUserPassword").text("username or password incorrect");
        }
    }
    

  });
// END ** designated action when login button is clicked------------------------------

// update clue menu items

function updateClueMenu(){
    console.log("updating application page");
    console.log($(clueIdTags[currentClue]).text() + clues[currentClue][0]);
    $(clueIdTags[currentClue-1]).addClass("oldClue"); //add strike through to found clue
    $(clueIdTags[currentClue]).removeClass("notFound"); //removes darkened text
    $(clueIdTags[currentClue]).text($(clueIdTags[currentClue]).text() + ": " + clues[currentClue][0]); //adds short clue text
    $(clueLarge).text(clues[currentClue][1]);
}