<?php 
class publicClassAction extends Action{
	
	public function getfieldsAjax()
	{
		$table	= $this->rock->post('table');
		$fields	= $this->rock->post('storefields','*');
		$atype	= (int)$this->rock->post('atype');
		$arr	= $this->db->gettablefields($this->T($table));
		
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
		if($atype == 1)$uarr=array();
		
		$farr	= array_merge($uarr, $arr);
		$rows	= array();
		foreach($farr as $k=>$rs){
			$va = $rs['explain'];
			$vn = $rs['name'];
			if($fields != '*'){
				if(!$this->rock->contain(','.$fields.',', ','.$vn.','))continue;
			}
			if(!$this->rock->isempt($va)){
				$vas = explode('@', $va);
				$va	 = $vas[0];
			}
			if(!$this->rock->isempt($va)){
				$rows[] = array($vn, $va);
			}
		}
		echo  json_encode($rows);
	}
}