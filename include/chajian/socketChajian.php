<?php 
class socketChajian extends Chajian
{
	public $serverip = '127.0.0.1';
	public $serverport = 0;
	
	/**
		读取配置
	*/
	public function inithost()
	{
		if($this->serverport>0)return;
		$dbs = m('option');
		$this->serverip 	= $dbs->getval('reimipsystem');
		$this->serverport	= (int)$dbs->getval('reimportsystem','0');
	}
	
	/**
		推送提醒
	*/
	public function send($sendid, $receid, $conarr)
	{
		if(!function_exists('socket_create'))return 'not open socket';
		
		$this->inithost();
		$host 		= $this->serverip;  
		$port 		= $this->serverport;
		
		if($this->isempt($host) || $port ==0)return 'sorry not';
		
		$msg		= '';
		@$socket 	= socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
		if($socket==null)$msg = '无法使用';

		if($msg == ''){
			@$connection = socket_connect($socket, $host, $port);
			if($connection==null)$msg = '无法连接';
		}
		
		if($msg == ''){
			$s = '';
			foreach($conarr as $k=>$v){
				$s .= ','.$k.':"'.$v.'"';
			}
			$s = substr($s, 1);
			$s = $this->rock->jm->encrypt('{'.$s.'}');
			$secont	= 'phpsend@@@'.$sendid.'@@@'.$receid.'@@@'.$s.'';
			if(!socket_write($socket, $secont, strlen($secont))){
				$msg = '无法发送';
			}
			socket_close($socket);
		}
		return $msg;
	}
}                                                                                                                                                            