<?php 
class socketChajian extends Chajian
{
	public $serverip = '127.0.0.1';
	public $serverport = 0;
	
	private $socket = null;
	private $daisend= array();
	
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
		$this->daisend[] = array(
			'sendid'	=> $sendid,
			'receid'	=> $receid,
			'conarr'	=> $conarr
		);
	}
	
	public function sendstart()
	{
		$this->sendstarts();
		$this->daisend = array();
	}
	
	private function sendstarts()
	{
		$len = count($this->daisend);
		if($len <= 0)return;
		$host 		= $this->serverip;  
		$port 		= $this->serverport;
		$msg		= '';
		if($this->isempt($host) || $port ==0)return;
		if($this->socket == null){
			if($this->isempt($host) || $port ==0)return 'sorry not';

			@$this->socket 	= socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
			if($this->socket==null)$msg = '无法使用';

			if($msg == ''){
				@$connection = socket_connect($this->socket, $host, $port);
				if($connection==false)$msg = '无法连接';
			}
		}
		if($msg != '' || $this->socket ==null)return $msg;
		
		$senar = $recear = $strar = array();
		foreach($this->daisend as $k=>$rs){
			$s = '';
			foreach($rs['conarr'] as $k=>$v){
				$s .= ','.$k.':"'.$v.'"';
			}
			$s = substr($s, 1);
			$s = $this->rock->jm->encrypt('{'.$s.'}');
			$senar[] 	= $rs['sendid'];
			$recear[] 	= $rs['receid'];
			$strar[] 	= $s;
		}
		$secont	= 'phpsend@@@';
		$secont.= join('$$$', $senar);
		$secont.= '@@@';
		$secont.= join('$$$', $recear);
		$secont.= '@@@';
		$secont.= join('$$$', $strar);
		
		@$bola	= socket_write($this->socket, $secont, strlen($secont));
		if(!$bola)$msg = '无法发送';
		
		socket_close($this->socket);
		$this->socket = null;
		return $msg;
	}
	
	protected function destChajian()
	{
		$this->sendstarts();
		$this->daisend = array();
	}
	
}