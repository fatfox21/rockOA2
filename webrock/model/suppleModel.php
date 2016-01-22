<?php
class suppleClassModel extends Model
{
	
	public function kc($aid)
	{
		$kc = 0;
		$inkc  = $this->db->getmou('[Q]supplea', "sum(total)", "aid='$aid' and `status` in(3,4)");//入库
		$outkc = $this->db->getmou('[Q]supplea', "sum(total)", "aid='$aid' and `status` in(0,1)");//出库
		$kc		= $inkc - $outkc;
		return $kc;
	}
	
	public function iscz($name, $num='', $model='', $id=0)
	{
		$bo = false;
		if(!$this->isempt($num)){
			$to1 = $this->rows("`num`='$num' and `id`<>$id");
			if($to1>0)$bo=true;
		}
		if(!$bo){
			$where = "`name`='$name' and `id`<>$id";
			if(!$this->isempt($model))$where.=" and `model`='$model'";
			$to1 = $this->rows($where);
			if($to1>0)$bo=true;
		}
		return $bo;
	}
}