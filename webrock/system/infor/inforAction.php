<?php
class inforClassAction extends Action
{

	public function savedocAjax()
	{
		$fileid		= $this->post('fileid');
		$typeid		= (int)$this->post('typeid','0');
		$typename	= $this->post('typename');
		$atype		= $this->post('atype');
		$this->db->insert('[Q]word', 'typename,`typeid`,`adddt`,`fileid`,`sort`,filename,filesizecn,fileext,optname,atype,optid', "select '$typename','$typeid',adddt,id,0,filename,filesizecn,fileext,'$this->adminname','$atype','$this->adminid' from [Q]file where id in($fileid)", true);
	}
	
	
	public function viewAction()
	{
		$id	 	= $this->get('id');
		$db		= m('infor');
		$db->update('hits=hits+1', $id);
		$rs		= $db->getone($id);
		$this->title = $rs['title'];
		$this->smartydata['rs'] = $rs;
		
		$this->smartydata['filers'] = m('file')->getall("mtype='infor' and mid='".$rs['id']."' order by `id`",'filename,filesizecn,id');
	}
	
	//保存共享
	public function saveshateAjax()
	{
		$type 		= $this->post('typePost');
		$shateuid 	= $this->post('shateuidPost');
		$shatename	= $this->post('shatenamePost');
		$sid		= $this->post('sidPost','0');
		if($type=='not'){
			$shateuid = '';
			$shatename= '';
		}
		if($type=='all'){
			$shateuid = 'all';
			$shatename= '所有人员';
		}
		if($type=='dept'){
			$shateuid = 'dept';
			$shatename= '本部门';
		}
		m($this->post('tablename_postabc'))->update(array(
			'shateuid'	=> $shateuid,
			'shatename'	=> $shatename,
		), "`id` in($sid)");
		$this->backmsg();
	}
	
	public function fileshatewhere()
	{
		$urs	= m('admin')->getone($this->adminid, 'deptid,id');
		$s 		= " and ( ".$this->rock->dbinstr('shateuid', 'd'.$urs['deptid'])." or ".$this->rock->dbinstr('shateuid', 'u'.$urs['id'])." or `shateuid`='all' or (`shateuid`='dept' and `optid` in(select id from `[Q]admin` where instr(deptpath,'[".$urs['deptid']."]'))>0 ) )";	
		return $s;
	}
	
	public function beforeinforgong($table)
	{
		
		$s1 = m('admin')->getjoinstr('faobjid', $this->adminid);
		$s 	= 'and isshow=1 '.$s1.'';
		$this->gongwhere = $s;
		return $s;
	}
	
	//首页信息列表
	public function inforgong($table, $rows)
	{
		$dtc = c('date');
		$sid = m('log')->getread($table);
		$wyd = m($table)->rows("`id` not in($sid) $this->gongwhere");
		$sid = ','.$sid.',';
		
		foreach($rows as $k=>$rs){
			$rows[$k]['days'] = $dtc->datediff('d', $rs['optdt'], $this->date);
			$rows[$k]['xuhao'] = $k+1;
			$wd = 1;
			if($this->contain($sid, ','.$rs['id'].','))$wd=0;
			$rows[$k]['wd'] 	= $wd;
		}
		
		return array(
			'rows'	=> $rows,
			'wdtotal'	=> $wyd
		);
	}
	
	//推送到REIM
	public function reimsendinfor($table, $cans, $id)
	{
		if($this->post('isreimPost')!='1')return;
		$recrids = $cans['faobjid'];
		$recruid = m('admin')->gjoin($recrids);
		if($recruid=='')return;
		$reim 	= m('reim');
		$cont	= '['.$cans['typename'].']'.$cans['title'].'';
		$url	= $reim->createurl('gong', $id);
		$reim->sendsystem($this->adminid, $recruid, 'OA通告', $cont, 'infor',$id, $url);
	}
}