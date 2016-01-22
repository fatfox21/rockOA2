<?php
class fileClassModel extends Model
{
	public function getfile($mtype, $mid)
	{
		$rows	= $this->getall("`mtype`='$mtype' and `mid`='$mid' order by `id`",'id,filename,filesizecn,filesize,fileext');
		return $rows;
	}
	
	public function addfile($fileid, $mtype, $mid)
	{
		if(!$this->isempt($fileid)){
			$this->update("`mtype`='$mtype',`mid`='$mid'", "`id` in($fileid)");
		}
	}
	
	public function getstr($mtype, $mid, $lx=0)
	{
		$filearr 	= $this->getfile($mtype, $mid);
		$fstr		= '';
		foreach($filearr as $k=>$rs){
			if($k>0)$fstr.='<br>';
			$str = 'href="'.URL.'mode/upload/uploadshow.php?id='.$rs['id'].'" target="_blank"';
			if($lx==1)$str='href="javascript:" onclick="return js.downshow('.$rs['id'].')"';
			$fstr .='<img src="'.URL.'mode/fileicons/'.$rs['fileext'].'.gif" align="absmiddle" height=16 width=16> <a '.$str.' style="color:blue"><u>'.$rs['filename'].'</u></a> ('.$rs['filesizecn'].')';
		}
		return $fstr;
	}
	
	public function getfiles($mtype, $mid)
	{
		$rows		= $this->getall("`mtype`='$mtype' and `mid`='$mid' order by `id`");
		foreach($rows as $k=>$rs){
			$rows[$k]['status'] = 4;
		}
		return $rows;
	}
	
	public function copyfile($mtype, $mid)
	{
		$rows	= $this->getall("`mtype`='$mtype' and `mid`='$mid' order by `id`");
		$arr 	= array();
		foreach($rows as $k=>$rs){
			unset($rs['id']);
			$inuar = $rs;
			$inuar['adddt'] = $this->rock->now;
			$inuar['optid'] = $this->adminid;
			$inuar['downci'] = '0';
			$inuar['mtype'] = '';
			$inuar['mid'] = '0';
			$this->insert($inuar);
			$inuar['id'] = $this->db->insert_id();
			$inuar['status'] = 4;
			$arr[] = $inuar;
		}
		return $arr;
	}
}