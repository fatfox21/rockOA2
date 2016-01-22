<?php
class workhClassAction extends Action
{
	public function gettodayAjax()
	{
		$rows 	= array();
		$dt 	= $this->date;
		$uid 	= $this->adminid;
		
		//今日工作任务
		$rows 	= m('work')->getwwcwork($uid);
		foreach($rows as $k=>$rs){
			$rows[$k]['tabsnum'] = 'workmwc';
			$rows[$k]['tabstitle'] = '未完成任务';
			$rows[$k]['tabsurl'] = 'work,work,mwc,atype=1';
		}
		
		
		//今日会议
		$marr	= m('meet')->getmeet($dt, $uid);
		foreach($marr as $k=>$rs){
			$marr[$k]['tabsnum'] = 'meetapply';
			$marr[$k]['tabstitle'] = '会议室预定';
			$marr[$k]['tabsurl'] = 'humanres,meet,apply';
		}
		
		$rows 	= array_merge($rows, $marr);
		
		//日程事务
		$marr 	= m('schedule')->getdtarr($dt, $uid);
		foreach($marr as $k=>$rs){
			$_rs['type'] = '日程事务';
			$_rs['title'] = $rs['title'];
			$s1 = $s2 = $s = '';
			if($this->contain($rs['startdt'], $dt)){
				$dsts= explode(' ', $rs['startdt']);
				$s1  = $dsts[1];
			}else{
				$s1 = '00:00:00';
			}
			if($this->contain($rs['enddt'], $dt)){
				$dsts= explode(' ', $rs['startdt']);
				$s=''.$s1.'至'.$dsts[1].'';
			}else if(!$this->isempt($rs['enddt'])){
				$s=''.$s1.'至23:59:59';
			}else{
				$s='今日'.$s1.'';
			}
			$_rs['startdt']= $s;
			
			$_rs['tabsnum'] = 'schedule';
			$_rs['tabstitle'] = '日程事务';
			$_rs['tabsurl'] = 'person,schedule';
			$rows[] = $_rs;
		}
		
		//项目的
		$urs	= m('admin')->getone($this->adminid, 'deptid,id');
		$s = "and (".$this->rock->dbinstr('runuserid', 'd'.$urs['deptid'])." or ".$this->rock->dbinstr('runuserid', 'u'.$urs['id']).") and `state`<>'已完成'";	
		$marr 	= m('projectm')->getall("1 $s order by `id` desc", '`typename`,`startdt`,`state`,`progress`,`title`');
		$dbobj  = c('date', true);
		foreach($marr as $k=>$rs){
			$_rs['type'] 	= $rs['typename'];
			$_rs['title'] 	= $rs['title'];
			$_rs['state'] 	= $rs['state'].'('.$rs['progress'].'%)';
			$dtss				= explode(' ', $rs['startdt']);
			$jgts				= $dbobj->datediff('d', $dtss[0], $this->date);
			$_rs['startdt']		= $dtss[0].'(执行'.$jgts.'天)';
			
			$_rs['tabsnum'] 	= 'projectbg';
			$_rs['tabstitle'] 	= '项目进度报告';
			$_rs['tabsurl'] 	= 'work,project,list,atype=bg';
			$rows[] = $_rs;
			
		}	
		
		
		foreach($rows as $k=>$rs){
			$rows[$k]['xuhao'] = $k+1;
		}
		if(count($rows)==0){
			$rows[] = array(
				'title'		=> '<div style="font-size:16px;height:40px;line-height:35px">无信息</div>',
				'xuhao'		=> ''
			);
		}
		echo json_encode(array('rows'=>$rows,'totalCount'=>count($rows)));
	}

}