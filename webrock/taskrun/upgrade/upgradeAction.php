<?php 
include_once('upgradeConfig.php'); 
class upgradeClassAction extends upgrade{
	
	public function geturlyAjax()
	{
		echo URLY;
	}
	
	public function dataAjax()
	{
		$step	= (int)$this->post('step');
		$upurl	= $this->post('upurl');
		$rows	= array();
		$shengj = '0';
		if($step == 1){
			$gve = $this->gethostversion($upurl);
			$log = $gve['log'];
			if($log!=''){
				$msg = '我的版本：'.VERSION.'<br>';
				$msg.='最新版本：'.$gve['ver'].'<br>';
				$msg.='更新日志：'.$log.'';
			}else{
				$msg = '<font color=red>好像在线更新地址有错</font>';
			}
			$rows[] = array(
				'type' => '版本',
				'remark' => $msg
			);
		}
		
		//升级数据库(返回远程数据库结构来跟我自己的对比)
		if($step == 2){
			$str= $this->getmysqlneir($upurl);
			if($str == ''){
				$rows[] = array(
					'type' => '数据库',
					'remark' => '数据库结构基本一致，无需更新<br>这里只是升级表结构而已，如有一些记录我们是无从匹配的'
				);
			}else{
				$arr = explode(';', $str);
				foreach($arr as $arrs){
					if($arrs!=''){
						$rows[] = array(
							'type' => '升级数据库',
							'remark' => $arrs,
							'status' => 0
						);
						$shengj = 1;
					}
				}
			}
		}
		
		//升级文件
		if($step == 3){
			$str= $this->getfileinfo($upurl);
			if($str == ''){
				$rows[] = array(
					'type' => '文件',
					'remark' => '文件结构基本一致，无需更新'
				);
			}else{
				$arr = explode(',', $str);
				foreach($arr as $arrs){
					if($arrs!=''){
						$sts = 'createfile';
						if($this->contain($arrs,'update:'))$sts='updatefile';
						$rows[] = array(
							'type' => $sts,
							'remark' => substr($arrs,7),
							'status' => 0
						);
						$shengj = 1;
					}
				}
			}
		}

		echo json_encode(array(
			'rows' => $rows,
			'totalCount' => 10,
			'issheng' => $shengj,
		));
	}
	
	//测试
	public function datassAjax()
	{
		$this->getfileinfo('http://127.0.0.1:90/rock/');
	}
	
	
	
	public function getstrurl($host, $act)
	{
		$url = ''.$host.'?a='.$act.'&d=taskrun&m=upgradeyc|upgrade&ajaxbool=true';
		return $url;
	}
	
	//
	public function gethostversion($url)
	{
		$str = $this->getstrurl($url, 'getversion');
		$str = c('html')->httpget($str);
		$log = '';
		$ver = '';
		$a 	 = explode('|', $str);
		if(isset($a[1])){
			$ver = $a[0];
			$log = $a[1];
		}	
		return array(
			'ver' => $ver,
			'log' => $log
		);
	}
	
	//返回数据库需要更新
	private function getmysqlneir($url){
		$data = $this->getmysqlnr(0);
		$url  = $this->getstrurl($url, 'getmysqlupdate');
		$str  = c('html')->httppost($url, $data);
		return $str;
	}

	
	/**
		返回文件需要更新
	*/
	private function getfileinfo($url)
	{
		$this->filearr = array();
		$this->getFile('', 0);
		$fstr = $fsize = '';
		foreach($this->filearr as $k=>$rs){
			$fstr.=','.$rs['name'];
			$fsize.=','.$rs['size'];
		}
		$data['fstr'] = substr($fstr, 1);
		$data['fsize'] = substr($fsize, 1);
		$data['notup'] = $this->userautonoupgs;
		
		$url  = $this->getstrurl($url, 'getyuanfile');
		$str  = c('html')->httppost($url, $data);
		return $str;
	}
	

	
	
	
	/**
		开始升级啦
	*/
	public function uploadfilestAjax()
	{
		$step 	= (int)$this->post('step');
		$cont 	= $this->post('content');
		$upurl	= $this->post('upurl');
		$msg  	= '';
		if($cont==''){
			$msg = 'sorry';
		}else{
			if($step==2)$msg = $this->mysqlfilest($cont);
			if($step==3)$msg = $this->uploadfilest($cont, $upurl);
		}
		echo $msg;
	}
	
	//升级数据库
	public function mysqlfilest($cont)
	{
		$cont = str_replace('`rock_', '`'.PREFIX.'', $cont);
		//$bo   = $this->db->query($cont);
		$bo   = false;
		$msg  = 'success';
		if(!$bo)$msg='exec sql fail';
		return $msg;
	}
	
	
	
	//升级文件开始
	public function uploadfilest($file, $url)
	{
		$msg  = '';
		$str  = '';
		if($file=='')$msg='not found';
		if($msg==''){
			$url  = $this->getstrurl($url, 'getuploadfilest');
			$str  = c('html')->httppost($url, array('filename'=>$file));
			if($str=='')$msg='not httpget';
		}
		if($msg==''){
			$zpath	= explode('/', $file);
			$len    = count($zpath);
			$mkdir	= '';
			for($i=0; $i<$len-1; $i++){
				if(!$this->isempt($zpath[$i])){
					$mkdir.='/'.$zpath[$i].'';
					$wzdir = ROOT_PATH.$mkdir;
					if(!is_dir($wzdir)){
						mkdir($wzdir);
					}
				}
			}
			$path		= ROOT_PATH.'/'.$file;
			$a64basec	= base64_decode($str);
			file_put_contents($path, $a64basec);
		}
		if($msg=='')$msg='success';
		return $msg;
	}
}