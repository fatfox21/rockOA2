<?php 
/**
	修改记录插件
*/
class editChajian extends Chajian{
	
	public $editarr = array();
	
	/**
		获取修改记录
		$table 表
		$id id值
		$narr 新数组
		return string
	*/
	public function record($table, $id, $narr, $glx=1)
	{
		$str	= '';
		$db 	= m($table);
		$oners	= $db->getone($id);
		$this->editarr = array();
		if($oners){
			$farr = $this->getfield($table);
			$str  = $this->editcont($farr, $oners, $narr);
		}
		if($glx == 1 && $str != ''){
			$str  = '['.$this->adminname.']('.$this->rock->now.')修改：'.$str.'';
		}
		if($glx == 2){
			$this->addrecord($table, $id);
		}
		return $str;
	}
	
	public function editcont($farr, $oners, $narr)
	{
		$str		= '';
		$this->editarr = array();
		if($oners){
			foreach($narr as $k=>$v){
				if(!isset($farr[$k]))continue;
				$fa = $farr[$k];
				$nv = $v;
				$ov = '';
				if(isset($oners[$k]))$ov = $oners[$k];
				if($nv != $ov){
					$sel = array();
					if(isset($fa['selarr']))$sel = $fa['selarr'];
					if(isset($sel[$ov]))$ov = $sel[$ov];
					if(isset($sel[$nv]))$nv = $sel[$nv];
					$str .= ''.$fa['name'].':'.$ov.'→'.$nv.';';
					$this->editarr[] = array(
						'fieldsname'	=> $fa['name'],
						'oldval'		=> $ov,
						'newval'		=> $nv
					);
				}
			}
		}
		return $str;
	}
	
	public function addrecord($table, $id)
	{
		$dbs = m('editrecord');
		foreach($this->editarr as $k=>$rs){
			$rs['optid'] 	= $this->adminid;
			$rs['optname'] 	= $this->adminname;
			$rs['optdt'] 	= $this->rock->now;
			$rs['table'] 	= $table;
			$rs['mid'] 		= $id;
			$dbs->insert($rs);
		}
	}
	
	/**
		获取对应表上字段信息
		return {字段名:对应信息}
	*/
	public function getfield($table)
	{
		$farr	= $this->db->gettablefields($this->rock->T($table));
		$rows 	= array();
		$arrar	= c('array', true);
		foreach($farr as $k=>$rs){
			$va = $rs['explain'];
			$vn = $rs['name'];
			$sel= array();
			if(!$this->rock->isempt($va)){
				$vas = explode('@', $va);
				$va	 = $vas[0];
				if(count($vas)>1)$sel = $arrar->strtoobject($vas[1]);
			}
			if(!$this->rock->isempt($va)){
				$rows[$vn] = array(
					'name' 		=> $va,
					'selarr' 	=> $sel
				);
			}
		}
		return $rows;
	}
	
}                                                                                                                                                            