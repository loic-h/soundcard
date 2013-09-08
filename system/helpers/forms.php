<?php
/*
 *	forms.php
 *
 *	Librairie d'aide aux formulaires
 *
 *
 *	@ Loïc Hamet
 *	02/06/2010
 *
 */



/*	
 *	string getSelect(array $datas, string $name, array $attr, mixed $select, bool $multiple);
 *
 *	Renvoie le code HTML pour un formulaire.
 *	$select peux être sous la forme d'un int d'un array (multiple)
 *
 */
function getSelect($datas, $name, $attrs, $select = "", $multiple = false) {
	$attr = implode(" ", array_map(create_function('$k, $v', 'return $k."=\"$v\"";'), array_keys($attrs), array_values($attrs)));
	$options = "";
	if(!is_array($select)) {
		$select = array($select => $select);
	}
	foreach($datas as $k =>$v) {
		$s = (array_key_exists($k, $select)) ? "selected=\"selected\"" : "";
		$options .= "<option value=\"$k\" $s>$v</option>";
	}
	$mul = $multiple ? "multiple" : "";
	return <<<EOT
<select name="$name" $attr $mul>
	$options
</select>
EOT;

}


?>