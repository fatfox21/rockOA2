<?php 
class todoClassAction extends Action{
	
	public function jisanstatela($table, $rows)
	{
		$dta = c('date', true);
		foreach($rows as $k=>$rs){
			$dt = explode(' ', $rs['optdt']);
			$jg = $dta->datediff('d', $dt[0], $this->date);
			$str = '';
			if($jg==0){
				$str = '今天';
			}else if($jg==1){
				$str = '昨天';
			}else if($jg==2){
				$str = '前天';
			}else if($jg<15){
				$str = ''.$jg.'天前';
			}else{
				$str = '更早';
			}
			$rows[$k]['temp_atype'] = $str;
			$rows[$k]['xuhao'] = $k+1;
			$rows[$k]['optdt'] = $dta->stringdt($rs['optdt']);
		}
		if(count($rows)==0){
			$rows[] = array(
				'mess'		=> '<div style=font-size:16px;height:40px;line-height:35px>无提醒</div>',
				'xuhao'		=> ''
			);
		}
		return array(
			'wdcount'	=> m($table)->rows("uid='$this->adminid' and `status`=0"),
			'rows'		=> $rows
		);
	}
}