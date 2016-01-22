<?php
include_once('../../config/config.php');

$upfile = c('upfile',true,'jpg|png|gif|jpeg','../../upload|'.date('Y-m').'', 2);

$upses	= $upfile->up('imgFile');
if(is_array($upses)){
	$url = $upses['allfilename'];
	$url = str_replace('../' , '', $url);
	$arr = array('error' => 0, 'url' => $url);
}else{
	$arr = array('error' => 1, 'message' => $upses);
}
echo json_encode($arr);