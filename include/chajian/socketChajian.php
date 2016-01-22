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
		向服务器发送命令
	*/
	public function sendshell($cont='')
	{
		if($cont=='')return 'send is null';
		$secont = 'shell@@@'.$cont.'';
		$msg = $this->getsocketobj();
		if($msg != 'success')return $msg;
		$msg 	= '';
		@$bola	= socket_write($this->socket, $secont, strlen($secont));
		if(!$bola){
			$msg = 'send fail';
		}else{	
			while(@$out = socket_read($this->socket, 8192)){
				$msg.=$out;
			}
		}
		socket_close($this->socket);
		$this->socket = null;
		if($msg==$secont)$msg='success';
		return $msg;
	}
	
	private function getsocketobj()
	{
		if(!function_exists('socket_create'))return 'not open socket';
		$this->inithost();
		$host 		= $this->serverip;  
		$port 		= $this->serverport;
		$msg		= '';
		if($this->isempt($host) || $port ==0)return 'not set';
		if($this->socket == null){
			@$this->socket 	= socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
			if($this->socket==null)$msg = 'not use';
			if($msg == ''){
				@$connection = socket_connect($this->socket, $host, $port);
				if($connection==false)$msg = 'not connect';
			}
		}
		if($msg != '' || $this->socket ==null)return $msg;
		return 'success';
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
		$msg		= $this->getsocketobj();
		if($msg != 'success')return $msg;
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
		if(!$bola)$msg = 'send fail';
		
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