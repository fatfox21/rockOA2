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
		$s 	= '<table border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">';
		if($title != ''){
			$s .= '<tr><td colspan="3" align="center" style="border:1px '.$bordercolor.' solid;padding:10px;font-size:16px;background:#2CB2F9;color:white">'.$title.'</td></tr>';
		}
		foreach($fields as $fid=>$na){
			$val = '';
			if(isset($arr[$fid]))$val = $arr[$fid];
			$s .= '<tr><td align="right" width="120" style="border:1px '.$bordercolor.' solid;padding:5px 8px">'.$na.'</td><td  style="border:1px '.$bordercolor.' solid;padding:8px" align="left">'.$val.'</td></tr>';
		}
		$s .='</table>';
		
		return $s;
	}
}                                                                                                                                                            