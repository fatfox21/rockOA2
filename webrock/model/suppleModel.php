<?php
class suppleClassModel extends Model
{
	
	public function kc($aid)
	{
		$kc = 0;
		$inkc  = $this->db->getmou('[Q]supplea', "sum(total)", "aid='$aid' and `status` in(3,4)");
		$outkc = $this->db->getmou('[Q]supplea', "sum(total)", "aid='$aid' and `status` in(0,1)");
		$kc		= $inkc - $outkc;
		return $kc;
	}
}