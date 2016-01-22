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
	
	public function datassAjax()
	{
		$this->getfileinfo('http://127.0.0.1:90/rock/');
	}
	
	public function getmysqlupgrade()
	{
		
	}
	
	public function getstrurl($host, $act)
	{
		$url = ''.$host.'?a='.$act.'&d=taskrun&m=upgrade&ajaxbool=true';
		return $url;
	}
	
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
	
	private function getmysqlneir($url){
		$data = $this->getmysqlnr(0);
		$url  = $this->getstrurl($url, 'getmysqlupdate');
		$str  = c('html')->httppost($url, $data);
		return $str;
	}
	
	//获取我的数据库
	private function getmysqlnr($lx){
		$tabarr = $this->db->getalltable();
		$tabstr = '';
		$len 	= strlen(PREFIX);
		$data 	= array();
		foreach($tabarr as $tab){
			if(strpos($tab, PREFIX)===0){
				$tabs = substr($tab, $len);
				$tabstr.=','.$tabs;
				if($lx == 0){
					$farr = $this->db->getallfields($tab);
					$data['f_'.$tabs] = join(',', $farr);
				}
			}
		}
		$tabstr = substr($tabstr, 1);
		$data['all'] = $tabstr;
		return $data;
	}
	
	//远程用的修改版本的
	public function getversionAjax()
	{
		$log = '更新说明了';
		echo ''.VERSION.'|'.$log.'';
	}
	
	//远程获取需要更新数据库
	public function getmysqlupdateAjax()
	{
		$all 	= $this->post('all');
		$alls 	= ','.$all.',';
		$data 	= $this->getmysqlnr(1);
		$tabs 	= explode(',', $data['all']);
		$rows 	= array();
		foreach($tabs as $tab){
			$table = PREFIX.$tab;
			if(!$this->contain($alls, ','.$tab.',')){//不存在就要创建
				$str    = $this->db->showcreatetable($table);
				$rows[] = $str.';';
				$rows[] = 'alter table `'.$table.'` AUTO_INCREMENT=1;';
			}else{
				$oldfstr 	= $this->post('f_'.$tab.'');
				$oldfstrs 	= ','.$oldfstr.',';
				$farr 	 	= $this->db->getallfields($table);
				foreach($farr as $fstr){
					if(!$this->contain($oldfstrs, ','.$fstr.',')){//字段不存在
						$colun  = $this->db->gettablecolumn($table, $fstr);
						if(isset($colun[0])){
							$strs   = $colun[0];
							$rows[] = 'alter table `[Q]'.$tab.'` add '.$strs.';';
						}
					}
				}
			}
		}
		echo join('', $rows);
	}
	
	
	
	
	
	
	
	
	
	
	/**
		返回文件名和大小
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
	
	private function getFile($path='', $lave=0, $nsts='')
	{
		$paths	= ROOT_PATH.'/'.$path;
		if(!is_dir($paths))return;
		$d = opendir($paths);
		$nostr = ','.$this->noupgradestr.',';
		if($nsts!='')$nostr .= ''.$nsts.',';
		while( false !== ($file = readdir($d))){
			if($file != '.'  &&  $file!='..'){//遍历目录下文件
				$file	= iconv('gb2312','utf-8',$file);
				$pafile	= $paths.$file;
				$pafies = $path.$file;
				$bool 	= true;
				if($this->contain($nostr, ','.$pafies.','))$bool = false;
				if($lave==0){
					if(!$this->contain(','.$this->hostupgradestr.',', ','.$pafies.','))$bool = false;
				}
				if($bool){
					if(is_file($pafile)){
						$size=filesize($pafile);//文件大小
						$this->filearr[] = array(
							'name' => $pafies,
							'size' => $size
						);
					}else if(is_dir($pafile)){
						$this->getFile($pafies.'/', $lave+1, $nsts);
					}
				}
			}
		}
	}
	
	/**
		远程系统上
	*/
	public function getyuanfileAjax()
	{
		$notup	= $this->post('notup');
		$this->filearr = array();
		$this->getFile('', 0, $notup);
		$fstr	= explode(',', $this->post('fstr'));
		$fsize	= explode(',', $this->post('fsize'));
		$len 	= count($fstr);
		$arrs 	= array();
		for($i=0; $i<$len; $i++){
			$arrs[$fstr[$i]] = $fsize[$i];
		}
		$rows   = array();
		foreach($this->filearr as $k=>$rs){
			$na = $rs['name'];
			if(isset($arrs[$na])){
				if($arrs[$na] != $rs['size']){
					$rows[] = 'update:'.$na.'';
				}
			}else{
				$rows[] = 'create:'.$na.'';
			}
		}
		echo join(',', $rows);
	}
	
	
	
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
	
	public function mysqlfilest($cont)
	{
		$cont = str_replace('`rock_', '`'.PREFIX.'', $cont);
		$bo   = $this->db->query($cont);
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
	public function getuploadfilestAjax()
	{
		$filename = $this->post('filename');
		$paths	= ROOT_PATH.'/'.$filename;
		$str 	= '';
		if(file_exists($paths)){
			$str	= base64_encode(file_get_contents($paths));
		}
		echo $str;
	}
}