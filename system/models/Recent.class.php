<?php
Class Recent extends Model {
	protected $id;
	protected $id_image;
	function __construct() { 
		$this->fields = array(
			"id" => array(
				"type" => "int",
				"default" => 0,
				"default_null" => 1,
				"null" => 0
			),
			"id_image" => array(
				"type" => "int",
				"default" => 0,
				"default_null" => 1,
				"null" => 0
			),
		); 
		parent::__construct(RECENT_TABLENAME, 'id', 'order');
	}
}
?>