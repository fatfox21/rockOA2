<?php
class meetClassAction extends Action
{
	public function applymeetbefore($table, $cans, $id)
	{
		$msg 		= '';
		$startdt 	= $cans['startdt'];
		$enddt 		= $cans['enddt'];
		$hyname 	= $cans['hyname'];
		$where 		= "id <> '$id' and `hyname`='$hyname' and type=0 and ((`startdt`<'$startdt' and `enddt`>'$startdt') or (`startdt`<'$enddt' and `enddt`>'$enddt') or (`startdt`>'$startdt' and `enddt`<'$enddt')) and `status` in(0,1)";
		if(m($table)->rows($where)>0){
			$msg = '该会议室的时间段已经申请过了';
		}
		return $msg;
	}
	
	public function getmeetAjax()
	{
		$y	= $this->get('year');
		$m	= $this->get('month');
		$month	= ''.$y.'-'.$m.'';
		$dtobj	= c('date');
		$max 	= $dtobj->getmaxdt($month);
		$db 	= m('meet');
		$arr 	= array();
		for($i=1; $i<=$max;$i++){
			$oi = $i;
			if($oi<10)$oi='0'.$i;
			$dt = $month.'-'.$oi;
			$s 		= '';
			$rows 	= $db->getall("`startdt` like '$dt%' and `type`=0 and `status`=1 and `state`<>3 order by `startdt`",'`title`,`startdt`,`enddt`,`hyname`,`joinname`');
			foreach($rows as $k=>$rs){
				$dt1 = explode(' ', $rs['startdt']);
				$dt2 = explode(' ', $rs['enddt']);
				$s .= ''.($k+1).'.['.$rs['hyname'].'.'.$rs['title'].']'.substr($dt1[1],0,5).'-'.substr($dt2[1],0,5).'<br>';
			}
			$arr[$i] = $s;
		}
		echo json_encode($arr);
	}
	
	public function cancelmeetAjax()
	{
		$id = $this->post('id');
		$sm = $this->post('sm');
		m('meet')->update(array(
			'state' => 3,
			'cancelreason' => $sm
		),"`id`='$id' and `state`=0");
		echo 'success';
	}
}