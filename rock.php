<?php 
/**
	OA后台主文件入口
	主页：http://www.xh829.com
	交流QQ群：429403774
	说明：免费开源软件，欢迎学习研究使用
	作者：雨中磐石(rainrock)
*/

define('PROJECT', 'webrock');
include_once('config/config.php');
$islogin	= (int)$rock->session(QOM.'adminid',0);
$m			= $rock->jm->gettoken('m', 'index');
$d			= $rock->jm->gettoken('d');
$a			= $rock->jm->gettoken('a', 'default');

$ajaxbool	= $rock->jm->gettoken('ajaxbool', 'false');
$mode		= $rock->get('m', $m);
$dir		= $rock->get('d', $d);

if(!$config['install'] && $mode != 'install')$rock->location('?m=install');//可删除判断是否有安装的
if($mode=='login' || $dir=='webim' || $dir=='taskrun' || $dir=='mobile' || $mode=='taskrun' || $mode=='install')$islogin = 1;//验证登录

if($islogin == 0){
	if($ajaxbool == 'true'){
		echo 'sorry! not sign';
	}else{
		$rock->location('?m=login');
	}
	exit();
}
include_once('include/View.php');