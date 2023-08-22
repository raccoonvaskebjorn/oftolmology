<?php 
	ini_set("file_uploads", 1);
	ini_set("upload_tmp_dir", "/tmp");
	ini_set("upload_max_filesize", "10M");
	ini_set("post_max_size", "70M");
	ini_set("max_file_uploads", 3);

	$post = $_REQUEST; 

	$ret = array('error'=>1, 'msg'=>"Image not found");

	define('UPLOADS', dirname(__FILE__) ."/uploads/"); 

	$max_size = 5;
	$types = array('png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG', 'gif', 'GIF'); 

	if( isset( $post['image'] ) ){
		$name = md5( time() ) .".jpg";
		$created = file_put_contents( UPLOADS . $name, base64_decode($post['image']) );
		echo json_encode( array( 'success'=>$name, 'status'=>$created ) ); 
		exit();
	}

	echo json_encode( $ret );
	exit();





	