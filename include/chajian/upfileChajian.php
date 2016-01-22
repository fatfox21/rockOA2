<?php
/**
	上传文件类upfileChajian
	create：chenxihu
	createdt：2013-11-15
	explain：上传文件类，可上传任何文件类型
*/

class upfileChajian extends Chajian{
	
	public $ext;     //上传类型
	public $maxsize; //上传大小(MB)
	public $path;    //文件夹
	
	/**
		初始化
		@param	$ext string 上传类型
		@param	$path string 上传目录 如：upload|e|ee
		@param	$maxsize ing 上传大小(MB)
	*/
	public function __construct($ext,$path,$maxsize=1)
	{
		$this->ext		= $ext;
		$this->maxsize	= $maxsize;
		$this->path		= $path;
	}
	
	/**
		上传
		@param	$name	string	对应文本框名称
		@param	$cfile	string	文件名心的文件名，不带扩展名的
		@return	string/array
	*/
	public function up($name,$cfile='')
	{
		if(!$_FILES)return 'sorry!';
		$file_name		= $_FILES[$name]['name'];
		$file_size		= $_FILES[$name]['size'];//字节
		$file_type		= $_FILES[$name]['type'];
		$file_error		= $_FILES[$name]['error'];
		$file_tmp_name	= $_FILES[$name]['tmp_name'];
		$file_sizecn	= $this->formatsize($file_size);
		$file_ext		= strtolower(substr($file_name,strrpos($file_name,'.')+1));	//文件扩展名
		
		$file_img		= false;//不是图片
		$jpgallext		= '|jpg|png|gif|bmp|jpeg|';//图片格式
		if($this->contain($jpgallext, '|'.$file_ext.'|'))$file_img = true;	
		
		if($file_size<=0){
			return '文件大小0字节，不能上传';
		}
		
		if($file_error>0){
			return '上传失败，可能是服务器内部出错，请重试';
		}
			
		if(!$this->contain('|'.$this->ext.'|', '|'.$file_ext.'|') && $this->ext != '*'){
			return '上传的文件类型['.$file_ext.']不符合，限制文件类型：'.$this->ext.'';
		}
		
		if($file_size>$this->maxsize*1024*1024){
			return '上传文件过大，限制在：'.$this->formatsize($this->maxsize*1024*1024).'内，当前文件大小是：'.$file_sizecn.'';
		}
		
		//创建目录
		$zpath=explode('|',$this->path);
		$mkdir='';
		for($i=0;$i<count($zpath);$i++){
			$mkdir.=''.$zpath[$i].'/';
			if(!is_dir($mkdir))mkdir($mkdir);
		}
		
		//新的文件名
		$file_newname	=$file_name;
		if(!$cfile==''){
			$file_newname=''.$cfile.'.'.$file_ext.'';
		}else{
			$randname	= ''.date('d_His').''.rand(1000,9999).'';
			$file_newname=''.$randname.'.'.$file_ext.'';
		}
		
		$save_path	= ''.str_replace('|','/',$this->path);
		$allfilename= $save_path.'/'.$file_newname.'';
		$uptempname	= $save_path.'/'.$randname.'.uptemp';

		$upbool	 = true;
		
		if(!$file_img){
			//base64编码 上传文件转化
			$fp	= fopen($file_tmp_name,"r");
			$filebase64	= base64_encode(fread($fp,$file_size));
			fclose($fp);
			
			$fh = fopen($uptempname, "a");
			fwrite($fh, $filebase64);
			fclose($fh);
			$allfilename	= $uptempname;
	
		}else{
			$upbool	= move_uploaded_file($file_tmp_name,$allfilename);
		}
		
		if($upbool){
			$picw=0;$pich=0;
			return array(
				'newfilename' => $file_newname,
				'oldfilename' => $file_name,
				'filesize'    => $file_size,
				'filesizecn'  => $file_sizecn,
				'filetype'    => $file_type,
				'filepath'    => $save_path,
				'fileext'     => $file_ext,
				'allfilename' => $allfilename,
				'picw'        => $picw,
				'pich'        => $pich
			);
		}else{
			return '上传失败'.$file_error.'';
		}
	}
	
	//是否包含返回bool
	function contain($str,$a)
	{
		$bool=false;
		$ad=strpos($str,$a);
		if($ad>0||!is_bool($ad))$bool=true;
		return $bool;
	}
	
	//返回文件大小
	function formatsize($size)
	{
		$arr = array('Byte', 'KB', 'MB', 'GB', 'TB', 'PB');
		$e = floor(log($size)/log(1024));
		return number_format(($size/pow(1024,floor($e))),2,'.','').' '.$arr[$e];
	}
}
