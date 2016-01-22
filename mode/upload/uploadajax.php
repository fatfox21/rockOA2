<?php
include_once('../../config/config.php');
//if($rock->adminid==0)exit('sorry not sign');
$now		= $rock->now();
$action		= $rock->get('action');
if($action != 'xml' && $action != 'send')exit('Sorry!');
$savepath	= '';
$maxwidth	= 0;
$thumbtype	= 0;//缩略图类型0可能去掉看不到的默认， 1整图缩略可以看到白边
if($action == 'xml'){
	$xmlDoc = new DOMDocument();
	$xmlDoc->loadXML($HTTP_RAW_POST_DATA);
	$sendci		= (int)$xmlDoc->getElementsByTagName('sendci')->item(0)->nodeValue+1;
	$maxsend	= (int)$xmlDoc->getElementsByTagName('maxsend')->item(0)->nodeValue;
	$sendcont	= $xmlDoc->getElementsByTagName('sendcont')->item(0)->nodeValue;
	$filename	= $xmlDoc->getElementsByTagName('filename')->item(0)->nodeValue;
	$filetype	= $xmlDoc->getElementsByTagName('filetype')->item(0)->nodeValue;
	$fileext	= $xmlDoc->getElementsByTagName('fileext')->item(0)->nodeValue;
	$filesize	= $xmlDoc->getElementsByTagName('filesize')->item(0)->nodeValue;
	$filesizecn	= $xmlDoc->getElementsByTagName('filesizecn')->item(0)->nodeValue;
	$newfile	= $xmlDoc->getElementsByTagName('newfile')->item(0)->nodeValue;
	$mkdir		= $xmlDoc->getElementsByTagName('mkdir')->item(0)->nodeValue;
}if($action == 'send'){	
	if(!$_POST)exit('Sorry!,send');
	$sendci		= (int)$rock->post('sendci')+1;
	$maxsend	= (int)$rock->post('maxsend');
	$maxwidth	= (int)$rock->post('maxwidth');
	$thumbtype	= (int)$rock->post('thumbtype');
	$sendcont	= $rock->post('sendcont');
	$savetype	= $rock->post('savetype','temp');
	$filename	= $rock->post('filename');
	$filetype	= $rock->post('filetype');
	$fileext	= trim($rock->post('fileext'));
	$filesize	= $rock->post('filesize');
	$filesizecn	= $rock->post('filesizecn');
	$newfile	= $rock->post('newfile');
	$mkdir		= $rock->post('mkdir');
	$savepath	= $rock->post('savepath');
	$thumbnail	= $rock->post('thumbnail');
}

$smkdir		= '../../upload/'.$mkdir.'';
if(!file_exists($smkdir))mkdir($smkdir);
$allfile	= ''.$smkdir.'/'.$newfile.'';
$tempfile	= $allfile.'.temp';
$filepath	= substr($tempfile,3);
$thumbpath	= '';//所累图地址
$width		= 0;
$height		= 0;

$fc	= fopen($tempfile, 'a');
fwrite($fc,$sendcont);
fclose($fc);
$id	= 0;
if($sendci==$maxsend){
	
	$optid	= (int)$rock->session(QOM.'adminid',0);
	$imgext	= '|jpg|gif|png|jpeg|bmp|';
	$boolc	= $rock->contain($imgext, '|'.$fileext.'|');
	$ztfile	= $imgext.'doc|docx|xls|xlsx|ppt|pptx|pdf|swf|rar|zip|txt|gz|wav|mp3|wma|chm|';
	$botxtl	= $rock->contain($ztfile,'|'.$fileext.'|');
	$savepath = '';
	$boolc1	= $rock->isempt($savepath);
	if(!$boolc1 && $optid==0)$boolc1 = true;

	$izztbo = false;
	if(!$boolc1 || $botxtl)$izztbo = true;

	if($izztbo){
		$content	= file_get_contents($tempfile);
		$temp1file	= ''.$allfile.'.'.$fileext.'';
		$a64basec	= base64_decode($content);
		
		if(!$boolc1){
			file_put_contents(ROOT_PATH.''.$savepath.''.iconv('utf-8','gb2312',$filename).'', $a64basec);
			unlink($tempfile);
		}else{
			file_put_contents($temp1file, $a64basec);
			unlink($tempfile);
			if($boolc){
				list($width, $height) = getimagesize($temp1file);
				if($rock->isempt($width)){
					$width = 0;
					$height = 0;
				}
			}
		}
		$filepath	= substr($temp1file,3);	
	}
	$filepath	= str_replace('../','',$filepath);
	$thumbpath	= $filepath;
	
	//图片，图片缩略图
	if($boolc && !$rock->isempt($thumbnail)){
		$imgaa	= c('image', true);
		$imgaa->createimg('../../'.$filepath.'');
		$sttua	= explode('x', $thumbnail);
		$thumbpath 	= $imgaa->thumbnail((int)$sttua[0], (int)$sttua[1], $thumbtype);
	}
	if($boolc && $maxwidth >0){
		if($width > $maxwidth){
			$imgac	= c('image', true);
			$imgac->createimg('../../'.$filepath.'');
			$souwid	= $maxwidth;
			$souhei	= (int)$maxwidth/$width * $height;
			$thumbpath 	= $imgac->thumbnail($souwid, $souhei, $thumbtype);
		}
	}
	$thumbpath	= str_replace('../','',$thumbpath);

	
	$arr	= array(
		'adddt'	=> $now,
		'valid'	=> 1,
		'filename'	=> $filename,
		'fileext'	=> $fileext,
		'filesize'	=> $filesize,
		'filesizecn'=> $filesizecn,
		'filepath'	=> $filepath,
		'optid'		=> $optid,
		'optname'	=> '',
		'ip'		=> $rock->ip,
		'web'		=> $rock->web
	);
	$db	= import(DB_DRIVE);
	$db->record(''.PREFIX.'file',$arr);
	$id	= $db->insert_id();
}
echo '{success:true, msg:"'.$id.'",filepath:"'.$filepath.'", sendci:'.$sendci.', thumbpath:"'.$thumbpath.'",width:'.$width.',height:'.$height.'}';