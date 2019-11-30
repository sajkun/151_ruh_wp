<?php

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}

/**
* Theme helper functions
*
* @package theme/helpers
*/

if(!function_exists('clog')){
  /**
 * prints an inline script with output in console
 *
 * @param mixed $content - obj|array|string
 */
  function clog($content){
    echo '<script> console.log(';
    echo json_encode($content);
    echo ')</script>';
  }
}

if(!function_exists('dlog')){
  /**
 * prints an inline script with output in console
 *
 * @param mixed $content - obj|array|string
 */
  function dlog($content, $start=false, $end=false){
    if(THEME_DEBUG === true){

      if ($start) {
        printf( '<script> console.groupCollapsed("%s")</script>', $content);
      }
      else{
        echo '<script> console.log(';
        echo json_encode($content);
        echo ')</script>';
      }

      if ($end) {
        echo '<script> console.groupEnd()</script>';
      }
    }
  }
}


if(!function_exists('my_upload_dir')){

  /**
  * modifies upload url and path
  *
  * @param $upload - array
  */
  function my_upload_dir($upload) {

    $upload['subdir'] = '/documents' . $upload['subdir'];

    $upload['path']   = $upload['basedir'] . $upload['subdir'];

    $upload['url']    = $upload['baseurl'] . $upload['subdir'];

    return $upload;
  }
}


if(!function_exists('add_svg_sprite')){
  function add_svg_sprite($slug = '', $url = THEME_URL.'/assets/sprite_svg/symbol_sprite.html'){
    $name_symbol = 'inlineSVGrev_'.$slug;
    $name_data = 'inlineSVGdata_'.$slug;
    echo "<script> ( function( window, document ) {var file = '".$url."', revision = 1; if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect ){return true; }; var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null, request, data, insertIT = function() {document.body.insertAdjacentHTML( 'afterbegin', data ); }, insert = function() {if( document.body ) insertIT(); else document.addEventListener( 'DOMContentLoaded', insertIT )}; if( isLocalStorage && localStorage.getItem( '".$name_symbol."' ) == revision ) {data = localStorage.getItem( '".$name_data."' ); if( data ) {insert(); return true; } }; try {request = new XMLHttpRequest(); request.open( 'GET', file, true ); request.onload = function(){if( request.status >= 200 && request.status < 400 ) {data = request.responseText; insert(); if( isLocalStorage ) {localStorage.setItem( '".$name_data."',  data ); localStorage.setItem( '".$name_symbol."', revision ); } } }; request.send(); }catch( e ){}; }( window, document ) ); </script>";
  }
}


