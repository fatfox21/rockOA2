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
}