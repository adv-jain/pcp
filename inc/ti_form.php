<?php

global $product, $wpdb, $table_prefix;
$id = $product->get_id();

$pcp_products_fields = $table_prefix . "pcp_products";

$get_coords = "SELECT * from `$pcp_products_fields` WHERE `product_id` = $id;";

$nt = $wpdb->get_results($get_coords);

if (!empty($nt)) {
  wp_add_inline_script('pcp-fabric', 'var productObj = [' . $nt[0]->text . '];', 'before');

  $t = '[' . $nt[0]->text . ']';

  $ppc_product_detail = json_decode($t, true);
  $no_of_fields = count($ppc_product_detail);

  $path_js = plugins_url('../assets/js/main.js', __FILE__);
  $ver_js = filemtime(plugin_dir_path(__FILE__) . '../assets/js/main.js');
  $dep_js = array();
  wp_enqueue_script('pcp-main-js', $path_js, $dep_js, $ver_js, true);

  do_action('woocomerce');

  for ($i = 1; $i <= $no_of_fields; $i++):

    ?>


    <label for="">Select Image #<?= $i; ?></label></br>
    <input type="file" class="imgLoader" allowed=".jpg, .png, .jpeg"></br>


  <?php endfor;

}

?>