if(!function_exists('print_inline_style')){
  /**
  *  prints an inline javascript.
  *  script adds styles to local storage
  *
  * @param $url - url of script
  * @param $script name - name of a script
  */
  function print_inline_style($url, $script_name){
    $script_name = str_replace('-', '_', $script_name);
    $script = sprintf(' (function(){function add_inline_%1$s() {var style = document.createElement(\'style\'); style.rel = \'stylesheet\'; document.head.appendChild(style); style.textContent = localStorage.%1$s; };
      var image_url = "%3$s"; var exp  = new RegExp("..\/images", "gi"); try {if (localStorage.%1$s) {add_inline_%1$s(); } else {var request = new XMLHttpRequest(); request.open(\'GET\', \'%2$s\', true); request.onload = function() {if (request.status >= 200 && request.status < 400) {var text =  request.responseText; text = text.replace(exp, image_url); localStorage.%1$s = text; add_inline_%1$s(); } }; request.send(); } } catch(ex) {} }());', $script_name, $url, THEME_URL.'/images/');

    printf('<script>%s</script>',$script);
  }
}


if(!function_exists('print_theme_template_part')){
  /**
  *  prints an inline javascript.
  *  script adds styles to local storage
  *
  * @param $url - url of script
  * @param $script name - name of a script
  */
  function print_theme_template_part($template_name,  $template_path, $args = array()){

    if(!empty($template_name) && ($template_path) ){
      extract($args);
      include(THEME_PATH.'/theme_templates/'. $template_path . '/'.'template-'. $template_name .'.php');
    }
  }
}



if(!function_exists('theme_minify_js')){

  /**
  * JavaScript Minifier
  *
  * @param string of javascript
  *
  * @return $string
  */
  function theme_minify_js($input) {
      if(trim($input) === "") return $input;
      return preg_replace(
          array(
              // Remove comment(s)
              '#\s*("(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\')\s*|\s*\/\*(?!\!|@cc_on)(?>[\s\S]*?\*\/)\s*|\s*(?<![\:\=])\/\/.*(?=[\n\r]|$)|^\s*|\s*$#',
              // Remove white-space(s) outside the string and regex
              '#("(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\'|\/\*(?>.*?\*\/)|\/(?!\/)[^\n\r]*?\/(?=[\s.,;]|[gimuy]|$))|\s*([!%&*\(\)\-=+\[\]\{\}|;:,.<>?\/])\s*#s',
              // Remove the last semicolon
              '#;+\}#',
              // Minify object attribute(s) except JSON attribute(s). From `{'foo':'bar'}` to `{foo:'bar'}`
              '#([\{,])([\'])(\d+|[a-z_][a-z0-9_]*)\2(?=\:)#i',
              // --ibid. From `foo['bar']` to `foo.bar`
              '#([a-z0-9_\)\]])\[([\'"])([a-z_][a-z0-9_]*)\2\]#i'
          ),
          array(
              '$1',
              '$1$2',
              '}',
              '$1$3',
              '$1.$3'
          ),
      $input);
  }
}


if(!function_exists('minify_css')){

  /**
  * CSS Minifier
  *
  * @param string of javascript
  *
  * @return $string
  */
  function minify_css($input) {
      if(trim($input) === "") return $input;
      return preg_replace(
          array(
              // Remove comment(s)
              '#("(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\')|\/\*(?!\!)(?>.*?\*\/)|^\s*|\s*$#s',
              // Remove unused white-space(s)
              '#("(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\'|\/\*(?>.*?\*\/))|\s*+;\s*+(})\s*+|\s*+([*$~^|]?+=|[{};,>~+]|\s*+-(?![0-9\.])|!important\b)\s*+|([[(:])\s++|\s++([])])|\s++(:)\s*+(?!(?>[^{}"\']++|"(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\')*+{)|^\s++|\s++\z|(\s)\s+#si',
              // Replace `0(cm|em|ex|in|mm|pc|pt|px|vh|vw|%)` with `0`
              '#(?<=[\s:])(0)(cm|em|ex|in|mm|pc|pt|px|vh|vw|%)#si',
              // Replace `:0 0 0 0` with `:0`
              '#:(0\s+0|0\s+0\s+0\s+0)(?=[;\}]|\!important)#i',
              // Replace `background-position:0` with `background-position:0 0`
              '#(background-position):0(?=[;\}])#si',
              // Replace `0.6` with `.6`, but only when preceded by `:`, `,`, `-` or a white-space
              '#(?<=[\s:,\-])0+\.(\d+)#s',
              // Minify string value
              '#(\/\*(?>.*?\*\/))|(?<!content\:)([\'"])([a-z_][a-z0-9\-_]*?)\2(?=[\s\{\}\];,])#si',
              '#(\/\*(?>.*?\*\/))|(\burl\()([\'"])([^\s]+?)\3(\))#si',
              // Minify HEX color code
              '#(?<=[\s:,\-]\#)([a-f0-6]+)\1([a-f0-6]+)\2([a-f0-6]+)\3#i',
              // Replace `(border|outline):none` with `(border|outline):0`
              '#(?<=[\{;])(border|outline):none(?=[;\}\!])#',
              // Remove empty selector(s)
              '#(\/\*(?>.*?\*\/))|(^|[\{\}])(?:[^\s\{\}]+)\{\}#s'
          ),
          array(
              '$1',
              '$1$2$3$4$5$6$7',
              '$1',
              ':0',
              '$1:0 0',
              '.$1',
              '$1$3',
              '$1$2$4$5',
              '$1$2$3',
              '$1:0',
              '$1$2'
          ),
      $input);
  }
}


if(!function_exists('include_php_from_dir')){

  /**
  * Includes all php files from specified directory
  *
  * @param $path - string
  */
  function include_php_from_dir($path){
    if(is_dir($path)){
      foreach (glob($path.'/*') as $child_name){
        if(is_dir($child_name)){
          include_php_from_dir($child_name);
        }else{
         if(file_exists( $child_name )){
           $ext = pathinfo($child_name, PATHINFO_EXTENSION);
           if($ext === 'php'){
             include_once($child_name);
           }
         }
        }
      }
    }else{
      $ext = pathinfo($path, PATHINFO_EXTENSION);
      if($ext === 'php'){
        include_once($path);
      }
    }
  }
}