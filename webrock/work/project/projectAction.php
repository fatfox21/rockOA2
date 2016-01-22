<?php
class projectClassAction extends Action
{
	
	//管理条件
	public function guanwhere($table)
	{
		$s = "and (optid='$this->adminid' or ".$this->rock->dbinstr('fuzeid', $this->adminid).")";
		return $s;
	}
	
	//项目列表条件
	public function getlistwhere($table)
	{
		$s 			= 'and 1=2';
		$atype		= $this->post('atype');
		$protype	= $this->post('protype', -1);
		//列表
		if($atype == 'list'){
			$s = "and (optid='$this->adminid' or ".$this->rock->dbinstr('fuzeid', $this->adminid).")";	
		}
		if($atype == 'bg'){
			$urs	= m('admin')->getone($this->adminid, 'deptid,id');
			$s 		= "and (".$this->rock->dbinstr('runuserid', 'd'.$urs['deptid'])." or ".$this->rock->dbinstr('runuserid', 'u'.$urs['id']).") and `state`<>'已完成'";	
		}
		if($atype == 'view'){
			$urs	= m('admin')->getone($this->adminid, 'deptid,id');
			$s	 	= "and (".$this->rock->dbinstr('viewuserid', 'd'.$urs['deptid'])." or ".$this->rock->dbinstr('viewuserid', 'u'.$urs['id']).")";	
		}
		if($atype == 'all'){
			$s	= '';
		}
		if($protype==0)$s.=" and `state`='执行中'";
		if($protype==1)$s.=" and `state`='已完成'";
		if($protype==2)$s.=" and ifnull(enddt,'$this->date')<'$this->date'";
		if($protype==3)$s.=" and `state`='待执行'";
		return $s;
	}
	
	public function getlist($table, $rows)
	{
		$dtc	= c('date', true);
		$dbs	= m('projects');
		foreach($rows as $k=>$rs){
			$sjla 	= '';
			$stri 	= '';
			$rows[$k]['days'] = $dtc->datediff('d', $rs['startdt'], $this->date);
			$enddt	= $rs['enddt'];
			$edays	= 'a';
			if(!$this->isempt($enddt)){
				$edays = $dtc->datediff('d', $this->date, $enddt);
			}
			$rows[$k]['edays'] = $edays;
			$arrs	= $dbs->getall("`mid`='".$rs['id']."' order by `id` desc limit 4");
			foreach($arrs as $k1=>$rs1){
				$stri.='<br>'.($k1+1).'、'.$rs1['optname'].'('.$rs1['state'].')，进度('.$rs1['progress'].'%)';
				if(!$this->isempt($rs1['explain']))$stri.='，'.$rs1['explain'].'';
				$stri.=' <font color=#888888>--['.$dtc->formatdt($rs1['optdt'], 'm-d H:i').']</font>';
			}
			$rows[$k]['stri'] = $stri;
		}
		return array('rows'=>$rows);
	}
	
	
	public function addjdaftersave($table, $cans, $id)
	{
		$dbs = m('project');
		$dbs->record(array(
			'state' => $cans['state'],
			'progress' => $cans['progress']
		), "`id`='".$cans['mid']."'");
		$dbs->sendbaogao($cans['mid'], $cans['state'], $cans['progress'], $cans['explain']);
	}
}