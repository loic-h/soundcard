<?php
/*
 *	models.php
 *
 *	Scripts de création de models
 *
 *	Crée plusieurs fichiers
 *	/system/models/tablenames.php => constantes des noms de tables (pour la gestion des prefixes)
 *	/system/models/*.class.php => les models des différentes tables
 *
 *	@ Loïc Hamet
 *	13/09/2011
 *
 */

include ( "../library/include.php" );

// Créations des fichiers
$dir = ROOT_PATH."system/models/";
$table_file = "tablenames.php";

// Si le fichier existe deja, on l'efface
if(file_exists($dir.$table_file)) {
	echo "Suppression du fichier ".$dir.$table_file."\n";
	unlink($dir.$table_file);
}

//Création du fichier
echo "Création du fichier ".$dir.$table_file."\n";
$fp = fopen($dir.$table_file, 'w+');
fwrite($fp, '<'.'?

');

echo "Requête sur l'ensemble des tables\n";
$r = do_query( "SHOW TABLES" );

foreach($r as $k => $v) {
	$table = current($v);
	echo "Traitement de la table ".$table."\n";
	
	echo "ecriture dans le fichier ".$table_file."\n";
	fwrite($fp, "define ( \"". strtoupper($table) ."_TABLENAME\", SQL_PRE.\"". $table ."\" );\n");

	$ts = explode('_', $table);
	$class_name = implode(array_map(create_function('$k, $v', 'return ucfirst($v);'), array_keys($ts), array_values($ts)));
	
	$file = $dir . $class_name . ".class.php";
	
	// Si le fichier existe deja, on l'efface
	if(file_exists($file)) {
		echo "Suppression du fichier ".$file."\n";
		unlink($file);
	}
	
	echo "Création du fichier ".$file."\n";
	$h = fopen($file, 'w+');
	$str = "<"."?php
Class ".$class_name." extends Model {
";

	echo "Requête sur la table ".$table."\n";
	$rr = do_query('describe '.$table);
	$s1 = "";
	$s2 = "	function __construct() { \n		$"."this->fields = array(\n";
	$key = 0;
	foreach($rr as $kk => $vv) {
		echo "Traîtement de la clé ".$vv['Field']."\n";
		$field = $vv['Field'];
		$type = preg_replace('/\(.*\)/', '', $vv['Type']);
		$null = ($vv['Null'] == "YES" ? 1 : 0);
		if($vv['Key'] == "PRI") $key = $field;
		if($vv['Default'] == NULL) {
			switch($type) {
				case (in_array($type, $SQL_NUMS)): $default = 0; break;
				default: $default = "\"\"";
			}
			$default_null = 1;
		}
		else {
			$default = $vv['Default'];
			$default_null = 0;
		}
		$s1 .= "	protected $".$vv['Field'].";\n";
		$s2 .= 
"			\"$field\" => array(\n".
"				\"type\" => \"$type\",\n".
"				\"default\" => $default,\n".
"				\"default_null\" => $default_null,\n".
"				\"null\" => $null\n".
"			),\n";
	}
	$s2 .= "		); \n		parent::__construct(".strtoupper($table)."_TABLENAME, '$key', 'order');\n	}";
	$str .= $s1;
	$str .= $s2;

	$str .= "
}
?".">";

	fwrite($h, $str);
	fclose($h);
	echo "Fermeture du fichier ".$file."\n";
}

fwrite($fp, '
?'.'>');
fclose($fp);
echo "Fermeture du fichier ".$table_file."\n";

?>