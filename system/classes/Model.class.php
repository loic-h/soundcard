<?php

class Model {
	
	protected $table_name;
	protected $primary = false;
	protected $order;
	protected $fields;
	protected $usable_fields;
	
	function __construct($table_name, $primary = "id", $order = "id") {
		//$this->table_name = defined('DB_PRE') ? DB_PRE."_" : "";
		$this->table_name = "";
		$this->table_name .= $table_name;
		$this->primary = $primary;
		$this->order = $order;
		$this->setUsableFields($this->fields);
	}
	
	function setUsableFields($array) {
		foreach($array as $k => $v) {
			$this->usable_fields[] = $k;
			$this->{$k} = $v['default'];
		}
	}
	
	function setData($field, $value) {
		$this->{$field} = $value;
	}
	
	function getDatas() {
		$ret = array();
		foreach($this->usable_fields as $k => $v) {
			$ret[$v] = $this->{$v};
		}
		return $ret;
	}

	
	function load() {
		if(count(func_get_args()) >= 2) {
			$field = func_get_arg(0);
			$value = func_get_arg(1);
			$r = do_query_once("SELECT * FROM ".$this->table_name." WHERE ".$field." = '%s'", $value);
			if(!$r) return false;
			$this->load($r);
		}
		else {
			$param = func_get_arg(0);
			if(is_array($param)) {
				foreach($param as $k => $v) {
					if(in_array($k, $this->usable_fields)) {
						$this->{$k} = !is_null($v) ? stripslashes($v) : $v;
					}
				}
			}
			else if($this->primary) {
				$r = do_query_once("SELECT * FROM ".$this->table_name." WHERE ".$this->primary." = '%s'", $param);
				if(!$r) return false;
				$this->load($r);
			}
		}
		$this->afterLoad();
	}
	
	function select() {
		$query = "SELECT * FROM ".$this->table_name;
		$args = "";
		if(is_array(func_get_arg(0)) && count(func_get_arg(0)) > 0) {
			$ws = array();
			$vs = array();
			var_dump(func_get_arg(0));
			foreach(func_get_arg(0) as $k => $v) {
				$ws[] = $k." = '%s'";
				$vs[] = $v;
			}
			$query .= " WHERE ".implode(' AND ', $ws);
			$args = $vs;
		}
		else if(is_string(func_get_arg(0))) {
			$query .= func_get_arg(0);
			$args = func_get_arg(1);
		}
		$r = do_query($query, $args);
	}
	
	function loadAll() {
		
	}
	
	function save() {
		$this->beforeSave();
		if($this->primary) {
			$condition = $this->{$this->primary} == 0;
		}
		else {
			$condition = true;
		}
		if($condition) {
			$ks = array();
			$vs = array();
			$ss = array();
			foreach($this->usable_fields as $k => $v) {
				if($this->fields[$v]["null"] && $this->{$v} == NULL && $this->fields[$v]["default_null"]) {
					$ss[] = "%s";
					$vs[] = "NULL";
				}
				else {
					$ss[] = "'%s'";					
					$vs[] = $this->{$v};
				}
				$ks[] = $v;
			}
			$query = "INSERT INTO ".$this->table_name." (".implode(',', $ks).") VALUES (".implode(',',$ss).")";
			do_query($query, $vs);
		}
		else {
			$ks = array();
			foreach($this->usable_fields as $k => $v) {
				if($this->fields[$v]["null"] && $this->{$v} == NULL && $this->fields[$v]["default_null"]) {
					$ks[] = $v." = %s";
					$vs[] = "NULL";
				}
				else {
					$ks[] = $v." = '%s'";				
					$vs[] = $this->{$v};
				}
			}
			$query = "UPDATE ".$this->table_name." SET ".implode(',', $ks)." WHERE ".$this->primary." = '".$this->{$this->primary}."'";
			do_query($query, $vs);
		}
	}
	
	function setValue($name, $value = "") {
		if(is_array($name)) {
			foreach($name as $k => $v) {
				$this->setValue($k, $v);
			}
		}
		else {
			$this->{$name} = $value;
		}
	}
	
	function delete() {
		if($this->{$this->primary} > 0) {
			$query = "DELETE FROM ".$this->table_name." WHERE ".$this->primary." = '%s'";
			do_query($query, $this->{$this->primary});
		}
	}
	
	public function __set($name, $value) {
		$this->{$name} = $value;
	}
	
	public function __get($name) {
		if (property_exists($this, $name)) {
			return $this->{$name};
		}
		
		$trace = debug_backtrace();
		trigger_error(
			'Propriété non-définie via __get(): ' . $name .
			' dans ' . $trace[0]['file'] .
			' à la ligne ' . $trace[0]['line'],
			E_USER_NOTICE);
		return null;
	}
	
	function beforeSave() {
		return false;
	}
	
	function afterLoad() {
		return false;
	}
}

?>