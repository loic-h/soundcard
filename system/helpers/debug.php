<?php
/*
 *	Debug.php
 *
 *	Librairie de debug 
 *
 *	NE FONCIONNE PAS !! a faire
 *
 *	@ Loïc Hamet
 *	02/06/2010
 *
 */
 
 

/*
 *	void debug_message ( String : $message )
 *
 *	Ecris dans le fichier de log et fait une sortie sur la console
 *
 */
 
function debug_message ( $message ) {
	
	debug_console ( $message );
	
	debug_log ( $message );
		
}


/*
 *	void debug_message ( String : $message )
 *
 *	Ecris dans la console
 *
 */
 
function debug_console ( $message ) {
		
	echo "

<script>
	debug( '$message' );
</script>

";

}


/*
 *	void debug_log ( String : $message )
 *
 *	Ecris dans le fichier de log
 *
 */
 
function debug_log ( $message ) {
	ob_start();
	var_export($message);
	$m = ob_get_contents();
	ob_end_clean();
	
	$filename = LOG_PATH.date("Y-m-d").".log";
	//if(!is_file($filename)) $h = fopen($filename, "a");
	$h = fopen($filename, "a");
	//rewind($h);
	$write = fwrite($h, "[".date("H:i:s")."] ".$m."\n");
	fclose($h);
	return $write;
}


/*
 *	void debug_dump ( String : $message )
 *
 *	fait une sortie var_dump formatée
 *
 */
 
function debug_dump ( $message ) {
	
	echo "<pre>";
	
	var_dump ( $message );
	
	echo '</pre>';

}


/*
 *	void debug_format ( String : $message )
 *
 *	Ecris dans le fichier de log et fait une sortie sur la console
 *
 */
 
function debug_format ( $message ) {
	
}

?>