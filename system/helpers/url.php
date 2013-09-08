<?php
/*
 *	url.php
 *
 *	Librairie Helper sur les URL
 *
 *	@ Loïc Hamet
 *	02/06/2010
 *
 */
 
 

/*
 *	void error_404 ( )
 *
 *	Redirige sur la page 404
 *
 */
 
function error_404 ( ) {
	
	header ( "Location: " . ROOT_URL . "404.php" );

}


function formatURL($str)
{
	$str =  wd_remove_accents($str);
	$str = preg_replace('/[^a-zA-Z0-9_-]/s', '-', $str);
	return $str;
}

function getUniqueURL($label, $table, $field, $id = 0) {
	return getUniqueRec(formatURL($label), $table, 'url', $id = 0);
}
 
?>