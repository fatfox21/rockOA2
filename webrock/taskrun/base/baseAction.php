<?php 
class baseClassAction extends Action{
	

	
	//固定
	public function meetAjax()
	{
		$db		= m('meet');
		$rows 	= $db->getall("`status`=1 and `type`=1");
		$dt		= $this->rock->date;
		$isxx	= m('kq_xiu')->rows("`date`='$dt'");
		$W		= $this->rock->cnweek($dt);//星期
		foreach($rows as $k=>$rs){
			$jibo = $db->rows("`startdt` like '".$dt."%' and `mid`='".$rs['id']."'");
			if($jibo > 0)continue;
			$rate = $this->rock->strformat(',?0,', $rs['rate']);
			$isadd= 0;
			if($this->rock->contain($rate, ',工作日,') && $isxx==0)$isadd = 1;
			if($isadd==0)if($this->rock->contain($rate, ',周'.$W.','))$isadd = 1;
			
			if($isadd == 1){
				$arr = $rs;
				$arr['type'] = '0';
				$arr['mid']  	= $rs['id'];
				$arr['startdt'] = $dt.' '.$rs['startdt'];
				$arr['enddt'] = $dt.' '.$rs['enddt'];
				$arr['rate'] = '';
				$arr['optdt'] = $this->now;
				$arr['status'] = 0;
				$arr['id']		= 0;
				$db->insert($arr);
			}
		}
		echo 'success';
	}
	
	public function meetupdateAjax()
	{
		$db		= m('meet');
		$rows 	= $db->getall("`status` in(0,1) and `type`=0");
		$time	= time();
		$todo	= m('todo');
		foreach($rows as $k=>$rs){
			$zt 	= $rs['status'];
			$sttime = strtotime($rs['startdt']);
			$ettime = strtotime($rs['enddt']);
			$nzt	= -1;
			$istz	= 0;
			if($ettime <= $time){
				$nzt = 2;
			}else{
				$jg = $sttime - $time;
				if($jg<=0){
					if($zt==0)$nzt = 1;//进行中
				}else{
					if($jg <= 6*60 && $rs['istz'] == 0){
						$istz = 1;
						$nzt  = 0;
						//添加通知
					}
				}
			}
			if($nzt != -1){
				$db->update("`status`='$nzt', `istz`='$istz'", $rs['id']);
			}
		}
		echo 'success';
	}
}