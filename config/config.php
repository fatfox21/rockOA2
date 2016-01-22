<?php
/**
	系统总配置文件，不可删除(否则只能呵呵)，可改$config 参数
*/
@session_start();
//date_default_timezone_set("PRC");
header('Content-Type:text/html;charset=utf-8');
define('ROOT_PATH',str_replace('\\','/',dirname(dirname(__FILE__))));
define('HOST', $_SERVER['HTTP_HOST']);
define('DEBUG', true);
include_once(''.ROOT_PATH.'/include/rockFun.php');
include_once(''.ROOT_PATH.'/include/Chajian.php');
include_once(''.ROOT_PATH.'/include/class/rockClass.php');
$rock 		= new rockClass();
$db			= null;		
$smarty		= false;
define('REWRITE', 'true');
if(!defined('PROJECT'))define('PROJECT', $rock->get('p', 'webrock'));

$config		= array(
	'title'		=> 'ROCKOA',
	'url'		=> 'http://'.HOST.'/rock/',
	'urly'		=> 'http://127.0.0.1:90/rock/', //远程在线升级URL地址
	'db_host'	=> 'localhost',
	'db_user'	=> 'root',
	'db_pass'	=> '',
	'db_base'	=> '',
	'perfix'	=> 'rock_',
	'qom'		=> 'rock_',
	'highpass'	=> '',
	'install'	=> false,
	'version'	=> require('version.php'),
	'path'		=> 'rock',
	'db_drive'	=> 'mysqli'
);

$_confpath		= $rock->strformat('?0/?1/?1Config.php', ROOT_PATH, PROJECT);
if(file_exists($_confpath)){
	$_tempconf	= require($_confpath);
	foreach($_tempconf as $_tkey=>$_tvs)$config[$_tkey] = $_tvs;
}

define('TITLE', $config['title']);
define('URL', $config['url']);
define('URLY', $config['urly']);
define('PATH', $config['path']);

define('DB_DRIVE', $config['db_drive']);
define('DB_HOST', $config['db_host']);
define('DB_USER', $config['db_user']);
define('DB_PASS', $config['db_pass']);
define('DB_BASE', $config['db_base']);

define('PREFIX', $config['perfix']);
define('QOM', $config['qom']);
define('VERSION', $config['version']);
define('HIGHPASS', $config['highpass']);
define('SYSURL', ''.URL.PATH.'.php');
$rock->initRock();