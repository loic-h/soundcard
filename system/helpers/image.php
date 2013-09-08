<?php

function redimImage($src_path, $dest_path, $dest_name = "", $height = 0, $width = 0, $crop = true, $quality = 100) {
	
	$src_sizes = getimagesize($src_path);

	if($dest_name == "") {
		$dest_name = str_replace("/", "", strrchr($src_path, "/"));
	}
	$dest_name = str_replace(strrchr($dest_name, "."), "", $dest_name);
	
	switch($src_sizes['mime']) {
		case 'image/jpeg':
			$func_create = "imagecreatefromjpeg";
			$func_image = "imagejpeg";
			$ext = ".jpg";
		break;
		case 'image/gif':
			$func_create = "imagecreatefromgif";
			$func_image = "imagegif";
			$ext = ".gif";
		break;
		case 'image/png':
			$func_create = "imagecreatefrompng";
			$func_image = "imagepng";
			$ext = ".png";
		break;
	}
	$image_copy = $func_create($src_path);
	
	$src_height = $src_sizes[1];
	$src_width = $src_sizes[0];
	$height = $height > $src_height ? $src_height : $height;
	$width = $width > $src_width ? $src_width : $width;
	$src_x = 0;
	$src_y = 0;
	$dest_y = 0;
	$dest_x = 0;
	if($height != 0 && $width != 0) {
		$src_ratio = $src_width / $src_height;
		$dest_ratio = $width / $height;
		
		if($src_ratio != $dest_ratio) {
			
			if($crop) {
				$crop_height = $height;
				$crop_width = $width;
				
				if($src_ratio > $dest_ratio) {
					$dest_height = $height;
					$dest_width = $dest_height * $src_ratio;
					$dest_x = ( $crop_width - $dest_width ) / 2;
					$dest_y = 0;
				}
				else {
					$dest_width = $width;
					$dest_height = $dest_width / $src_ratio;
					$dest_x = 0;
					$dest_y = ( $crop_height - $dest_height ) / 2;
				}
				
				$dest_img = imagecreatetruecolor($crop_width, $crop_height);
				
			}
			else {
				if($src_ratio > $dest_ratio) {
					$dest_width = $width;
					$dest_height = $dest_width / $src_ratio;
					$dest_x = 0;
					$dest_y = 0;
				}
				else {
					$dest_height = $height;
					$dest_width = $dest_height * $src_ratio;
					$dest_x = 0;
					$dest_y = 0;
				}
				
				$dest_img = imagecreatetruecolor($dest_width, $dest_height);
			}
			
			
		}
		else {
			$dest_width = $width;
			$dest_height = $height;
			$dest_img = imagecreatetruecolor($dest_width, $dest_height);
		}
	}
	else if($height != 0 && $width == 0) {
		$dest_height = $height;
		$dest_width = $src_width * $height / $src_height;
		$dest_img = imagecreatetruecolor($dest_width, $dest_height);
	}
	else if($height == 0 && $width != 0) {
		$dest_height = $src_height * $width / $src_width;
		$dest_width = $width;
		$dest_img = imagecreatetruecolor($dest_width, $dest_height);
	}
	
	imagecopyresampled($dest_img, $image_copy, $dest_x, $dest_y, $src_x, $src_y, $dest_width, $dest_height, $src_width, $src_height);
	imagedestroy($image_copy);
	
	$quality = $func_image == "imagepng" ? 9 : $quality;
	$func_image($dest_img, $dest_path . $dest_name . $ext, $quality);
}

function loadImage($file, $path, $dest_name = "", $height = 0, $width = 0) {
	if($height == 0 && $width == 0) 
		return loadFile($file, $path, $dest_name);
	return redimImage($file['tmp_name'], $path, $dest_name, $height, $width);
	
}

?>