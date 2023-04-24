<?php 
    class Contact{
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

        public function addContact($data){
            if(!is_array($data)){ return 0; }
            $data = array_map("trim",$data);
            $data = array_map([$this,"htmlclean"],$data);
            $name = $data["name"];
            if(!array_key_exists("name",$data)) {return 0;}
            $email = $data["email"];
            if(!array_key_exists("email",$data)) {return 0;}
            
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { return 0; }
            $message = $data["message"];
            if(!array_key_exists("message",$data)) {return 0;}
            $date = Date("Y-m-d H:i:s");
            if($name == "" || $email == "" || $message == ""){ return 0; }
            $stmt = $this->conn->prepare("INSERT INTO contact SET contact_name=?,contact_email=?,contact_message=?,contact_date=?");
            if($stmt->execute([$name,$email,$message,$date])){ return 1; }
            return 0;
        }
    }

?>