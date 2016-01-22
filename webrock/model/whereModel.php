<?php
class whereClassModel extends Model
{
	public function getstring($mnum, $qz='', $uqz='')
	{
		$rows = $this->getall("`mnum`='$mnum' order by `sort`");
		$s	  = '';
		foreach($rows as $k=>$rs){
			$luoji 	= $this->rock->repempt($rs['luoji']);
			$field 	= $rs['field'];
			$value 	= $rs['value'];
			$values = $this->rock->repempt($rs['values']);
			$optlx  = $rs['optlx'];
			if($luoji == ')' || $luoji=='('){
				$s.=' '.$luoji;
				continue;
			}else{
				$key = $value;
				if($values!='')$key=$values;
				$s.=' '.$luoji;
				if($this->rock->contain($field, 'radmin_')){
					$s.=' '.$uqz.'`'.substr($field, 7).'`';
				}else{
					$s.=' '.$qz.'`'.$field.'`';
				}
				if($this->rock->contain($optlx, 'NULL')){
					$s.=' is '.$optlx.'';
				}else if($optlx=='LEFT'){
					$s.=' LIKE \''.$key.'%\'';	
				}else if($optlx=='RIGHT'){
					$s.=' LIKE \'%'.$key.'\'';	
				}else if($this->rock->contain($optlx, 'LIKE')){	
					$s.=' '.$optlx.' \'%'.$key.'%\'';
				}else{
					$s.=' '.$optlx.' \''.$key.'\'';
				}				
			}
		}
		if($s != ''){
			$qzss = substr($s, 0, 6);
			if(!$this->rock->contain($qzss, 'AND')){
				$s = ' AND'.$s;
			}
		}
		return $s;
	}
	
}