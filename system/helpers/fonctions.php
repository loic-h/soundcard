<?php

function getGetPostVars($var) {
	return isset($_POST[$var]) ? $_POST[$var] : (isset($_GET[$var]) ? $_GET[$var] : false);
}

function parseJSON($array) {
	$ret = "{";
	$a = array();
	foreach($array as $k => $v) {
		if(is_array($v)) $a[] = '"'.$k.'" : '.parseJSON($v);
		else $a[] = '"'.$k.'" : "'.addslashes($v).'"';
	}
	$ret .= implode(",", $a);
	$ret.="}";
	return $ret;
}

function getArrayIndex($index, $array) {
	if(isset($array[$index])) return $array[$index];
	return "";
}


function getFilename($file_name) {
	$ext = wd_remove_accents($file_name);
	return $ext;
}

function wd_remove_accents($str, $charset='utf-8')
{
    $str = htmlentities($str, ENT_NOQUOTES, $charset);
    $str = preg_replace('#&([A-za-z])(?:acute|cedil|circ|grave|orn|ring|slash|th|tilde|uml);#', '\1', $str);
    $str = preg_replace('#&([A-za-z]{2})(?:lig);#', '\1', $str); // pour les ligatures e.g. '&oelig;'
    $str = preg_replace('#&[^;]+;#', '', $str); // supprime les autres caractères
    
    return $str;
}

function getUniqueRec($label, $table, $field, $id = 0) {
	$args = array();
	$query = "SELECT * FROM ".$table." WHERE ".$field." REGEXP '%s(_[0-9]+)?'";
	$args[] = $label;
	if($id > 0) {
		$query .= " AND id <> '%s'";
		$args[] = $id;
	}
	$query .= " ORDER BY ".$field." DESC LIMIT 1";
	$r = do_query($query, $args);
	if(sizeof($r) > 0) {
		$matches = array();
		$id = preg_match('/'.$label.'_?([0-9]+)?/', $r[0][$field], $matches);
		$ct = 1;
		if(isset($matches[1])) {
			$ct = $matches[1] + 1;
		}
		$label .= "_".$ct;
	}
	return $label;
}

?>