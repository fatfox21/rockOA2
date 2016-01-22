<?php
class suppleClassAction extends Action
{
	public function publicstoreAfter($table, $rows)
	{
		$db 		= m('supple');
		$db1 		= m('option');
		$typearr 	= $db1->getmnum('suppletype');
		$_arrarr	= array();
		foreach($typearr as $k=>$rs)$_arrarr[$rs['id']]=$rs['name'];
		if($table == 'supplea'){
			$uid = '0';
			$aid = '0';
			foreach($rows as $k=>$rs){
				$uid.=','.$rs['uid'];
				$aid.=','.$rs['aid'];
			}
			$uarr= m('admin')->getarr("id in($uid)", 'name,deptname');
			$aarr= $db->getarr("id in($aid)", 'name');
			
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
				$rows[$k]['total'] 	= $db->kc($rs['id']);
				$v1= '';
				if(isset($_arrarr[$rs['typeid']]))$v1=$_arrarr[$rs['typeid']];
				$rows[$k]['typename'] = $v1;
			}
		}
		
		return array(
			'rows'		=> $rows,
			'typearr'	=> $typearr
		);
	}
	
	public function savesupplebefore($table, $cans, $id)
	{
		$name 	= $cans['name'];
		$num 	= $cans['num'];
		$model 	= $cans['model'];
		$msg	= '';
		if(m('supple')->iscz($name, $num, $model, $id))$msg='该物品/编号已存在';
		return array(
			'msg'		=> $msg
		);
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
	
	/**
		导入
	*/
	public function importAjax()
	{
		$typeid = (int)$this->get('typeid');
		$import	= c('PHPExcelReader', true);
		$rows	= $import->reader();
		$db		= m('supple');
		$oi		= 0;
		$sort 	= (int)$db->getmou('max(`sort`)', '`id`>0')+1;
		foreach($rows as $k=>$rs){
			$a	= array(
				'name'		=> $rs['A'],
				'num'		=> $rs['B'],
				'model'		=> $rs['C'],
				'price'		=> $rs['D'],
				'unit'		=> $rs['E'],
				'typeid'	=> $typeid,
				'optdt'		=> $this->now,
				'sort'		=> $sort+$oi
			);
			$bo = $db->iscz($a['name'], $a['num'], $a['model']);
			if(!$bo){
				$oi++;
				$db->insert($a);
			}
		}
		$this->backmsg('', '成功导入'.$oi.'条');
	}
}