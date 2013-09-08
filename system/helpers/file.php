<?php

function getFIleExtension($name) {
	return strrchr($name, ".");
}

function saveUploadedFile($file,$dest_filepath,$droits=0666){
	if($file['size']>0){		
		if( !move_uploaded_file($file['tmp_name'], $dest_filepath)){
			return false;
		}else{
			chmod($dest_filepath, $droits);
            return true;
		}	
	}
	return true;
}

function loadFile($file, $path, $dest_name) {
	return saveUploadedFile($file, $path . $dest_name);
}
	

?>