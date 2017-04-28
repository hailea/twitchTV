(function () {
    var $all = $("#allChannels"); 
    var $online = $("#onlineChannels");
    var $offline = $("#offlineChannels");
    var $can = $("#channelContainers");
    var $chName = ["ESL_SC2", "MedryBW", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
    var $logos = ["logo11", "logo21", "logo31", "logo41", "logo51", "logo61", "logo71", "logo81", "logo91",];
    var mainVessel="", onlineVessel = "", offlineVessel = "", channelName = "",logo="";
    // var $url = "https://wind-bow.gomix.me/twitch-api";/*use according to twitch api documentation https://dev.twitch.tv/docs */
    var $url = "includes/data/twtv.json";
   // var $url = "https://gist.github.com/QuincyLarson/2ff6892f948d0b7118a99264fd9c1ce8.js";
    
    var $err = $("#errMsg");
    $.ajax({
        type:"GET",
        url: $url,
        data: "json",
        success: function (data) {
            console.log("success!!!");
        }
    })
        .done(function (data) {
            retrieveData();
            $all.on("click", retrieveData);
            function retrieveData() {
                $can.html("");
                mainVessel = ""; onlineVessel = ""; offlineVessel = "";
                console.log(data);
                for (var j = 0; j < data.length-1; j++) {
                    if (data[j].stream == null) {
                        var logoLink = "https://haileababrha.files.wordpress.com/2017/04/logo71.jpg";
                        var link = data[j]._links.self;
                        channelName = data[j].display_name;
                        var imgLogo = " <img src='" + logoLink + "' alt='" + channelName + "' class='logoStyle' />";
                        var contentWithLink = "<a href=" + link + ">"+channelName+"</a>";
                        offlineVessel += "<div  class='offlineStyle'><span>" + imgLogo + contentWithLink + "</span><span class='statusText'>offline</span></div>";
                    } else {
                        var logoLink = data[j].stream.logo;
                        var channelLink = data[j].stream.url;
                        var info = data[j].stream.status;
                        channelName = data[j].stream.display_name;
                        var imgLogo =" <img src='"+ logoLink + "' alt='" + channelName + "' class='logoStyle' />";
                        var contentWithLink = '<a href="' + channelLink + '" target="_blank">' + channelName + '</a>';
                        onlineVessel += "<div  class='onlineStyle'><span>" + imgLogo + contentWithLink + "<label class='statusText'>online</label>" + "</span><h5>" + info + "</h5>" + "</div>";

                    }
                }
                for (var i = 0; i < $chName.length; i++) {
                    var myGithub = "https://github.com/hailea/twitchTV";
                    var mainURL = "https://haileababrha.files.wordpress.com/2017/04/" + $logos[i] + ".jpg";
                    var imgLogo = " <img src='" + mainURL + "' alt='" + $chName[i] + "' class='logoStyle' />";
                    var contentWithLink = '<a href="' + myGithub + '" target="_blank">' + $chName[i] + '</a>';
                    mainVessel += "<div  class='offlineStyle'><span>" + imgLogo + contentWithLink + "</span><span class='statusText'>offline</span>" + "</div>";
                }
                $can.html(mainVessel); console.log(logo);
            }/* a click event that displays only online channels*/
            $online.on("click", function () {
                $can.html("");
                $can.html(onlineVessel);
            });/* a click event that displays only offline channels*/
            $offline.on("click", function () {
                $can.html("");
                $can.html(offlineVessel);

            });
            console.log("data is here!!!");
        })
        .fail(function (error, status, jqXHR) {
            console.log("Error: " + error + " Status: " + status + " jqXHR: " + jqXHR);
        })
        .always(function () {
            console.log("anyways i am running");
        });
    
}());