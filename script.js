var BASEURL = 'http://54.83.19.73/';
$(document).ready(function(){
    // try {
    //   $("body select").msDropDown();
    // } catch(e) {
    //   alert(e.message);
    // }
    $('#actionArea').hide();
    $('#loginForm').submit(function(event){
        event.preventDefault();
        console.log('inside submit');
        var mobileNo = $(this).find('input[type="text"]').val();
        var pin = $(this).find('input[type="password"]').val();
        $.ajax({
            url: BASEURL + "user/v1/login/",
            type: 'POST',
            data:  {
              mobileNo : mobileNo,
              pin : pin,
              hardwareId : 'HW1234567',
              requestFrom : 'web',
              responseType : 'json',
              os : 'windows'
            },
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded",
            success: function(data, textStatus, jqXHR)
            {
              console.log(data);
              if(data.resCode == '0'){
                  FB.login(function(response){
                    console.log(response);
                  },{scope: 'public_profile,email,user_friends'});
                  $('#loginForm').hide();
                  $('#result').html(data.resStr).fadeOut(1000,function(){});
                  $('#actionArea').fadeIn(500,function(){});
              }  
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
              console.log(jqXHR);
            }
        });
    });


    // You probably don't want to use globals, but this is just example code
    var fbAppId = 'replace me';
    var objectToLike = 'http://techcrunch.com/2013/02/06/facebook-launches-developers-live-video-channel-to-keep-its-developer-ecosystem-up-to-date/';

    // This check is just here to make sure you set your app ID. You don't
    // need to use it in production. 
    if (fbAppId === 'replace me') {
      console.log('Please set the fbAppId in the sample.');
    }
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '411328195674459',
        xfbml      : true,
        version    : 'v2.0'
      });
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));


    function feedBasic(){
      FB.ui(
          {
            method: 'feed'  
          },
          function(response){
            console.log(response);
          }
      );
    }
    function feedCustom(){
      FB.ui(
          {
           method: 'feed',
           name: 'The Facebook SDK for Javascript',
           caption: 'Bringing Facebook to the desktop and mobile web',
           description: (
              'A small JavaScript library that allows you to harness ' +
              'the power of Facebook, bringing the user\'s identity, ' +
              'social graph and distribution power to your site.'
           ),
           link: 'https://developers.facebook.com/docs/reference/javascript/',
           picture: 'http://www.fbrell.com/public/f8.jpg'
          },
          function(response) {
            if (response && response.post_id) {
              console.log('Post was published.');
            } else {
              console.log('Post was not published.');
            }
          }
        );
    }

    function postLike() {
      FB.api(
         'https://graph.facebook.com/me/video.watches',
         'post',
         { movie: 'http://www.youtube.com/watch?v=hWMWEhOjmFs'
         },
         function(response) {
           if (!response) {
             alert('Error occurred.');
           } else if (response.error) {
             document.getElementById('result').innerHTML =
               'Error: ' + response.error.message;
           } else {
             document.getElementById('result').innerHTML =
               '<a href=\"https://www.facebook.com/me/activity/' +
               response.id + '\">' +
               'Story created.  ID is ' +
               response.id + '</a>';
           }
         }
      );
    }

    $('#frndSearch').click(function(event){
        FB.api('/me/taggable_friends', function(response) {
          console.log(response);
          var x,tempList="";
          if(response.data){
            for(i in x=response.data){
              // tempList += '<li onclick="frnds()">'+x[i].name+' <img src="'+x[i].picture.data.url+'"></li>';
              tempList += '<option value="'+x[i].name+'" data-image="'+x[i].picture.data.url+'">'+x[i].name+'</option>';
            }
            $('#actionArea').find('button').fadeOut(1000,function(){
                // $('#actionArea').html('<ul class="frnds">'+tempList+'</ul>');//<select name="webmenu" id="webmenu">
                $('#actionArea').html('<select onchange="frnds(this)" name="webmenu" id="webmenu">'+tempList+'</select>');

                $(document).ready(function(e) {
                  try {
                    $("body select").msDropDown();
                  } catch(e) {
                    alert(e.message);
                  }
                });
            });
          }
        });
    });
});