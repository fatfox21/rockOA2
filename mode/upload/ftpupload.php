<?php 
/**
	上传远程文件
*/
if(!$_POST)exit('sorry!');

include_once('../../config/config.php');
$filepath	= $rock->post('filepath');
$filename	= $rock->post('filename');

//判断目录是否存在
if(!$rock->isempt($filepath)){
	$zpath	= explode('/', $filepath);
	$mkdir	= '';
	for($i=0; $i<count($zpath); $i++){
		if(!$rock->isempt($zpath[$i])){
			$mkdir.='/'.$zpath[$i].'';
			$wzdir = ROOT_PATH.$mkdir;//目录不存在
			if(!is_dir($wzdir)){
				mkdir($wzdir);
			}
		}
	}
}

$path		= ROOT_PATH.$filepath.'/'.$filename;
$content	= $rock->post('content');
if(!$rock->isempt($filename) && !$rock->isempt($content)){
	$a64basec	= base64_decode($content);
	file_put_contents($path, $a64basec);
}