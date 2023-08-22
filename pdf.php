<?php 
	ini_set("file_uploads", 1);
	ini_set("upload_tmp_dir", "/tmp");
	ini_set("upload_max_filesize", "10M");
	ini_set("post_max_size", "70M");
	ini_set("max_file_uploads", 3);

	include_once "./fpdf/fpdf.php"; 

	$post = $_REQUEST; 

	$ret = array('error'=>1, 'msg'=>"Data not found");

	define('UPLOADS', dirname(__FILE__) ."/uploads/"); 

	if( isset( $_POST['topdf'] ) ){ 
		$data = array( 
			'image'=> isset( $_POST['img'] ) ? $_POST['img'] : "",  
			'patient_id'=> isset( $_POST['pid'] ) ? $_POST['pid'] : "", 
			'firstname'=> isset( $_POST['firstname'] ) ? $_POST['firstname'] : "", 
			'lastname'=> isset( $_POST['lastname'] ) ? $_POST['lastname'] : "", 
			'date_of_birth'=> isset( $_POST['dob'] ) ? $_POST['dob'] : "", 
			'notes'=> isset( $_POST['notes'] ) ? $_POST['notes'] : "", 
			'eye'=> isset( $_POST['eye'] ) ? $_POST['eye'] : "", 
			'bcva'=> isset( $_POST['bcva'] ) ? $_POST['bcva'] : "", // PRE-OP BCVA 
			'ucva'=> isset( $_POST['ucva'] ) ? $_POST['ucva'] : "", //PRE-OP UCVA 
			'refraction'=> array(
				'sphere'=> isset( $_POST['rsphere'] ) ? $_POST['rsphere'] : "", 
				'cylinder'=> isset( $_POST['rcylinder'] ) ? $_POST['rcylinder'] : "", 
				'axis'=> isset( $_POST['raxis'] ) ? $_POST['raxis'] : ""
			), 
			'surgeon'=> isset( $_POST['surgeon'] ) ? $_POST['surgeon'] : "", 
			'date'=> date("Y.m.d H:i:s")
		); 
		$pdf = new FPDF( 'P', 'mm', 'A4' );
		if( $data['image'] ){
			$file = UPLOADS .$data['image']; 
			$new_image_name = $file; 
			//list($width, $height) = getimagesize( $file );
			//$r = $width / $height;
			//$newwidth = 800;
		    //$newheight = 800; 
		    //$src = imagecreatefromjpeg( $file );
			//$dst = imagecreatetruecolor( $newwidth, $newheight ); 
			//imagecopyresampled( $dst, $src, 0, 0, 0, 0, $newwidth, $newheight, $width, $height); 
			//$cur_image = imagejpeg( $dst, $file, 100 ); 
			
			//$src = imagecreatefromjpeg( $file ); 
			//if( $src ){
    		//	$dst = imagecrop( $src, ['x'=>0, 'y'=>0, 'width'=>800, 'height'=>800] ); 
    		//	$new_image_name = UPLOADS . md5( time() ) .".jpg"; 
    			//echo $new_image_name;
    		//	$cur_image = $dst ? imagejpeg( $dst, $new_image_name, 100 ) : false; 
    		//	imagedestroy( $src ); 
    		//	if( $cur_image && file_exists( $new_image_name ) ){ 
					$pdf->AddPage();
					//$pdf->Image( $file, $x, $y, $w, $h, $ext );
					$pdf->Image( $new_image_name, 10, 20, 177 ); 
			//	} 
			//}
		} 
		$interval = 12; 
		$border = "B";  
		$indent = "   "; 
		$base_font = 12; 
		$first_cell = 50; 
		$first_cell_align  = "L";

		$pdf->SetTextColor( 0, 0, 0 ); 
		$pdf->AddPage();
		$pdf->SetFont( 'Arial', 'B', 16 ); 
		$pdf->Ln( 0 ); 
		$pdf->Cell( 0, 15, "Patient Information", 0, 0, 'C' ); 
		$pdf->Ln( 40 ); 

		$pdf->SetFont( 'Arial', 'B', $base_font );
		$pdf->Cell( $first_cell, 12, $indent ."Patient ID:". $indent, 0, 0, $first_cell_align, $fill );
		$pdf->SetFont( 'Arial', '', $base_font );
		$pdf->Cell( 0, 12, $indent . $data['patient_id'], $border, 0, 'L' ); 
		$pdf->Ln( $interval ); 

		$pdf->SetFont( 'Arial', 'B', $base_font );
		$pdf->Cell( $first_cell, 12, $indent ."First name:". $indent, 0, 0, $first_cell_align, $fill );
		$pdf->SetFont( 'Arial', '', $base_font );
		$pdf->Cell( 0, 12, $indent . $data['firstname'], $border, 0, 'L' ); 
		$pdf->Ln( $interval ); 

		$pdf->SetFont( 'Arial', 'B', $base_font );
		$pdf->Cell( $first_cell, 12, $indent ."Last name:". $indent, 0, 0, $first_cell_align, $fill );
		$pdf->SetFont( 'Arial', '', $base_font );
		$pdf->Cell( 0, 12, $indent . $data['lastname'], $border, 0, 'L' ); 
		$pdf->Ln( $interval ); 

		$pdf->SetFont( 'Arial', 'B', $base_font );
		$pdf->Cell( $first_cell, 12, $indent ."Date of birth:". $indent, 0, 0, $first_cell_align, $fill );
		$pdf->SetFont( 'Arial', '', $base_font );
		$pdf->Cell( 0, 12, $indent . $data['date_of_birth'], $border, 0, 'L' ); 
		$pdf->Ln( $interval ); 

		$pdf->SetFont( 'Arial', 'B', $base_font );
		$pdf->Cell( $first_cell, 12, $indent ."Notes:". $indent, 0, 0, $first_cell_align, $fill );
		$pdf->SetFont( 'Arial', '', $base_font );
		$pdf->Cell( 0, 12, $indent . $data['notes'], $border, 0, 'L' ); 
		$pdf->Ln( $interval ); 

		$pdf->SetFont( 'Arial', 'B', $base_font );
		$pdf->Cell( $first_cell, 12, $indent . "Eye:". $indent, 0, 0, $first_cell_align, $fill );
		$pdf->SetFont( 'Arial', '', $base_font );
		$pdf->Cell( 0, 12, $indent . $data['eye'], $border, 0, 'L' ); 
		$pdf->Ln( $interval ); 

		$pdf->SetFont( 'Arial', 'B', $base_font );
		$pdf->Cell( $first_cell, 12, $indent ."PRE-OP BCVA:". $indent, 0, 0, $first_cell_align, $fill );
		$pdf->SetFont( 'Arial', '', $base_font );
		$pdf->Cell( 0, 12, $indent . $data['bcva'], $border, 0, 'L' ); 
		$pdf->Ln( $interval ); 

		$pdf->SetFont( 'Arial', 'B', $base_font );
		$pdf->Cell( $first_cell, 12, $indent ."PRE-OP UCVA:". $indent, 0, 0, $first_cell_align, $fill );
		$pdf->SetFont( 'Arial', '', $base_font );
		$pdf->Cell( 0, 12, $indent . $data['ucva'], $border, 0, 'L' ); 
		$pdf->Ln( $interval ); 

		$pdf->SetFont( 'Arial', 'B', $base_font );
		$pdf->Cell( $first_cell, 12, $indent ."Refraction sphere:". $indent, 0, 0, $first_cell_align, $fill );
		$pdf->SetFont( 'Arial', '', $base_font );
		$pdf->Cell( 0, 12, $indent . $data['refraction']['sphere'], $border, 0, 'L' ); 
		$pdf->Ln( $interval ); 

		$pdf->SetFont( 'Arial', 'B', $base_font );
		$pdf->Cell( $first_cell, 12, $indent ."Refraction cylinder:". $indent, 0, 0, $first_cell_align, $fill );
		$pdf->SetFont( 'Arial', '', $base_font );
		$pdf->Cell( 0, 12, $indent . $data['refraction']['cylinder'], $border, 0, 'L' ); 
		$pdf->Ln( $interval ); 

		$pdf->SetFont( 'Arial', 'B', $base_font );
		$pdf->Cell( $first_cell, 12, $indent ."Refraction axis:". $indent, 0, 0, $first_cell_align, $fill );
		$pdf->SetFont( 'Arial', '', $base_font );
		$pdf->Cell( 0, 12, $indent . $data['refraction']['axis'], $border, 0, 'L' ); 
		$pdf->Ln( $interval ); 

		$pdf->SetFont( 'Arial', 'B', $base_font );
		$pdf->Cell( $first_cell, 12, $indent ."Surgeon name:". $indent, 0, 0, $first_cell_align, $fill );
		$pdf->SetFont( 'Arial', '', $base_font );
		$pdf->Cell( 0, 12, $indent . $data['surgeon'], $border, 0, 'L' ); 
		$pdf->Ln( $interval ); 

		$pdf->SetFont( 'Arial', 'B', $base_font );
		$pdf->Cell( $first_cell, 12, $indent ."Date:". $indent, 0, 0, $first_cell_align, $fill );
		$pdf->SetFont( 'Arial', '', $base_font );
		$pdf->Cell( 0, 12, $indent . $data['date'], $border, 0, 'L' ); 
		$pdf->Ln( $interval ); 

		// dump data to pdf 
		$pdf_name = $data['firstname'] ." ". $data['lastname'] ." ". $data['date'] .".pdf";
		$result = $pdf->Output( "F", UPLOADS . $pdf_name );
		$ret = file_exists( UPLOADS . $pdf_name ) ? 
				array( 'success'=>1, 'file'=>$pdf_name ) : 
				array( 'error'=>1, 'msg'=>"Some error", 'data'=> $data, 'post'=> $_POST );
	}

	echo json_encode( $ret );
	exit();





	