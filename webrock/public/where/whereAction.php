<?php 
class whereClassAction extends Action{
	
	
	public function downexcelAjax()
	{
		$jm		= c('jm', true);
		$fields	= $jm->unescape($this->rock->get('fields'));
		$title	= $jm->unescape($this->rock->get('title'));
		$cont	= $jm->unescape($this->rock->get('content'));
		
		$farr	= explode(',', $fields);
		$hearArr= array();
		for($i=0; $i<count($farr); $i++){
			$hearArr[$i] = $farr[$i];
		}
		$excel	 = c('PHPExcel', true);
		$excel->title	= $title;
		$excel->headArr	= $hearArr;
		$excel->titlebool	= false;
		$excel->borderbool	= false;
		$excel->rows	= array(explode(',', $cont));
		$excel->display();
	}
	
	public function defaultAction()
	{
		$this->display = false;
		//$db		= m('where');
		//echo $db->getstring('flowcourse_2');
		
		//$aa = 'wewwe';
		
		$flow = f('leave');
		$flow->initrecord(3);
		$flow->getflow();
		print_r($flow->flowarr);
	}
	
	public function getfieldAjax()
	{
		$db		= m('where');
		$table	= $this->rock->post('table');
		$mnum	= $this->rock->post('mnum');
		$istype	= (int)$this->rock->post('istype');
		$arr	= $this->db->gettablefields($this->T($table));
		$uarr	= array();
		
		if($istype == 2){
			$uarr[] = array(
				'name' => 'radmin_name',
				'explain' => '用户姓名'
			);
			$uarr[] = array(
				'name' => 'radmin_id',
				'explain' => '用户ID'
			);
			$uarr[] = array(
				'name' => 'radmin_ranking',
				'explain' => '用户职位'
			);
			$uarr[] = array(
				'name' => 'radmin_deptname',
				'explain' => '用户部门'
			);
		}
		
		$list	= array();
		
	
		$clidra = $db->getall("`mnum`='$mnum' order by `sort`");
		$name	= '';
		if($this->db->count>0)$name=$clidra[0]['explain'];
		$list[] = array(
			'name'=>$name,
			'clildren' => $clidra
		);
		
		echo json_encode(array(
			'fields'	=> array_merge($uarr, $arr),
			'list'		=> $list
		));
	}
	
	public function saveAjax()
	{
		$stotal	= (int)$this->rock->post('stotal');
		$mnum	= $this->rock->post('mnum');
		$ids	= array();
		$db		= m('where');
		$ida	= '0';
		for($i=0; $i<$stotal; $i++){
			$id	= $this->rock->post('id_'.$i);
			if($this->rock->contain($id, 'rand'))$id='0';
			$id	= (int)$id;
			$where = '';
			if($id>0)$where="`id`='$id'";
			$arr= array(
				'name'	=> $this->rock->post('name_'.$i),
				'field'	=> $this->rock->post('field_'.$i),
				'optlx'	=> $this->rock->post('optlx_'.$i),
				'value'	=> $this->rock->post('value_'.$i),
				'values'=> $this->rock->post('values_'.$i),
				'luoji'=> $this->rock->post('luoji_'.$i),
				'sort'	=> $i,
				'mnum'	=> $mnum,
				'optdt'	=> $this->now,
				'optid'	=> $this->adminid,
			);
			if($i==0)$arr['explain']=$this->rock->post('explain');
			$db->record($arr, $where);
			if($id==0)$id=$this->db->insert_id();
			$ids[] = $id;
			$ida.=','.$id.'';
		}
		$db->delete("`mnum`='$mnum' and `id` not in($ida)");
		echo json_encode($ids);
	}
}