<?php

/*
 *	include.php
 *
 *	Fichiers à inclure
 *
 *	@ Loïc Hamet
 *	02/06/2010
 *
 */
 
include_once "variables.php" ;

include_once LIBRARY_PATH . "fonctions.php" ;

// include_once LIBRARY_PATH . "db.php" ;

include_once HELPERS_PATH . "fonctions.php" ;

include_once HELPERS_PATH . "debug.php" ;

include_once HELPERS_PATH . "url.php" ;

include_once HELPERS_PATH . "mail.php" ;

include_once HELPERS_PATH . "file.php" ;

include_once HELPERS_PATH . "image.php" ;

include_once HELPERS_PATH . "forms.php" ;

// include_once CLASSES_PATH . "Model.class.php";

// include_once( MODELS_PATH . "tablenames.php" );

function __autoload($class_name) {
	testInclude(MODEL_PATH.$class_name.'.class.php');
}

function testInclude($path) {
	if(file_exists($path) && is_file($path)) {
		include_once $path;
		return true;
	}
}

session_start();

?>