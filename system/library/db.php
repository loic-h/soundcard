<?php

$serveur = mysql_connect ( SQL_SERVER , SQL_USER , SQL_PASS );

if (!$serveur)

{

	die('Non connecté : ' . mysql_error());

} 

$db = mysql_select_db ( SQL_BASE , $serveur );

if (!$db)

{

	die ('Impossible d\'utiliser la base : ' . mysql_error());

}



function do_query ( ) {
	$query = func_get_arg(0);
	$args = func_get_args();
	$params = array();
	if(count($args) > 1) {
		if(is_array($args[1])) {
			foreach($args[1] as $k => $v) {
				$params[$k] = mysql_real_escape_string($v);
			}
		}
		else {
			foreach(func_get_args() as $k => $v) {
				if($k > 0) {
					$params[] = mysql_real_escape_string($v);
				}
			}
		}
	}

	$query = vsprintf($query, $params);
	$_SESSION['last_query'] = $query;
	$result = mysql_query ( $query );
	
	if ( ! $result ) 
	
	{
		
	  $message  = 'Requête invalide : ' . mysql_error() . "\n";
    	
		$message .= 'Requête complète : ' . $query;
		
		// @todo : Envoi mail admin
		
		die ( $message );
		
	}
	
	else 
	
	{
		$return = true;
		if(is_resource($result)) {
			$return = array();
			while ($r = mysql_fetch_assoc($result)) {
				$return [] = $r;
			}
		}
		return $return;
		
	}

}

function do_query_once ( ) {
	$query = func_get_arg(0);
	$params = array();
	foreach(func_get_args() as $k => $v) {
		if($k > 0) {
			$params[] = mysql_real_escape_string($v);
		}
	}
	
	$query = vsprintf($query, $params);

	$result = mysql_query ( $query );
	
	if ( ! $result ) 
	
	{
		
	  $message  = 'Requête invalide : ' . mysql_error() . "\n";
    	
		$message .= 'Requête complète : ' . $query;
		
		// @todo : Envoi mail admin
		
		die ( $message );
		
	}
	
	else 
	
	{
		return mysql_fetch_assoc($result);	
	}
}

function datetime2unix($date) {
	$ar = datetime2array($date);
	return array2unix($ar);
}

function date2unix($date) {
	$ar = date2array($date);
	return array2unix($ar);
}

function array2unix($ar) {
	if(count($ar) > 3) 
		return mktime($ar['h'], $ar['mi'], $ar['s'], $ar['m'], $ar['d'], $ar['y']);
		
	return mktime(0, 0, 0, $ar['m'], $ar['d'], $ar['y']);
}

function datetime2array($date_sql) {
	$jour = substr($date_sql, 8, 2);
  $mois = substr($date_sql, 5, 2);
  $annee = substr($date_sql, 0, 4);
  $heure = substr($date_sql, 11, 2);
  $minute = substr($date_sql, 14, 2);
  $seconde = substr($date_sql, 17, 2);
  
  $key = array('y', 'm', 'd', 'h', 'mi', 's');
  $value = array($annee, $mois, $jour, $heure, $minute, $seconde);
  
  $tab_retour = array_combine($key, $value);
  
  return $tab_retour;
}

function date2array($date_sql) {
	$jour = substr($date_sql, 8, 2);
  $mois = substr($date_sql, 5, 2);
  $annee = substr($date_sql, 0, 4);

  $key = array('y', 'm', 'd');
  $value = array($annee, $mois, $jour);
  
  $tab_retour = array_combine($key, $value);
  
  return $tab_retour;
}

function js2array($date) {
	$jour = substr($date, 0, 2);
  $mois = substr($date, 3, 2);
  $annee = substr($date, 6, 4);

  $key = array('y', 'm', 'd');
  $value = array($annee, $mois, $jour);
  
  $tab_retour = array_combine($key, $value);
  
  return $tab_retour;
}

function unix2datetime($date) {
	return strftime("%F %T", $date);
}

function date2js($date) {
	$ar = date2array($date);
	return strftime("%d/%m/%Y", array2unix($ar));
}

function js2date($date) {
	$ar = js2array($date);
	return strftime("%F", array2unix($ar));
}


?>