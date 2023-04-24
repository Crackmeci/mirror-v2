<?php 
    class Zones{
        private $conn;
        public function __construct($db)
        {   
            $this->conn = $db;
        }


        public function htmlclean($text){  
            $text = preg_replace("'<script[^>]*>.*?</script>'si", '', $text );  
            $text = preg_replace('/<a\s+.*?href="([^"]+)"[^>]*>([^<]+)<\/a>/is', '\2 (\1)',$text );  
            $text = preg_replace( '/<!--.+?-->/', '', $text );  
            $text = preg_replace( '/{.+?}/', '', $text );  
            $text = preg_replace( '/&nbsp;/', ' ', $text );  
            $text = preg_replace( '/&amp;/', ' ', $text );  
            $text = preg_replace( '/&quot;/', ' ', $text );  
            $text = strip_tags($text);  
            $text = htmlspecialchars($text);  
            return $text;  
        }


        public function getCode($url){
            $useragent = "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z‡ Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
        
            $ct = curl_init();
            
            curl_setopt_array($ct, Array(
                CURLOPT_URL => $url,
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_HTTPHEADER => array("X-Requested-With: XMLHttpRequest"),
                CURLOPT_REFERER => $url,
                CURLOPT_USERAGENT =>  $useragent,
                CURLOPT_HEADER => false,
                CURLOPT_POST => true,
                CURLOPT_POSTFIELDS => 'schn=csrf'
            ));
            
            $html = curl_exec($ct);
            
            curl_close($ct);

            $context = stream_context_create(
                array(
                    "http" => array(
                        "header" => "User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36"
                    )
                )
            );

            
            $htmlfile =  @file_get_contents($url,false,$context);

            if(strlen($htmlfile) > strlen($html)){
                return $htmlfile;
            }
            return $html;
        }

        public function readZones($page=1,$limit = 20){
            $start = ($page * $limit) - $limit;        

            $stmt = $this->conn->prepare("SELECT * FROM zones order by zone_id desc LIMIT ?,?");
            $stmt->execute([$start,$limit]);
            return $stmt;
        }

        public function hackerCount(){
            $stmt = $this->conn->prepare("SELECT * FROM hackers");
            $stmt->execute();
            return $stmt->rowCount();
        }

        public function todaysZone($page = 1,$limit = 20){
            $start = ($page * $limit) - $limit;     
            $date = Date("Y-m-d");
            $stmt = $this->conn->prepare("SELECT * FROM `zones` where zone_date LIKE '%$date%' order by zone_id desc LIMIT ?,?");
            $stmt->execute([$start,$limit]);

            return $stmt;
        }

        public function groupCount(){
            $stmt = $this->conn->prepare("SELECT * FROM groups");
            $stmt->execute();
            return $stmt->rowCount();
        }

        public function readLocationZones($location,$page=1,$limit = 20){
            $start = ($page * $limit) - $limit;
            $stmt = $this->conn->prepare("SELECT * FROM zones where zone_countryCode=? order by zone_date desc,zone_id desc LIMIT ?,?");
            $stmt->execute([$location,$start,$limit]); 
            return $stmt;
        }

        public function countLocation($location){
            $stmt = $this->conn->prepare("SELECT * FROM zones where zone_countryCode=?");
            $stmt->execute([$location]);
            return $stmt->rowCount();
        }


        public function readGroupZones($group,$page=1,$limit = 20){
            $start = ($page * $limit) - $limit;
            $stmt = $this->conn->prepare("SELECT * FROM zones where zone_group=? order by zone_date desc,zone_id desc LIMIT ?,?");
            $stmt->execute([$group,$start,$limit]); 
            return $stmt;
        }

        public function groupZoneCount($group){
            $stmt = $this->conn->prepare("SELECT * From zones where zone_group=?");
            $stmt->execute([$group]);
        
            return $stmt->rowCount();
         }

         public function hackerZoneCount($nick){
            $stmt = $this->conn->prepare("SELECT * From zones where zone_nick=?");
            $stmt->execute([$nick]);
        
            return $stmt->rowCount();
         }

        public function sortArrays($Array, $SortBy=array(), $Sort = SORT_REGULAR) {
            if (is_array($Array) && count($Array) > 0 && !empty($SortBy)) {
                    $Map = array();                     
                    foreach ($Array as $Key => $Val) {
                        $Sort_key = '';                         
                                        foreach ($SortBy as $Key_key) {
                                                $Sort_key .= $Val[$Key_key];
                                        }                
                        $Map[$Key] = $Sort_key;
                    }
                    asort($Map, $Sort);
                    $Sorted = array();
                    foreach ($Map as $Key => $Val) {
                        $Sorted[] = $Array[$Key];
                    }
                    return array_reverse($Sorted);
            }
            return $Array;
        }

        public function rootUrl($url) {
            $urlParts = preg_split('#(?<!/)/(?!/)#', $url, 2);
            return $urlParts[0] != '' ? $urlParts[0] . '/' : '';
          }

        public function topGroups($page=1,$max = 20){
            $limit = $page * $max;
            $start = ($page * $max) - $max;  
            $stmt = $this->conn->query("SELECT * From groups");
            $groups = [];
            $i = 0;
        
            foreach($stmt as $group){
                $groups[$i] = ["group_name"=>$group["group_name"],"zone_count"=>$this->groupZoneCount($group["group_name"])];
                $i++;
            }
            
            $groups = $this->sortArrays($groups, array('zone_count'));
            $groups = array_slice($groups,$start,$limit);
        
            return $groups;
         }

         public function topHackers($page = 1,$max = 20){
            $limit = $page * $max;
            $start = ($page * $max) - $max;  
            $stmt = $this->conn->query("SELECT * From hackers");
            $hackers = [];
            $i = 0;
        
            foreach($stmt as $hacker){
                $hackers[$i] = ["hacker_name"=>$hacker["hacker_nick"],"zone_count"=>$this->hackerZoneCount($hacker["hacker_nick"])];
                $i++;
            }
            
            $hackers = $this->sortArrays($hackers, array('zone_count'));
            $hackers = array_slice($hackers,$start,$limit);
        
            return $hackers;
         }

        public function readNickZones($nick = "",$page=1,$limit = 20){
            $start = ($page * $limit) - $limit;       
            $stmt = $this->conn->prepare("SELECT * FROM zones where zone_nick=? order by zone_date desc,zone_id desc LIMIT ?,?");
            $stmt->execute([$nick,$start,$limit]);
            return $stmt;
        }

        public function readZone($id){
            $stmt = $this->conn->prepare("SELECT * FROM zones where zone_id=?");
            $stmt->execute([$id]);
            return $stmt;
        }

        public function addZone($zone = []){
            if(!is_array($zone)){return 0;}
            $zone = array_map("trim",$zone);
            $zone = array_map([$this,"htmlclean"],$zone);
            if(!array_key_exists("zone_nick",$zone)) {return 0;}
            if(!array_key_exists("zone_group",$zone)) {return 0;}
            if(!array_key_exists("zone_url",$zone)) {return 0;}

            $url = $zone["zone_url"];
            if (filter_var($url, FILTER_VALIDATE_URL) === FALSE) { return 0; }
            $nick = $zone["zone_nick"];
            $group = $zone["zone_group"];
            $code = $this->getCode($url);
            if($code == "" || $code == null) { return 0; }
            $date =  Date("Y-m-d H:i:s");
            if($nick == "" || $group == ""){ return 0; }
            if(!$this->checkNick($nick)) { if(!$this->addNick($nick)){ return 0; } }
            if(!$this->checkGroup($group)) { if(!$this->addGroup($group)){ return 0; } }
            $pattern = '/(https?:\/\/)/i';
            $ip = $url;
            $ip = preg_replace($pattern,"",$ip);
            $ip = $this->rootUrl($ip);
            $ip = trim($ip,"/");
            $serverIp = gethostbyname($ip);
            $ip = $this->ip_info($serverIp,"Location");
            if($ip != null){
                $country = $ip["country"] != "" ? $ip["country"] : "Unknown";
                $countryCode = $ip["country_code"] != "" ? $ip["country_code"] : "UNK";
            }else{
                $country = "Unknown";
                $countryCode = "UNK";
            }
            $stmt = $this->conn->prepare("INSERT INTO zones SET zone_nick=?,zone_group=?,zone_url=?,zone_country=?,zone_serverIp=?,zone_countryCode=?,zone_date=?,zone_code=?");
            if($stmt->execute([$nick,$group,$url,$country,$serverIp,$countryCode,$date,$code])) { return 1;}
            return 0;
        }

        public function addMultiZones($zone = []){
            if(!is_array($zone)){return 0;}
            if(!array_key_exists("zone_nick",$zone)) {return 0;}
            if(!array_key_exists("zone_group",$zone)) {return 0;}
            if(!array_key_exists("zone_urls",$zone)) {return 0;}
            $zone["zone_nick"] = $this->htmlclean(trim($zone["zone_nick"]));
            $zone["zone_group"] = $this->htmlclean(trim($zone["zone_group"]));
            $zone["zone_urls"] = array_map("trim",$zone["zone_urls"]);
            $zone["zone_urls"] = array_map([$this,"htmlclean"],$zone["zone_urls"]);
            $urls = $zone["zone_urls"];
            $urls = array_map("trim",$zone["zone_urls"]);
            $nick = $zone["zone_nick"];
            $group = $zone["zone_group"];
            if($group == "" || $nick == "") {return 0;}
            if(!$this->checkNick($nick)) { if(!$this->addNick($nick)){ return 0; } }
            if(!$this->checkGroup($group)) { if(!$this->addGroup($group)){ return 0; } }
            $zoneCount = count($urls);
            $current = 0;

            foreach($urls as $url){
                if (filter_var($url, FILTER_VALIDATE_URL) === FALSE) { return 0; }
                $code = $this->getCode($url);
                if($code == "" || $code == null) { return 0; }
                $date =  Date("Y-m-d H:i:s");
                
                $pattern = '/(https?:\/\/)/i';
                $ip = $url;
                $ip = preg_replace($pattern,"",$ip);
                $ip = $this->rootUrl($ip);
                $ip = trim($ip,"/");
                $serverIp = gethostbyname($ip);
                $ip = $this->ip_info($serverIp,"Location");

                $stmt = $this->conn->prepare("INSERT INTO zones SET zone_nick=?,zone_group=?,zone_url=?,zone_country=?,zone_serverIp=?,zone_countryCode=?,zone_date=?,zone_code=?");
                if($ip != null){
                    $country = $ip["country"] != "" ? $ip["country"] : "Unknown";
                    $countryCode = $ip["country_code"] != "" ? $ip["country_code"] : "UNK";
                }else{
                    $country = "Unknown";
                    $countryCode = "UNK";
                }
                if($stmt->execute([$nick,$group,$url,$country,$serverIp,$countryCode,$date,$code])){
                    $current++;
                }
            }
            if($zoneCount > $current) { return 0; }
            return 1;
        }

        public function checkNick($nick){
            $stmt = $this->conn->prepare("SELECT * FROM hackers where hacker_nick=?");
            $stmt->execute([$nick]);
            if($stmt->rowCount() > 0){ return 1; }
            return 0;
        }
        
        public function addNick($nick){
            $stmt = $this->conn->prepare("INSERT INTO hackers SET hacker_nick=?");
            if($stmt->execute([$nick])){ return 1; }
            return 0;
        }

        public function addGroup($group){
            $stmt = $this->conn->prepare("INSERT INTO groups SET group_name=?");
            if($stmt->execute([$group])){ return 1; }
            return 0;
        }

        public function checkGroup($group){
            $stmt = $this->conn->prepare("SELECT * FROM groups where group_name=?");
            $stmt->execute([$group]);
            if($stmt->rowCount() > 0){ return 1; }
            return 0;
        }

        
        public function countZones(){
            $stmt = $this->conn->prepare("SELECT * FROM zones");
            $stmt->execute();

            return $stmt->rowCount();
        }

        public function countNicks(){
            $stmt = $this->conn->prepare("SELECT * FROM hackers");
            $stmt->execute();

            return $stmt->rowCount();
        }

        public function countGroups(){
            $stmt = $this->conn->prepare("SELECT * FROM groups");
            $stmt->execute();

            return $stmt->rowCount();
        }

        public function ip_info($ip = NULL, $purpose = "location", $deep_detect = TRUE) {
            $output = NULL;
            if (filter_var($ip, FILTER_VALIDATE_IP) === FALSE) {
                $ip = $_SERVER["REMOTE_ADDR"];
                if ($deep_detect) {
                    if (filter_var(@$_SERVER['HTTP_X_FORWARDED_FOR'], FILTER_VALIDATE_IP))
                        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
                    if (filter_var(@$_SERVER['HTTP_CLIENT_IP'], FILTER_VALIDATE_IP))
                        $ip = $_SERVER['HTTP_CLIENT_IP'];
                }
            }
            $purpose    = str_replace(array("name", "\n", "\t", " ", "-", "_"), (string)NULL, strtolower(trim($purpose)));
            $support    = array("country", "countrycode", "state", "region", "city", "location", "address");
            $continents = array(
                "AF" => "Africa",
                "AN" => "Antarctica",
                "AS" => "Asia",
                "EU" => "Europe",
                "OC" => "Australia (Oceania)",
                "NA" => "North America",
                "SA" => "South America"
            );
            if (filter_var($ip, FILTER_VALIDATE_IP) && in_array($purpose, $support)) {
                $ipdat = @json_decode(file_get_contents("http://www.geoplugin.net/json.gp?ip=" . $ip));
                if (@strlen(trim($ipdat->geoplugin_countryCode)) == 2) {
                    switch ($purpose) {
                        case "location":
                            $output = array(
                                "city"           => @$ipdat->geoplugin_city,
                                "state"          => @$ipdat->geoplugin_regionName,
                                "country"        => @$ipdat->geoplugin_countryName,
                                "country_code"   => @$ipdat->geoplugin_countryCode,
                                "continent"      => @$continents[strtoupper($ipdat->geoplugin_continentCode)],
                                "continent_code" => @$ipdat->geoplugin_continentCode
                            );
                            break;
                        case "address":
                            $address = array($ipdat->geoplugin_countryName);
                            if (@strlen($ipdat->geoplugin_regionName) >= 1)
                                $address[] = $ipdat->geoplugin_regionName;
                            if (@strlen($ipdat->geoplugin_city) >= 1)
                                $address[] = $ipdat->geoplugin_city;
                            $output = implode(", ", array_reverse($address));
                            break;
                        case "city":
                            $output = @$ipdat->geoplugin_city;
                            break;
                        case "state":
                            $output = @$ipdat->geoplugin_regionName;
                            break;
                        case "region":
                            $output = @$ipdat->geoplugin_regionName;
                            break;
                        case "country":
                            $output = @$ipdat->geoplugin_countryName;
                            break;
                        case "countrycode":
                            $output = @$ipdat->geoplugin_countryCode;
                            break;
                    }
                }
            }
            return $output;
        }
    }

    // require '../db.php';
    // $database = new Database();
    // $db = $database->connect();
    // $nw = new Zones($db);

    // echo file_get_contents("https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Strings");
    
?>