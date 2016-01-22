<?php 
/**
	html相关插件
*/
class htmlChajian extends Chajian{
	
	public function replace($cont)
	{
		if($this->rock->isempt($cont))return '';
		//$cont	= str_replace(array('<', '>'), array('&lt;', '&gt;'), $cont);
		$cont	= str_replace(array('[B]','[/B]', '[/A]', "\n"), array('<B>','</B>', '</A>','</p><p>'), $cont);
		
		preg_match_all('/\[(.*?)\]/', $cont, $list);
		foreach($list[0] as $k=>$nrs){
			if($this->rock->contain($nrs, '[A,')){
				$url	= str_replace('[A,', '', $nrs);
				$url	= str_replace(']', '', $url);
				$cont	= str_replace($nrs, '<A href="'.$url.'" target="_blank">', $cont);
			}
			if($this->rock->contain($nrs, '[IMG,')){
				$url	= str_replace('[IMG,', '', $nrs);
				$url	= str_replace(']', '', $url);
				$a		= explode(',', $url);
				$str	= '<img src="'.$a[0].'"';
				if(isset($a[1]))$str.=' width="'.$a[1].'"';
				if(isset($a[2]))$str.=' height="'.$a[2].'"';
				$str.='>';
				$cont	= str_replace($nrs, $str, $cont);
			}
		}
		return $cont;
	}
	
	
	public function createtable($fields, $arr, $title='')
	{
		$bordercolor = '#C9ECFF';
		$s 	= '<table border="0" class="createtable" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">';
		if($title != ''){
			$s .= '<tr><td colspan="3" align="center" style="border:1px '.$bordercolor.' solid;padding:10px;font-size:16px;background:#2CB2F9;color:white">'.$title.'</td></tr>';
		}
		foreach($fields as $fid=>$na){
			$val = '';
			$sty = 'padding:8px;';
			if(isset($arr[$fid]))$val = $arr[$fid];
			if(isset($arr[$fid.'_style']))$sty = $arr[$fid.'_style'];
			$s .= '<tr><td align="right" width="120" style="border:1px '.$bordercolor.' solid;padding:5px 8px">'.$na.'</td><td  style="border:1px '.$bordercolor.' solid;'.$sty.'" align="left">'.$val.'</td></tr>';
		}
		$s .='</table>';
		
		return $s;
	}
	
	/**
		创建table表格数据
		@param	string  $rows  	 下载导出数据
		@param	string  $headstr 表格表头(如：lie1,列1,left@lie2,列2,center)
		@return	string
	*/
	public function createrows($rows, $headstr='')
	{
		if($headstr == '')$headstr	= $this->request('header');
		if($headstr	== '')return '';
		$arrh		= explode('@', $headstr);
		$thead		= count($arrh);
		for($i=0; $i<$thead; $i++){
			$te_str	= $arrh[$i];
			if(count(explode(',', $te_str)) < 3)$te_str.=',center';
			$head[]	= explode(',', $te_str);
		}
		$txt	 = '';	//DBE6E3
		$style	 = "style='padding:5px;border:1px #C9ECFF solid'";
		$cola	 = '#C9ECFF';
		$txt	.= '<table width="100%" class="createrows" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse:collapse;" >';
		$txt	.= '<tr>';
		for($h=0; $h<$thead; $h++)$txt.= '<td '.$style.' bgcolor="#eeeeee" align="'.$head[$h][2].'"><b>'.$head[$h][1].'</b></td>';
		$txt	.= '</tr>';
		foreach($rows as $rs){
			$txt	.= '<tr>';
			for($h=0; $h<$thead; $h++)$txt	.= '<td '.$style.' align="'.$head[$h][2].'">'.$rs[$head[$h][0]].'</td>';
			$txt	.= '</tr>';
		}
		$txt	.= '</table>';
		return $txt;
	}
	
	/**
		post请求
	*/
	public function httppost($url, $data = array())
	{
		$str		= '';
		foreach($data as $k=>$v)$str.='&'.$k.'='.$v.'';
		$content	= substr($str, 1);
		$data_len	= strlen($content);
		$result		= @file_get_contents($url, false, stream_context_create(
					array(
						'http'=>array(
							'method'	=> 'POST', 
							'header'	=> "Content-type: application/x-www-form-urlencoded\r\nContent-Length: $data_len\r\n", 
							'content'	=> $content,
							'timeout'	=> 60
						)
					)
			)
		);
		return $result;
	}
	
	/**
		get请求
	*/
	public function httpget($url, $data = array())
	{
		$str		= '';
		foreach($data as $k=>$v)$str.='&'.$k.'='.$v.'';
		$content	= substr($str, 1);
		$fh 		= '?';
		if($this->contain($url,'?'))$fh = '&';
		if($str!='')$url = $url.$fh.$str;
		$result		= @file_get_contents($url);
		return $result;
	}
}                                                                                                                                                            