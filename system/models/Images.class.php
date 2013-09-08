<?php
Class Images extends Model {
	protected $id;
	protected $id_serie;
	protected $name;
	protected $md5;
	protected $url;
	protected $legend;
	protected $ordre;
	protected $width;
	protected $height;
	protected $id_dyptic;
	protected $video_tag;
	function __construct() { 
		$this->fields = array(
			"id" => array(
				"type" => "int",
				"default" => 0,
				"default_null" => 1,
				"null" => 0
			),
			"id_serie" => array(
				"type" => "int",
				"default" => 0,
				"default_null" => 1,
				"null" => 0
			),
			"name" => array(
				"type" => "varchar",
				"default" => "",
				"default_null" => 1,
				"null" => 0
			),
			"md5" => array(
				"type" => "varchar",
				"default" => "",
				"default_null" => 1,
				"null" => 0
			),
			"url" => array(
				"type" => "varchar",
				"default" => "",
				"default_null" => 1,
				"null" => 0
			),
			"legend" => array(
				"type" => "varchar",
				"default" => "",
				"default_null" => 1,
				"null" => 0
			),
			"ordre" => array(
				"type" => "int",
				"default" => 0,
				"default_null" => 1,
				"null" => 0
			),
			"width" => array(
				"type" => "int",
				"default" => null,
				"default_null" => 1,
				"null" => 1
			),
			"height" => array(
				"type" => "int",
				"default" => null,
				"default_null" => 1,
				"null" => 1
			),
			"id_dyptic" => array(
				"type" => "int",
				"default" => null,
				"default_null" => 1,
				"null" => 1
			),
			"video_tag" => array(
				"type" => "varchar",
				"default" => "",
				"default_null" => 1,
				"null" => 0
			),
		); 
		parent::__construct(IMAGES_TABLENAME, 'id', 'order');
	}
}
?>