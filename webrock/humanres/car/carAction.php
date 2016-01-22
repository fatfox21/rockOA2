<?php
class carClassAction extends Action
{
	public function chantgeupcarse($table, $cans, $id)
	{
		$fields = $cans['fields'];
		$value 	= $cans['value'];
		$fielarr = $this->db->getallfields('[Q]carm');
		if(in_array($fields, $fielarr)){
			m('carm')->record(array($fields=>$value), $cans['mid']);
		}
	}
	
	public function getcardataAjax()
	{
		$rows = m('carm')->getall("`ispublic`=1 and `state`='可用'",'carnum,id');
		echo json_encode($rows);
	}
	
	public function panduanyuding($table, $cans, $id)
	{
		$msg 	 	= '';
		$startdt 	= $cans['startdt'];
		$enddt 		= $cans['enddt'];
		$carid		= $cans['carid'];
		if($startdt>=$enddt)$msg='截止时间小于开始时间，不科学啊';
		if($msg==''){
			$where = "id <>'$id' and `carid` = '$carid' and `status` in(0,1) and ((`startdt`<='$startdt' and `enddt`>='$startdt') or (`startdt`<='$enddt' and `enddt`>='$enddt') or (`startdt`>='$startdt' and `enddt`=<'$enddt'))";
			if(m($table)->rows($where)>0)$msg='车辆该时间段已被预定了';
		}
		return array('msg'=>$msg);
	}
	
	public function yudingcarlist($table, $rows)
	{
		$dt 	= $this->date;
		$dtobj 	= c('date');
		$db 	= m('careserve');
		for($i=0;$i<5;$i++){
			if($i>0)$dt = $dtobj->adddate($dt,'d',1);
			
			foreach($rows as $k=>$rs){
				$carid 	= $rs['id'];
				$arr 	= $db->getall("`carid`='$carid' and `status` in(0,1) and `startdt`<='$dt 23:59:59' and `enddt`>='$dt 00:00:00' order by `startdt` asc",'`usename`,`status`,`startdt`,`enddt`');
				$str 	= '';
				foreach($arr as $k1=>$rs1){
					$stz = '<font color=blue>待审核</font>';
					if($rs1['status']==1)$stz = '<font color=green>已审核</font>';
					$str.=''.$rs1['usename'].'使用('.$stz.')<br>'.substr($rs1['startdt'],5,11).'→'.substr($rs1['enddt'],5,11).'<br>';
				}
				$rows[$k]['dt'.$i.''] = $str;
			}
		}
		return array('rows'=>$rows);
	}
}