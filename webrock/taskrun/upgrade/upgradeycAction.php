<?php 
include_once('upgradeConfig.php'); 
class upgradeycClassAction extends upgrade{
	
	//远程用的修改版本的
	public function getversionAjax()
	{
		$log = '更新说明了';
		echo ''.VERSION.'|'.$log.'';
	}
	

	//远程获取需要更新数据库
	public function getmysqlupdateAjax()
	{
		$all 	= $this->post('all');
		$alls 	= ','.$all.',';
		$data 	= $this->getmysqlnr(1);
		$tabs 	= explode(',', $data['all']);
		$rows 	= array();
		echo join('', $rows);exit();
		foreach($tabs as $tab){
			$table = PREFIX.$tab;
			if(!$this->contain($alls, ','.$tab.',')){//不存在就要创建
				$str    = $this->db->showcreatetable($table);
				$rows[] = $str.';';
				$rows[] = 'alter table `'.$table.'` AUTO_INCREMENT=1;';
			}else{
				$oldfstr 	= $this->post('f_'.$tab.'');
				$oldfstrs 	= ','.$oldfstr.',';
				$farr 	 	= $this->db->getallfields($table);
				foreach($farr as $fstr){
					if(!$this->contain($oldfstrs, ','.$fstr.',')){//字段不存在
						$colun  = $this->db->gettablecolumn($table, $fstr);
						if(isset($colun[0])){
							$strs   = $colun[0];
							$rows[] = 'alter table `[Q]'.$tab.'` add '.$strs.';';
						}
					}
				}
			}
		}
		echo join('', $rows);
	}
	

	
	
	/**
		远程系统上文件
	*/
	public function getyuanfileAjax()
	{
		$notup	= $this->post('notup');
		echo join(',', $rows);exit();
		$this->filearr = array();
		$this->getFile('', 0, $notup);
		$fstr	= explode(',', $this->post('fstr'));
		$fsize	= explode(',', $this->post('fsize'));
		$len 	= count($fstr);
		$arrs 	= array();
		for($i=0; $i<$len; $i++){
			$arrs[$fstr[$i]] = $fsize[$i];
		}
		$rows   = array();
		foreach($this->filearr as $k=>$rs){
			$na = $rs['name'];
			if(isset($arrs[$na])){
				if($arrs[$na] != $rs['size']){
					$rows[] = 'update:'.$na.'';
				}
			}else{
				$rows[] = 'create:'.$na.'';
			}
		}
		echo join(',', $rows);
	}
	
	public function getuploadfilestAjax()
	{
		$filename = $this->post('filename');
		$paths	= ROOT_PATH.'/'.$filename;
		$str 	= '';
		echo $str;
	}
}