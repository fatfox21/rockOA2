<?php
class suppleClassAction extends Action
{
	public function publicstoreAfter($table, $rows)
	{
		if($table == 'supplea'){
			$uid = '0';
			$aid = '0';
			foreach($rows as $k=>$rs){
				$uid.=','.$rs['uid'];
				$aid.=','.$rs['aid'];
			}
			$uarr= m('admin')->getarr("id in($uid)", 'name,deptname');
			$aarr= m('supple')->getarr("id in($aid)", 'name');
			
			foreach($rows as $k=>$rs){
				if(isset($uarr[$rs['uid']])){
					$rows[$k]['name'] 		= $uarr[$rs['uid']]['name'];
					$rows[$k]['deptname'] 	= $uarr[$rs['uid']]['deptname'];
				}
				if(isset($aarr[$rs['aid']])){
					$rows[$k]['aname'] 		= $aarr[$rs['aid']]['name'];
				}	
			}
		}else{
			foreach($rows as $k=>$rs){
				$rows[$k]['total'] = m('supple')->kc($rs['id']);
			}
		}
		return array('rows'=>$rows);
	}
	
	public function applyAjax()
	{
		$total	= (int)$this->rock->post('total');
		$db 	= m('supplea');
		for($i=0; $i<$total; $i++){
			$arr['explain']	= $this->rock->post('explain_'.$i);
			$arr['total']	= $this->rock->post('total_'.$i);
			$arr['aid']		= $this->rock->post('aid_'.$i);
			$arr['optdt']	= $this->now;
			$arr['uid']		= $this->adminid;
			$arr['status']	= 0;
			$db ->insert($arr);
		}
	}
	
	//入库
	public function inrukuAjax()
	{
		$total	= (int)$this->post('total');
		$status	= (int)$this->post('status');
		$db 	= m('supplea');
		for($i=0; $i<$total; $i++){
			$arr['total']	= $this->rock->post('total_'.$i);
			$arr['aid']		= $this->rock->post('aid_'.$i);
			$arr['optdt']	= $this->now;
			$arr['optid']	= $this->adminid;
			$arr['statusman']	= $this->adminname;
			$arr['status']	= $status;
			$db ->insert($arr);
		}
	}
	
	public function qihuanAjax()
	{
		$id	= (int)$this->rock->request('id');
		$arr = array(
			'status' => $this->rock->request('status'),
			'statusman' => $this->adminname,
			'checkdt' => $this->now,
		);
		m('supplea')->update($arr, $id);
	}
	
	public function getsuppleAjax()
	{
		$rows = m('supple')->getall('1 order by sort,optdt desc','`id`,`name`');
		$arr['rows'] = $rows;
		echo json_encode($arr);
	}
}