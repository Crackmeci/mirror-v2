<?php

  require_once './db.php';
  require_once 'models/Zones.php';
  require_once 'models/Contact.php';

  require_once './router.php';

  $database = new Database();
  $db = $database->connect();
  $zones = new Zones($db);
  $contact = new Contact($db);

  if(!strpos(Router::parse_uri(),"fullscreen")){
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  }

  Router::run('/list/:id?/:id?', function ($page = 1,$limit = 20) {
     echo json_encode($GLOBALS["zones"]->readZones($page,$limit)->fetchAll(PDO::FETCH_ASSOC));
  },["page","limit"]);

  Router::run('/count/zones', function () {
    echo json_encode($GLOBALS["zones"]->countZones());
});

Router::run('/hacker/:any/:id?/:id?', function ($nick,$page = 1,$limit= 20) {
    echo json_encode($GLOBALS["zones"]->readNickZones($nick,$page,$limit)->fetchAll(PDO::FETCH_ASSOC));
},["nick","page","limit"]);

Router::run('/group/:any/:id?/:id?', function ($group,$page = 1,$limit = 20) {
    echo json_encode($GLOBALS["zones"]->readGroupZones($group,$page,$limit)->fetchAll(PDO::FETCH_ASSOC));
},["group","page","limit"]);

Router::run('/best-hackers/:id?/:id?', function ($page = 1,$limit = 20) {
    echo json_encode($GLOBALS["zones"]->topHackers($page,$limit));
},["page","limit"]);

Router::run('/best-groups/:id?/:id?', function ($page = 1,$limit = 20) {
    echo json_encode($GLOBALS["zones"]->topGroups($page,$limit));
},["page","limit"]);

Router::run('/mirror/:id', function ($id) {
    echo json_encode($GLOBALS["zones"]->readZone($id)->fetchAll(PDO::FETCH_ASSOC));
},["id"]);

Router::run('/hackerZoneCount/:any', function ($hacker) {
    $data["count"] = $GLOBALS["zones"]->hackerZoneCount($hacker);
    echo json_encode($data);
},["hacker"]);

Router::run('/groupZoneCount/:any', function ($group) {
    $data["count"] = $GLOBALS["zones"]->groupZoneCount($group);
    echo json_encode($data);
},["group"]);

Router::run('/fullscreen/:id', function ($id) {
    $data = $GLOBALS["zones"]->readZone($id)->fetch(PDO::FETCH_ASSOC);
    $code = "";
    if($data["zone_code"] == ""){
        echo "Not found";
    }else{
      ob_start();
      $code .= "<meta charset='utf-8'></meta>";
      $code .=  htmlspecialchars_decode(htmlspecialchars($data["zone_code"]));
      ob_flush();  
      echo $code;
    }
},["id"]);


Router::run('/zoneCount', function () {
    $data["count"] = $GLOBALS["zones"]->countZones();
    echo json_encode($data);
});

Router::run('/hackerCount', function () {
    $data["count"] = $GLOBALS["zones"]->hackerCount();
    echo json_encode($data);
});

Router::run('/groupCount', function () {
    $data["count"] = $GLOBALS["zones"]->groupCount();
    echo json_encode($data);
});

Router::run('/locationCount/:any', function ($location) {
    $data["count"] = $GLOBALS["zones"]->countLocation($location);
    echo json_encode($data);
},["location"]);


Router::run('/location/:any/:id?/:id?', function ($location,$page = 1,$limit = 20) {
    echo json_encode($GLOBALS["zones"]->readLocationZones($location,$page,$limit)->fetchAll(PDO::FETCH_ASSOC));
},["location","page","limit"]);

Router::run('/stats',function(){
    $data["zone_count"] = $GLOBALS["zones"]->countZones();
    $data["todayZone_count"] = count($GLOBALS["zones"]->todaysZone()->fetchAll(PDO::FETCH_ASSOC)) ;
    $data["hacker_count"] = $GLOBALS["zones"]->hackerCount();
    $data["group_count"] = $GLOBALS["zones"]->groupCount();
    $data["best_hacker"] = $GLOBALS["zones"]->topHackers()[0];
    echo json_encode($data);
});

Router::run('/todays/:id?/:id?',function($page = 1,$limit = 20){
    echo json_encode($GLOBALS["zones"]->todaysZone($page,$limit)->fetchAll(PDO::FETCH_ASSOC));
},["page","limit"]);

Router::run('/notify',function(){
    $data = $_POST["data"];
    try{
        $data = json_decode($data,true);
    }catch(TypeError $e){
        $data = $_POST["data"];
    }
    if($GLOBALS["zones"]->addZone($data)){
        $response["status_code"] = 1;
      }else{
        $response["status_code"] = 0;
    }
    echo json_encode($response);
},[],$method = 'post');

Router::run('/multinotify',function(){
    $data = $_POST["data"];
    try{
        $data = json_decode($data,true);
    }catch(TypeError $e){
        $data = $_POST["data"];
    }
    if($GLOBALS["zones"]->addMultiZones($data)){
        $response["status_code"] = 1;
      }else{
        $response["status_code"] = 0;
    }
    echo json_encode($response);
},[],$method = 'post');

Router::run('/contact/add',function(){
    $data = $_POST["data"];
    try{
        $data = json_decode($data,true);
    }catch(TypeError $e){
        $data = $_POST["data"];
    }
    if($GLOBALS["zones"]->addContact($data)){
        $response["status_code"] = 1;
      }else{
        $response["status_code"] = 0;
    }
    echo json_encode($response);
},[],$method = 'post');
?>
