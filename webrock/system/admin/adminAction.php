<?php
class adminClassAction extends Action
{
	
	private function isexiset($user, $name, $id=0)
	{
		$msg = '';
		$dbs = m('admin');
		if($dbs->rows("`user`='$user' and `id`<>'$id'")>0)$msg ='用户名['.$user.']已存在';
		if($msg == ''){
			if($dbs->rows("`name`='$name' and `id`<>'$id'")>0)$msg ='姓名['.$name.']已存在';
		}
		return $msg;
	}
	
	public function publicstoreBefore($table)
	{
		return array(
			'fields' => 'id,user,name,tel,email,status,groupname,gender,mobile,type,ranking,superman,superid,deptid,deptname,sort,quitdt,status,type,state,workdate,isdaily,isvcard,positivedt,syenddt,companyid'
		);
	}
	
	public function publicstoreAfter($table, $rows)
	{
		$group	= m('group')->getall('1=1 order by `sort`', '`id`,`name`');
		$dbs 	= m('company');
		foreach($rows as $k=>$rs){
			$rows[$k]['companyname']=$dbs->getmou('name', $rs['companyid']);
		}
		return array('group'=>$group,'rows'=>$rows);
	}

	public function publicbeforesave($table, $cans, $id)
	{
		$user 		= $cans['user'];
		$name 		= $cans['name'];
		$groupid 	= $cans['groupname'];
		$msg  		= '';
		
		$msg 		= $this->isexiset($user, $name, $id);
		$rows 		= array();
		
		if($msg == ''){
			$did  = $cans['deptid'];
			$sup  = $cans['superid'];
			
			$rows = $this->getuninf($did, $sup);
		}
		$rows['groupname'] = $this->rock->post('groupnamess');
		$arr = array('msg'=>$msg,'rows'=>$rows);
		return $arr;
	}
	
	public function publicaftersave($table, $cans, $id)
	{
		m($table)->record(array('superman'=>$cans['name']), "`superid`='$id'");
		$this->savegroup($id, $this->post('groupnamePost'));
	}
	
	private function getuninf($did, $sup)
	{
		$rows = m('admin')->getadminjoin($did, $sup);
		return $rows;
	}
	
	public function updatedataAjax()
	{
		echo m('admin')->updatedata();
	}
	
	
	
	public function getugroupAjax()
	{
		$id	= (int)$this->rock->request('id');
		$ugs	= '[0]';
		$rows	= m('sjoin')->getall("`type`='ug' and `mid`='$id'",'sid');
		foreach($rows as $k=>$rs)$ugs.=',['.$rs['sid'].']';
		echo $ugs;
	}
	
	public function savegroupAjax()
	{
		$id		= (int)$this->rock->post('id');
		$s		= $this->rock->post('s');
		$this->savegroup($id, $s);
	}
	
	private function savegroup($id, $s)
	{
		$this->db->delete($this->T('sjoin'), "`type`='ug' and `mid`='$id'");
		if(!$this->rock->isempt($s))$this->db->insert($this->T('sjoin'), '`type`,`mid`,`sid`,`indate`', "select 'ug','$id',`id`,'$this->now' from `[Q]group` where `id` in($s)", true);
	}
	
	
	//导入
	public function importAjax()
	{
		$import	= c('PHPExcelReader', true);
		$cdt	= c('date', true);
		$rows	= $import->reader();
		$db		= m('admin');
		$dbs	= m('dept');
		$oi		= 0;
		$sort 	= (int)$db->getmou('max(`sort`)', '`id`>0')+1;
		foreach($rows as $k=>$rs){
			$arr	= array(
				'user'		=> $rs['A'],
				'name'		=> $rs['B'],
				'gender'	=> $rs['C'],
				'ranking'	=> $rs['D'],
				'deptname'	=> $rs['E'],
				'mobile'	=> $rs['F'],
				'email'		=> $rs['G'],
				'workdate'	=> substr($rs['H'],1,-1),
				'type'		=> '1',
				'state'		=> '2',//默认为试用期
				'status'	=> '1',
				'pass'		=> md5('123456'),
				'optdt'		=> $this->now,
				'adddt'		=> $this->now,
				'optid'		=> $this->adminid,
				'optname'	=> $this->adminname,
				'sort'		=> $sort+$oi
			);
			if(!$this->isempt($arr['user']) && !$this->isempt($arr['name']) ){
				if(!$cdt->isdate($arr['workdate']))$arr['workdate']='';
				$msg 		= $this->isexiset($arr['user'], $arr['name']);
				$deptid 	= (int)$dbs->getmou('id', "`name`='".$arr['deptname']."'");
				if($deptid==0)$arr['deptname'] = '';
				$arr['deptid'] = $deptid;
				if($msg==''){
					$oi++;
					$db->insert($arr);
				}
			}
		}
		$this->backmsg('', '成功导入'.$oi.'条,记得更新数据');
	}
}