<?php 
include_once(''.ROOT_PATH.'/include/smarty/Smarty.class.php');
$smarty = new Smarty();
$smarty->caching		= false;//是否缓存
$smarty->template_dir	= 'template';//模版目录
$smarty->compile_dir	= 'log/compile';//编译目录
$smarty->cache_dir		= 'log/cache';//缓存文件夹
$smarty->cache_lifetime	= 60;//缓存时间
$smarty->left_delimiter	= '{';//左边界符
$smarty->right_delimiter= '}';//右边界符
