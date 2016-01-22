<?php 
class upgrade extends Action{
	
	public $userautonoupgs	= ''; //自己设置这里不升级的文件和文件夹(格式如：config/config.php)
	
	
	
	public $noupgradestr 	= ''; //不升级的文件和文件夹(不要改)
	public $hostupgradestr 	= ''; //顶级目录检测(不要改)
	
	
	public function initAction()
	{
		$str = 'areim,ext4.2,log,upload,images,include/PHPExcel,include/PHPMailer,include/smarty,mode/fileicons,mode/icons,mode/My97DatePicker';
		$str.= ',favicon.ico,webrock/install,webrock/taskrun/upgrade/upgradeConfig.php,webrock/taskrun/appapi,webrock/webrockConfig.php';
		$str.= ',webrock/person/email';
		$this->noupgradestr 	= $str;
		
		$this->hostupgradestr 	= 'config,css,mode,webrock,js,mode,index.php,rock.php,include,rainrock.sql';
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	public function getFile($path='', $lave=0, $nsts='')
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
	

	
	
	public function getmysqlnr($lx){
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
}