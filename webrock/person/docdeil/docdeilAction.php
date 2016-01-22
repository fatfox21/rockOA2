<?php 
class docdeilClassAction extends Action{
	
	public function docdeilfile($table, $rows)
	{
		$file = m('file');
		foreach($rows as $k=>$rs){
			$frs = $file->getfile('docdeil', $rs['id']);
			$s 	 = '';
			foreach($frs as $k1=>$rs1){
				$s .='<a href="javascript:" class="blue" onclick="return js.downshow('.$rs1['id'].')">'.$rs1['filename'].'</a> ('.$rs1['filesizecn'].')<br>';
			}
			$rows[$k]['filestr'] = $s;
		}
		return array('rows'=>$rows);
	}

}