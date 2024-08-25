<?php

if (!defined('WP_UNINSTALL_PLUGIN')) {
  die('Unauthorization Uninstall');
}


global $wpdb, $table_prefix;
$pcp_ti = $table_prefix . "pcp_ti";

$q = "DROP TABLE `$pcp_ti`";
$wpdb->query($q);