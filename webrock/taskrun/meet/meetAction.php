<?php 
class meetClassAction extends Action{
	
	//读取固定
	public function fixedAjax()
	{
		$dtobj  = c('date');
		$dt		= $this->rock->date;
		for($i=0; $i<=2; $i++){
			if($i>0)$dt = $dtobj->adddate($dt, 'd', 1);
			$this->getfixedmeet($dt);
		}
		echo 'success';
	}
	
	private function getfixedmeet($dt)
	{
		$db		= m('meet');
		$rows 	= $db->getall("`state`=1 and `type`=1");
		$isxx	= m('kq_xiu')->rows("`date`='$dt'");
		$W		= $this->rock->cnweek($dt);//星期
		foreach($rows as $k=>$rs){
			$arr	= $rs;
			$arr['type'] 	= '0';
			$arr['mid']  	= $rs['id'];
			$arr['startdt'] = $dt.' '.$rs['startdt'];
			$arr['enddt'] 	= $dt.' '.$rs['enddt'];
			$arr['rate'] 	= '';
			$arr['state'] 	= 0;
			$arr['status'] 	= 1;
			$arr['isturn'] 	= 1;
			$arr['statusman'] 		= '';
			$arr['nowcheckname'] 	= '';
			$arr['nowcheckid'] 		= '';
			$arr['allcheckid']		= '';
			unset($arr['id']);
			$where	= "`startdt` like '".$dt."%' and `mid`='".$rs['id']."'";
			$jibo 	= $db->rows($where);
			if($jibo > 0){
				$db->update($arr, $where);
				continue;
			}	
			$rate 	= $this->rock->strformat(',?0,', $rs['rate']);
			$isadd	= 0;
			if($this->contain($rate, ',工作日,') && $isxx==0)$isadd = 1;
			if($isadd==0)if($this->contain($rate, ',周'.$W.','))$isadd = 1;
			if($isadd == 1){
				$arr['optdt'] 	= $this->now;
				$db->insert($arr);
			}
		}
	}
}