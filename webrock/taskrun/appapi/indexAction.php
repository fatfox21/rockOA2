<?php 
class indexClassAction extends appapiAction{
	
	public function initindexAjax()
	{
		$uid 			= $this->adminid;
		$arr['msg']		= '';
		$tos 			= m('admin')->rows("`id`='$uid' and `status`=1 and `type`=1 and `state`<>5");
		if($tos == 0){
			$arr['msg']	= 'exit';
		}else{
			$daiban_total 	= m('daiban')->totaldaiban($uid);
			$todo_total 	= m('todo')->rows("`uid`='$uid' and `status`=0");
			
			$titles 		= array();
			$arr['total'] 	= array(
				'daiban'		=> $daiban_total,
				'todo'			=> $todo_total
			);
			
			//会议
			$time 		= time();
			$meetarr 	= m('meet')->getmeet($this->date, $uid);
			foreach($meetarr as $k=>$rs){
				if($time<$rs['endtime']){
					$titles['meet'] = '['.$rs['startdt'].']'.$rs['title'].'('.$rs['state'].')';
					break;
				}
			}
			$arr['total']['meet']	= count($meetarr);
			
			//未通过
			$listcheck = m('flow_bill')->rows("`uid`='$uid' and `isdel`=0 and `nstatus`=2");
			$listchecks= '';
			if($listcheck>0)$listchecks = '<font color=red>处理未通过'.$listcheck.'条</font>';
			$titles['listcheck'] = $listchecks;
			
			//REIM未读的
			$reimarr 	= m('reim')->getwdarr($uid);
			$reim_total = 0;
			foreach($reimarr as $k=>$rs){
				$reim_total+=$rs['stotal'];
			}
			$arr['total']['reim'] = $reim_total;
			$arr['reimarr']= $reimarr;
			
			//工作任务
			$wecrto = m('work')->getwwctotal($uid);
			$work	= '';
			if($wecrto>0)$work = '<font color=red>未完成'.$wecrto.'条</font>';
			$titles['work'] = $work;
			$arr['total']['work'] = m('work')->getwwcwork($uid, 1);

			$arr['titles'] = $titles;
		}
		$this->showreturn($arr);
	}
	
	
	public function todoAjax()
	{
		$db		= m('todo');
		$where  = "`uid`='$this->adminid' order by `status`,`id` desc limit 5";
		$wdto   = $db->rows("`uid`='$this->adminid' and `status`=0");
		if($wdto>0)$where  = "`uid`='$this->adminid' and `status`=0 order by `status`,`id` desc limit 10";
		$ids 	= '0';
		$rows 	= $db->getall($where,'`title`,`mess`,`status`,`optdt`,`id`,`table`,`mid`');
		foreach($rows as $k=>$rs){
			if($rs['status']==0)$ids .=','.$rs['id'];
		}
		if($ids!='0')$db->update("`status`=1","`id` in($ids)");
		$this->showreturn($rows);
	}

	
	//获取通讯录
	public function getcardAjax()
	{
		$rows = m('admin')->getall("`status`=1 and `state`<>5 order by `sort`",'`id`,`name`,`face`,`ranking`,`deptname`,`mobile`,`email`,`tel`,`gender`');
		$arr['rows'] 	= $rows;
		$arr['imgroup'] = $this->getmygroup();
		$this->showreturn($arr);
	}
	
	public function getgroupAjax()
	{
		$arr = $this->getmygroup();
		$this->showreturn($arr);
	}
	
	private function getmygroup()
	{
		$rows 	= m('reim')->getgroup($this->adminid);
		return $rows;
	}
	
	
}