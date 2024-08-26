<?php
/*
Plugin Name: Product Customizer PRO
Description: Make Your Product Page Robust.
Author: Ayaan
Author URI: www.delhikaagency.com
Version: 0.1
*/

if (!defined('ABSPATH')) {
  die("Access Restricted");
}

function product_customizer_pro_activation()
{
  global $wpdb, $table_prefix;
  $pcp_ti = $table_prefix . "pcp_ti";

  $q = "CREATE TABLE IF NOT EXISTS `$pcp_ti` (`id` INT(255) NOT NULL AUTO_INCREMENT , `order_id` INT(255) NOT NULL , `text` VARCHAR(5000) NOT NULL , `img` VARCHAR(5000) NOT NULL , `order_date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB;";

  $wpdb->query($q);
}

function product_customizer_pro_deactivation()
{
  global $wpdb, $table_prefix;
  $pcp_ti = $table_prefix . "pcp_ti";

  $q = "TRUNCATE `$pcp_ti`";
  $wpdb->query($q);

}

register_activation_hook(__FILE__, 'product_customizer_pro_activation');
register_deactivation_hook(__FILE__, 'product_customizer_pro_deactivation');

function pcp_text_image($atts)
{

  $atts = array_change_key_case($atts, CASE_LOWER);
  $atts = shortcode_atts(array(
    'type' => 'ti',
  ), $atts);

  include 'inc/ti_form.php';

  // return 'PCP Working: ' . $atts['type'];
  // return $html;

}

add_shortcode('pcp', 'pcp_text_image');


add_filter('woocommerce_before_add_to_cart_button', function () {
  global $product;

  if (is_object($product) || $product->is_type('variable')) {
    echo do_shortcode("[pcp]");
  }
});

function pcp_scripts_wp()
{
  $path_js = plugins_url('assets/js/main.js', __FILE__);
  $ver_js = filemtime(plugin_dir_path(__FILE__) . 'assets/js/main.js');
  $path_css = plugins_url('assets/css/main.css', __FILE__);

  $dep_js = array();
  $ver_css = filemtime(plugin_dir_path(__FILE__) . 'assets/css/main.css');
  $dep_css = array();


  if (is_single()) {
    wp_enqueue_script('pcp-main-js', $path_js, $dep_js, $ver_js, true);
    wp_enqueue_style('pcp-main-css', $path_css, $dep_css, $ver_css);
  }

}

function pcp_script_admin()
{
  $path_js = plugins_url('assets/js/main.js', __FILE__);
  $ver_js = filemtime(plugin_dir_path(__FILE__) . 'assets/js/main.js');
  $dep_js = array();

  $path_css = plugins_url('assets/css/main.css', __FILE__);
  $ver_css = filemtime(plugin_dir_path(__FILE__) . 'assets/css/main.css');
  $dep_css = array();

  wp_enqueue_script('pcp-main-js', $path_js, $dep_js, $ver_js, true);
  wp_enqueue_style('pcp-main-css', $path_css, $dep_css, $ver_css);

}


add_action('wp_enqueue_scripts', 'pcp_scripts_wp');
add_action('admin_enqueue_scripts', 'pcp_script_admin');



$url = parse_url($_SERVER['REQUEST_URI']);
// print_r($url);
if ($url['path'] === "/wp-admin/post.php" || $url['path'] === "/wp-admin/post-new.php") {
  // $res;
  // parse_str($url['query'], $res);
  // print_r($res);
  // echo "<h1>Yes</h1>";


  // if() {

  // }

  $path_js = plugins_url('assets/js/pcp.js', __FILE__);
  $ver_js = filemtime(plugin_dir_path(__FILE__) . 'assets/js/pcp.js');
  $dep_js = array();

  wp_enqueue_script('pcp-js', $path_js, $dep_js, $ver_js, true);
  wp_enqueue_script('pcp-fabric', "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js");
  wp_add_inline_script('pcp-js', 'var pcpAjaxUrl = "' . admin_url('admin-ajax.php') . '"', 'before');

} else {
  // echo "<h1>Not</h1>";
}


































// here 

// --------------------------
// #1 Add New Product Type to Select Dropdown

add_filter('product_type_selector', 'bbloomer_add_custom_product_type');

function bbloomer_add_custom_product_type($types)
{
  $types['custom'] = 'Custom product';
  return $types;
}

// --------------------------
// #2 Add New Product Type Class

add_action('init', 'bbloomer_create_custom_product_type');

function bbloomer_create_custom_product_type()
{
  class WC_Product_Custom extends WC_Product
  {
    public function get_type()
    {
      return 'custom';
    }
  }
}

// --------------------------
// #3 Load New Product Type Class

add_filter('woocommerce_product_class', 'bbloomer_woocommerce_product_class', 10, 2);

function bbloomer_woocommerce_product_class($classname, $product_type)
{
  if ($product_type == 'custom') {
    $classname = 'WC_Product_Custom';
  }
  return $classname;
}

// --------------------------
// #4 Show Product Data General Tab Prices

add_action('woocommerce_product_options_general_product_data', 'bbloomer_custom_product_type_show_price');

function bbloomer_custom_product_type_show_price()
{
  global $product_object;
  if ($product_object && 'custom' === $product_object->get_type()) {
    wc_enqueue_js("
         $('.product_data_tabs .general_tab').addClass('show_if_custom').show();
         $('.pricing').addClass('show_if_custom').show();
         $('<h1>Heading pcp</h1>').append('.general_tab');
      ");

    include 'ti_form.php';
    echo "workign here to pcp";
  }
}

// --------------------------
// #5 Show Add to Cart Button

add_action("woocommerce_custom_add_to_cart", function () {
  do_action('woocommerce_simple_add_to_cart');
});

// here



