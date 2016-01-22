<?php 
/**
	输入框
*/
class inputChajian extends Chajian{
	
	
	public function select($name,$value,$data,$other='')
	{
		$data=explode(',',$data);
		if(!empty($change))$change="onchange=\"$change\"";
		$t='<select name="'.$name.'" id="'.$name.'" '.$other.'>';
		foreach($data as $da){
			if($this->rock->contain($da,'|')){
				$valc=explode('|',$da);
				$val=$valc[0];$text=$valc[1];
			}else{
				$val=$text=$da;
			}
			$select=($val==$value)?'selected':'';
			$t.='<option value="'.$val.'" '.$select.'>'.$text.'</option>';
		}
		$t.='</select>';
		return $t;
	}
	
	public function checkshow($val,$text='×,√,',$color='red,#009933,')
	{
		if($this->rock->isempt($val))$val=0;
		$craa	= explode(',',$color);
		$tarr	= explode(',',$text);
		return '<a style="color:'.$craa[$val].'">'.$tarr[$val].'</a>';
	}
	
	//复选框
	public function checkbox($name,$value,$data,$r=5)
	{
		$data=explode(',',$data);
		$t='';$i=0;
		$value='['.str_replace(',','],[',$value).']';
		foreach($data as $da){
			$i++;
			$check=($this->contain($value,'['.$da.']'))?'checked':'';
			$t.='<label for="'.$name.''.$i.'"><input type="checkbox" value="'.$da.'" class="checkbox" '.$check.' name="'.$name.'[]" id="'.$name.''.$i.'">'.$da.'</label>&nbsp;&nbsp;';
			if($i%$r==0)$t.='<br>';
		}
		return $t;
	}
}                                                                                                                                                            