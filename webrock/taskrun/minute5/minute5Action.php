<?php 
/**
	5分钟执行一次的
*/
class minute5ClassAction extends Action{
	
	public function runtaskAjax()
	{
		$this->meettodo();
		$this->worktodo();
		echo 'success';
	}
	
	/**
		会议通知
	*/
	private function meettodo()
	{
		$db		= m('meet');
		$rows 	= $db->getall("`status` in(0,1) and `type`=0");
		$time	= time();
		$todo	= m('todo');
		$adm	= m('admin');
		$zttz	= $this->option->getval('meettodo_zann');
		$retz	= $this->option->getval('meettodo_reim');
		foreach($rows as $k=>$rs){
			$zt 	= $rs['status'];
			$dts	= explode(' ', $rs['startdt']);
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
					if($jg <= 6*60 && $rs['istz'] == 0 && $zt==0){
						$istz = 1;
						$nzt  = 0;
						$tzuid = $adm->gjoin($rs['joinid']);//添加通知
						$cont  = '['.$rs['title'].']会议将在5分钟后'.$dts[1].'开始，请做好准备,会议室['.$rs['hyname'].']';
						if($tzuid != ''){
							if($zttz=='是')$todo->add($tzuid, '会议通知', $cont);
							if($retz=='是')m('reim')->sendsystem(0, $tzuid, '会议通知', $cont);
						}
					}
				}
			}
			if($nzt != -1){
				$db->update("`status`='$nzt', `istz`='$istz'", $rs['id']);
			}
		}
	}
	
	/**
		任务通知
	*/
	private function worktodo()
	{
		$dt		= $this->date;
		$todo	= m('todo');
		$rows 	= m('work')->getall("`mid`>0 and `istx`=1 and `state` in('待执行','执行中')");
		$time	= time();
		foreach($rows as $k=>$rs){
			$sttime = strtotime($rs['startdt']);
			$state  = $rs['state'];
			$bgtime  = $rs['bgtime'];
			$ettime	= 999999999999;
			
			if(!$this->isempt($rs['enddt']))$ettime = strtotime($rs['enddt']);
			$jg = $sttime - $time;
			
			if($jg <= 6*60 && $jg>=0 && $state =='待执行'){
				$todo->addtz($rs['distid'], '工作任务', '['.$rs['type'].'.'.$rs['title'].']待执行', 'work', $rs['mid']);
			}
			
			if(!$this->isempt($bgtime) && $ettime >= $time && $sttime <= $time){
				$bgsj 	= "$dt $bgtime";
				$bgsj1 	= strtotime($bgsj);
				$jg 	= $bgsj1 - $time;
				
				if($jg <= 6*60 && $jg>=0){
					$todo->addtz($rs['distid'], '任务报告', '['.$rs['title'].']请在'.$bgsj.'前填写任务报告给'.$rs['baoname'].'', 'workbao', $rs['mid']);
				}
			}
		}
	}
	private function workurl($sid)
	{
		
	}
}