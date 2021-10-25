<?php
    try{
        $ip = $_GET['ip'];
        echo $_SERVER["REMOTE_ADDR"];
    }catch(Exception $error){
        echo "Exception";
    }catch(OutOfBoundsException $error){
        echo "Out of bounds exception";
    }catch(LogicException $error){
        echo "Logic Exception";
    }
            
    $data = $_GET["ipInfo"];
    echo $data;
    $theInfo = fopen("GatherInformation.txt", "w");
    fwrite($theInfo, $data);
    fclose($theInfo);

    $username = $_REQUEST["username"];
    $password = $_REQUEST["password"];
    if (empty($username))
    {
        echo "Username is empty";
    }else if(empty($password))
    {
        echo "Password is empty";
    }
    else {
        echo $username." ".$password;
    }
?>
