<?php 
    class Router{
        public static function parse_uri(){
            $dirname = dirname($_SERVER["SCRIPT_NAME"]);
            $dirname = $dirname != '/' ? $dirname : null;
            $basename = basename($_SERVER["SCRIPT_NAME"]);
            $request_uri = str_replace([$dirname, $basename], (string)null, $_SERVER['REQUEST_URI']);
            $request_uri = preg_replace('#/+#','/',$request_uri);
            return $request_uri;
        }

        public static function run($url,$callback,$params = [],$method = 'get'){
            $method = explode('|', strtoupper($method));

            if (in_array($_SERVER['REQUEST_METHOD'], $method)) {
                $i = 0;
                $patterns = [
                    ':all' => '(.*)',
                    ':any' => '([^/]+)',
                    ':id' => '(\d+)',
                    ':int' => '(\d+)',
                    ':number' => '([+-]?([0-9]*[.])?[0-9]+)',
                    ':float' => '([+-]?([0-9]*[.])?[0-9]+)',
                    ':bool' => '(true|false|1|0)',
                    ':string' => '([\w\-_]+)',
                    ':slug' => '([\w\-_]+)',
                    ':uuid' => '([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
                    ':date' => '([0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]))',
                ];

                $url = str_replace(array_keys($patterns), array_values($patterns), $url);

                $request_uri = self::parse_uri();

                if (preg_match('@^' . $url . '$@', $request_uri, $parameters)) {
                    unset($parameters[0]);

                    if(count($params) > 0){
                        $values = array_values($params);
                        $parameters_value = array_values($parameters);
                        $parameters = [];
                        foreach($parameters_value as $k => $v){
                                $parameters[$values[$i]] = $v;       
                                $i++;
                        }
                        $i = 0;
                    }


                    if(is_callable($callback)){
                        call_user_func_array($callback,$parameters);
                    }
                }
            }
        }
    }

    // foreach($routes as $k => $v){
    //     if(is_array($v)){
    //         if(isset($v["parameters"])){
    //                 $parameters = $v["parameters"];
    //                 $parameters = explode(",",$parameters);
    //                 Router::run($k,$v["method"],$parameters);
    //         }else{
    //             Router::run($k,$v["method"]);
    //         }
    //     }else{ 
    //         Router::run($k,$v);
    //     }
    // }


    // echo Router::parse_uri();
?>