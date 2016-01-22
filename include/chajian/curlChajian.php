<?php
/**
	curl
*/
class curlChajian extends Chajian{
	
	public function getfilecont($url)
	{
		@$result = file_get_contents($url);
		return $result;
	}
	
	public function postfilecont($url, $data=array())
	{
		$cont = '';
		if(is_array($data)){
			foreach($data as $k=>$v)$cont.='&'.$k.'='.$v.'';
			if($cont!='')$cont=substr($cont,1);
		}else{
			$cont 	= $data;
		}
		$len 	= strlen($cont);
		$opts 	= array(  
			'http'	=>	array(  
				'method'	=>	'POST',  
				'header' 	=>
                "Content-type: application/x-www-form-urlencoded\r\n" .
                "Content-length: $len\r\n", 
				'content' => $cont,  
			)  
		 );  
		$cxContext 	= stream_context_create($opts);  
		@$sFile 		= file_get_contents($url, false, $cxContext);  
		return $sFile;
	}
	
	public function getcurl($url)
	{
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		$output = curl_exec($ch);
		curl_close($ch);
		return $output;
	}
	
	public function postcurl($url, $data=array())
	{
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
	　　curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	　　curl_setopt($ch, CURLOPT_POST, 1);// post数据
	　　curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		$output = curl_exec($ch);
	　　curl_close($ch);
		return $output;
	}
}                                                                                                                                                            