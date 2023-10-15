function App(){
    return {
        canvas: false,  // canvas  
        ctx: false,     // context
        x: 0,           // canvas x
        y: 0,           // canvas y 
        w: 620,         // canvas width 
        h: 620,         // canvas height 
        r: 280,         // base radius 
        center: { x:310, y:310 }, 
        sys: { width:1, color:"#000", eye:"left" },
        lines: [        
            { 
                angle:0, width:1, color:'#FF0000', opacity:1, max:360, visibility:1, shift:1, name:"Axis 1", 
                    visual:'<div style="width:100%; height:10px; border-top:solid 3px #FF0000; border-bottom:solid 3px #FF0000; margin:10px 0px 0px 0px;"></div>', 
                arcs: [
                    { angle:45, radius:210, color:'#758FAD', opacity:0.5, width:20, max:355, shift:0, visibility:1, name:"Arc 1a", 
                        visual:'<div style="width:100%; height:0; border-bottom:solid 3px #758FAD; margin:15px 0px 0px 0px;"></div>' }, 
                    { angle:45, radius:195, color:'#758FAD', opacity:1, width:4, max:355, shift:0, visibility:0, name:"Arc 1b", 
                        visual:'<div style="width:100%; height:0; border-bottom:solid 3px #758FAD; margin:15px 0px 0px 0px;"></div>' },
                    { angle:45, radius:180, color:'#758FAD', opacity:0, width:4, max:355, shift:0, visibility:1, name:"Arc 1c", 
                        visual:'<div style="width:100%; height:0; border-bottom:solid 3px #758FAD; margin:15px 0px 0px 0px;"></div>' }
                ], 
                satellite: { 
                    name:"Incision", radius:220, shift:60, max:280, color:"#FF0000", opacity:1, width:1, visibility:1, 
                        visual:'<div style="width:0%; height:30%; border-left:solid 4px #FF0000; margin:5px 0px 0px 0px;"></div>' 
                } 
            }, 
            { 
                angle:-90, width:1, color:'#0000FF', opacity:1, max:360, visibility:1, shift:1, name:"Axis 2", 
                    visual:'<div style="width:100%; height:10px; border-top:solid 3px #0000FF; border-bottom:solid 3px #0000FF; margin:10px 0px 0px 0px;"></div>', 
                arcs: [
                    { angle:45, radius:203, color:'#758FAD', opacity:0.5, width:20, max:355, shift:0, visibility:1, name:"Arc 2a", 
                        visual:'<div style="width:100%; height:0; border-bottom:solid 3px #758FAD; margin:15px 0px 0px 0px;"></div>' }, 
                    { angle:45, radius:188, color:'#758FAD', opacity:1, width:4, max:355, shift:0, visibility:0, name:"Arc 2b", 
                        visual:'<div style="width:100%; height:0; border-bottom:solid 3px #758FAD; margin:15px 0px 0px 0px;"></div>' },
                    { angle:45, radius:172, color:'#758FAD', opacity:1, width:4, max:355, shift:0, visibility:0, name:"Arc 2c", 
                        visual:'<div style="width:100%; height:0; border-bottom:solid 3px #758FAD; margin:15px 0px 0px 0px;"></div>' }
                ], 
                satellite: { 
                    name:"Incision", radius:220, shift:60, max:280, color:"#0000FF", opacity:1, width:1, visibility:1, 
                        visual:'<div style="width:0%; height:30%; border-left:solid 4px #0000FF; margin:5px auto 0px 0px;"></div>' 
                } 
            } 
        ], 
        helpers: [
            { name:"Helper 1", angle: 30, max:360, color:"#000", opacity:1, width:1, dash: [2,5], visibility:0, 
                visual:'<div style="width:100%; height:0px; border-top:dotted 2px #4cb846; margin:15px 0px 0px 0px;"></div>' },
            { name:"Helper 2", angle: 60, max:360, color:"#000", opacity:1, width:1, dash: [2,5], visibility:0, 
                visual:'<div style="width:100%; height:0px; border-top:dotted 2px #0000FF; margin:15px 0px 0px 0px;"></div>' },
            { name:"Helper 3", angle: 120, max:360, color:"#000", opacity:1, width:1, dash:[10,5], visibility:0, 
                visual:'<div style="width:100%; height:0px; border-top:dashed 2px #4cb846; margin:15px 0px 0px 0px;"></div>' },
            { name:"Helper 4", angle: 150, max:360, color:"#000", opacity:1, width:1, dash:[10,5], visibility:0, 
                visual:'<div style="width:100%; height:0px; border-top:dashed 2px #0000FF; margin:15px 0px 0px 0px;"></div>' }
        ],
        PI: Math.PI, 
        init: function( $name ){
            var $this=this; 
            $this.canvas = document.getElementById($name);
            $this.ctx = $this.canvas.getContext('2d'); 
            $this.draw_settings();
            $this.process();
            $this.bind(); 
            $this.crop_image();
            //var img = new Image();
            //img.onload = function() {
            //    $this.ctx.drawImage( img, 400 - Math.round( img.width/2 ), 400 - Math.round( img.height/2 ) );
            //};
            //img.src = "res/img/eye.png"; 
            //img.onmousedown = function(){
            //   console.log("clicked");
            //} 

            interact('#photo').resizable({
                edges: { left: true, right: true, bottom: true, top: true }, // resize from all edges and corners
                listeners: {
                    move( event ){
                        var target = event.target; 
                        var x = (parseFloat(target.getAttribute('data-x')) || 0); 
                        var y = (parseFloat(target.getAttribute('data-y')) || 0); 
                        // update the element's style
                        target.style.width = event.rect.width + 'px'; 
                        target.style.height = event.rect.height + 'px'; 
                        // translate when resizing from top or left edges
                        x += event.deltaRect.left; 
                        y += event.deltaRect.top; 
                        target.style.transform = 'translate(' + x + 'px,' + y + 'px)';
                        target.setAttribute('data-x', x); 
                        target.setAttribute('data-y', y); 
                        //target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
                    }
                },
                modifiers: [
                    // keep the edges inside the parent
                    //interact.modifiers.restrictEdges({ outer: 'parent' }),
                    // minimum size
                    interact.modifiers.restrictSize({ min: { width: 100, height: 100 } })
                ],
                inertia: true
            }) //.draggable({ listeners: { move: window.dragMoveListener }, inertia: true, modifiers: [ interact.modifiers.restrictRect({ restriction: 'parent', endOnly: true }) ] }) 
            .draggable({ 
                inertia: true, 
                //modifiers: [ interact.modifiers.restrictRect({ restriction: 'parent', endOnly: true }) ],  
                autoScroll: true,
                listeners: { move: dragMoveListener }
            }).resizable({
                modifiers: [ 
                    interact.modifiers.aspectRatio({ ratio:1 }) 
                ] 
            });
            function dragMoveListener( event ){ 
                var target = event.target;
                // keep the dragged position in the data-x/data-y attributes
                var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
                // translate the element
                target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
                // update the posiion attributes
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
            // this function is used later in the resizing and gesture demos
            window.dragMoveListener = dragMoveListener; 
            
            // set axis scroll to start
            $('#spiner1 input[data-id="1"]').val( Math.abs( $this.lines[0].angle ) );
            $('#spiner1 input[data-id="2"]').val( Math.abs( $this.lines[1].angle ) ); 
            $('#slider1').val( Math.abs( $this.lines[0].angle ) );
            $('#slider2').val( Math.abs( $this.lines[1].angle ) );
            $('#arc1').val( $this.lines[0].arcs[0].angle );
            $('#arc2').val( $this.lines[1].arcs[0].angle ); 
            $('#slider3').val( $this.lines[0].arcs[0].angle );
            $('#slider4').val( $this.lines[1].arcs[0].angle ); 

            $('select[name="eye"] option').removeAttr('selected');
            $('select[name="eye"] option[value="'+ $this.sys.eye +'"]').attr('selected', "selected");
        },
        bind: function(){ 
            var $this=this; 
            $('.inputs').off().on('keyup', function(){
                var $self = $(this); 
                var $wrap = $self.parent(); 
                var $type = $self.data('type'); 
                var $id = +$self.data('id') - 1; 
                var $val = +$self.val();
                switch( $type ){ 
                    case "arc":  
                        for( var $i=0; $i<$this.lines[ $id ].arcs.length; $i++ ){
                            $this.lines[ $id ].arcs[ $i ].angle = $val > $this.lines[ $id ].arcs[ $i ].max ? $this.lines[ $id ].arcs[ $i ].max : $val;
                        } 
                        break; 
                    case "angle": 
                        $this.lines[ $id ][ $type ] = -( $val > $this.lines[ $id ][ $type ].max ? $this.lines[ $id ][ $type ].max : $val ); 
                        break; 
                } 
                $('.slider', $wrap).val( $self.val() );
                $this.process(); 
            }).on('change', function(){
                var $self = $(this); 
                var $wrap = $self.parent(); 
                var $type = $self.data('type'); 
                var $id = +$self.data('id') - 1; 
                var $val = +$self.val();
                switch( $type ){ 
                    case "arc":  
                        for( var $i=0; $i<$this.lines[ $id ].arcs.length; $i++ ){
                            $this.lines[ $id ].arcs[ $i ].angle = $val > $this.lines[ $id ].arcs[ $i ].max ? $this.lines[ $id ].arcs[ $i ].max : $val;
                        } 
                        break; 
                    case "angle": 
                        $this.lines[ $id ][ $type ] = -( $val > $this.lines[ $id ][ $type ].max ? $this.lines[ $id ][ $type ].max : $val ); 
                        break; 
                } 
                $('.slider', $wrap).val( $self.val() );
                $this.process(); 
            }); 
            $('.sliders').off().on('input', function(){
                var $self = $(this); 
                var $wrap = $self.parent().parent().parent(); 
                $('input', $wrap).val( $self.val() );
                $('.inputs', $wrap).val( $self.val() ).change();
            }); 
            $('#spiner1 .btn_left').off().on('click', function(){
                var $self=$(this); 
                var $wrap = $self.parent().parent().parent();
                var $range = $('input[type="range"]', $wrap);
                var $val = +$range.val(); 
                var $new_val = $val - 1; 
                var $type = $range.attr('data-type'); 
                var $id = +$range.attr('data-id') - 1; 
                switch( $type ){ 
                    case "arcs":  
                        for( var $i=0; $i<$this.lines[ $id ].arcs.length; $i++ ){ 
                            $new_val = $new_val > $this.lines[ $id ].arcs[ $i ].max ? $this.lines[ $id ].arcs[ $i ].max : $new_val; 
                            $new_val = $new_val < 0 ? 0 : $new_val;
                            $this.lines[ $id ].arcs[ $i ].angle =$new_val; 
                            $range.val( $new_val );
                        } 
                        break; 
                    case "lines": 
                        $new_val = $new_val > $this.lines[ $id ].max ? $this.lines[ $id ].max : $new_val;  
                        $new_val = $new_val < 0 ? 0 : $new_val;
                        $this.lines[ $id ].angle = -( $new_val ); 
                        $range.val( $new_val ); 
                        break; 
                } 
                $('input[type="text"]', $wrap).val( $new_val ); 
                $this.process();
            });
            $('#spiner1 .btn_right').off().on('click', function(){
                var $self=$(this); 
                var $wrap = $self.parent().parent().parent();
                var $range = $('input[type="range"]', $wrap);
                var $val = +$range.val(); 
                var $new_val = $val + 1; 
                var $type = $range.attr('data-type'); 
                var $id = +$range.attr('data-id') - 1; 
                switch( $type ){ 
                    case "arcs":  
                        console.log( $new_val );
                        for( var $i=0; $i<$this.lines[ $id ].arcs.length; $i++ ){ 
                            $new_val = $new_val > $this.lines[ $id ].arcs[ $i ].max ? $this.lines[ $id ].arcs[ $i ].max : $new_val; 
                            $new_val = $new_val < 0 ? 0 : $new_val; 
                            $this.lines[ $id ].arcs[ $i ].angle = $new_val; 
                        } 
                        $range.val( $new_val ); 
                        break; 
                    case "lines": 
                        $new_val = $new_val > $this.lines[ $id ].max ? $this.lines[ $id ].max : $new_val; 
                        $new_val = $new_val < 0 ? 0 : $new_val; 
                        $this.lines[ $id ].angle = -( $new_val ); 
                        $range.val( $new_val ); 
                        break; 
                } 
                $('input[type="text"]', $wrap).val( $new_val ); 
                $this.process();
            });
            $this.canvas.onmousemove = function($e){
                //var $x = $e.offsetX; 
                //var $y = $e.offsetY; 
                //console.log("Mouse move: "+ $x +" / "+ $y);
            } 
            $this.canvas.onmousedown = function($e){
                //var $x = $e.offsetX; 
                //var $y = $e.offsetY; 
                //console.log("Mouse click: "+ $x +" / "+ $y);
            }
            $this.canvas.onmouseup = function($e){
                
            } 
            //$('#uploader').off().on('click', function(){
            //    $this.show_photo();
            //}); 
            //$('#uploader').off().on('change', function(){
            //    var $self=$(this); 
            //    console.log( $self ); 
            //    $this.crop_image('res/img/eye.png');
            //});
            $('#show_settings').off().on('click', function(){  
                $('#settings').toggle(); 
            }); 
            $('#settings_close').off().on('click', function(){
                $('#settings').toggle(); 
            }); 
            $('#downloader').off().on('click', function(){
                console.log("save page");
                $('#overlay').show();
                html2canvas( document.querySelector("#main_wrapper") ).then( canvas => { 
                    var $output = document.querySelector('#output'); 
                    $output.innerHTML = ("");
                    $output.appendChild( canvas ); 
                    var $tmpc = document.querySelector('#output canvas');
                    var $ctx = $tmpc.getContext('2d'); 
                    var $data = $tmpc.toDataURL("image/jpeg").replace("data:image/jpeg;base64,", "");
                    $.ajax({
                        url:"/upload.php", method:"post", type:"post", data:{image:$data}, 
                        success: function($r){
                            var $obj = eval('('+ $r +')');
                            console.log( $obj );
                            if( $obj && $obj.success ){
                                var $name = $obj.success; 
                                /*var $link_id = "link_"+ Math.round( Math.random() * 10000 );
                                var $link = '<a download="'+ $name +'" href="/uploads/'+ $name +'" id="'+ $link_id  +'" style="visibility:hidden;"></a>'; 
                                $('body').append( $link );
                                $('#'+ $link_id).click(); 

                                let link = document.getElementById('link');  
                                link.setAttribute('download', 'example.png');
                                link.setAttribute('href', canvas.toDataURL("image/png"));
                                link.click();*/
                                //$('#save_image').attr('download', $name).attr('href', "/uploads/"+$name).click();
                                var link = document.getElementById('save_image');  
                                link.setAttribute('download', $name);
                                link.setAttribute('href', "/uploads/"+$name);
                                link.click();
                            } 
                            $('#overlay').hide();
                            return true; 
                        }, 
                        error: function($e){ console.error($e); $('#overlay').hide(); }
                    });
                    //try {
                        //const $blob = $tmpc.toBlob(resolve, 'image/jpg'); 
                        //console.log( $blob ); 
                        //
                        //var imageURI = $tmpc.toDataURL("image/png"); 
                        //var $link = document.querySelector('#downloader').href = imageURI; 
                    //} 
                    //catch(e){ } 
                });
                return true;
            }); 
            $('#topdf').off().on('click', function(){
                console.log("save page to pdf"); 
                $('#overlay').show();
                html2canvas( document.querySelector("#topdferapper") ).then( canvas => { 
                    var $output = document.querySelector('#output'); 
                    $output.innerHTML = ("");
                    $output.appendChild( canvas ); 
                    var $tmpc = document.querySelector('#output canvas');
                    var $ctx = $tmpc.getContext('2d'); 
                    var $data = $tmpc.toDataURL("image/jpeg").replace("data:image/jpeg;base64,", "");
                    $.ajax({
                        url:"/upload.php", method:"post", type:"post", data:{image:$data}, 
                        success: function($r){
                            var $obj = eval('('+ $r +')');
                            console.log( $obj );
                            if( $obj && $obj.success ){ 
                                var $data = {
                                    topdf: 1, 
                                    img: $obj.success, 
                                    pid: $('input[name="patientid"]').val(), 
                                    firstname: $('input[name="firstname"]').val(), 
                                    lastname: $('input[name="lastname"]').val(), 
                                    dob: $('input[name="dateofbirth"]').val(), 
                                    notes: $('textarea[name="notes"]').val(), 
                                    eye: $('select[name="eye"]').val(), 
                                    bcva: $('input[name="bcva"]').val(), 
                                    ucva: $('input[name="ucva"]').val(), 
                                    rsphere: $('select[name="refraction_sphere"]').val(), 
                                    rcylinder: $('select[name="refraction_cylinder"]').val(), 
                                    raxis: $('select[name="refraction_axis"]').val(), 
                                    surgeon: $('input[name="surgeon_name"]').val()
                                }
                                $.ajax({
                                    url: "/pdf.php", type:"post", method:"post", data: $data, 
                                    success: function( $r ){
                                        var $obj = eval('('+ $r +')'); 
                                        console.log( $obj ); 
                                        $('#overlay').hide();
                                        if( $obj && $obj.success ){ 
                                            //window.open("/uploads/"+$obj.file);
                                            var link = document.getElementById('save_image');  
                                            link.setAttribute('download', $obj.file);
                                            link.setAttribute('href', "/uploads/"+$obj.file);
                                            link.click(); 
                                        }
                                        return true;
                                    }, 
                                    error: function( $e ){ console.error( $e ); $('#overlay').hide(); }
                                });
                                return true;
                            } 
                            $('#overlay').hide();
                            return true;
                        }, 
                        error: function($e){ console.error($e); $('#overlay').hide(); }
                    }); 
                    return true;
                }); 
            }); 
            $('#settings input').off().on('change', function(){
                var $self=$(this); 
                var $wrap = $self.parent().parent(); 
                var $rel = $wrap.attr('data-rel'); 
                var $parent = $wrap.attr('data-parent'); 
                var $id = $wrap.attr('data-id'); 
                var $key = $self.attr('name'); 
                var $type = $self.attr('type'); 
                var $val = $self.val(); 
                console.log("Change rel: "+ $rel +", parent: "+ $parent +", id: "+ $id +", key: "+ $key +", value: "+ $val);
                switch( $rel ){
                    case "lines": 
                        /*if( $key == "angle" ){ 
                            $val = parseInt( $val );
                            $val = $val > $this.lines[ $id ].max ? $this.lines[ $id ].max : $val; 
                            $val = $val < 0 ? 0 : $val; 
                            $('.inputs [data-type="angle"]').eq( $id ).val( $val );
                        }*/
                        $this.lines[ $id ][ $key ] = $type == "checkbox" ? ( $self.is(':checked') ? 1 : 0 ) : $val; 
                        break; 
                    case "satellite": 
                        //$val = $key == "radius" && $val > $this.lines[ $parent ].satellite.max ? $this.lines[ $parent ].satellite.max : $val; 
                        //$val = $key == "radius" && $val < 0 ? 0 : $val; 
                        $this.lines[ $parent ].satellite[ $key ] = $type == "checkbox" ? ( $self.is(':checked') ? 1 : 0 ) : $val; 
                        break; 
                    case "arcs":  
                        //$val = $key == "radius" && $val > $this.lines[ $parent ].arcs[ $id ].max ? $this.lines[ $parent ].arcs[ $id ].max : $val; 
                        //$val = $key == "radius" && $val < 0 ? 0 : $val; 
                        $this.lines[ $parent ].arcs[ $id ][ $key ] = $type == "checkbox" ? ( $self.is(':checked') ? 1 : 0 ) : $val; 
                        break; 
                    case "helpers": 
                        //$val = $key == "angle" && $val > $this.helpers[ $id ].max ? $this.helpers[ $id ].max : $val; 
                        //$val = $key == "angle" && $val < 0 ? 0 : $val;
                        $this.helpers[ $id ][ $key ] = $type == "checkbox" ? ( $self.is(':checked') ? 1 : 0 ) : $val; 
                        break; 
                } 
                //$self.val( $val );
                $this.process(); 
            }); 
            $('select[name="eye"]').off().on('change', function(){ 
                var $self=$(this); 
                var $val = $self.val(); 
                $('.nose_wrapper').hide(); 
                $('#nose_'+ $val).show();  
                $this.sys.eye = $val; 
                $this.process();
            });
        }, 
        update_axis: function(){
            var $this=this; 
        },
        text: function( $text, $x, $y, $params ){
            //var text = ctx.measureText("foo"); return text.width; // text size before render
            var $this=this;
            $this.ctx.beginPath(); 
            $this.ctx.textAlign = $params && $params.align ? $params.align : "center";
            $this.ctx.textBaseline = $params && $params.baseline ? $params.baseline : "middle";
            $this.ctx.font = $params && $params.font ? $params.font : "normal 12px Arial"; 
            $this.ctx.fillStyle = $params && $params.color ? $params.color : "#000"; 
            $this.ctx.strokeStyle = $params && $params.scolor ? $params.scolor : "#000";
            if( $params && $params.shadow ){ 
                $this.ctx.shadowColor = "#000";
                $this.ctx.shadowOffsetX = 5;
                $this.ctx.shadowOffsetY = 5;
                $this.ctx.shadowBlur = 5;
            }
            if( $params && $params.stroke ){ $this.ctx.strokeText( $text, $x, $y ); }
            else { $this.ctx.fillText( $text, $x, $y ); }             
            $this.ctx.stroke();
            $this.ctx.closePath();
        }, 
        gradient: function(){
            var $this=this; 
            var $gradient = $this.ctx.createLinearGradient( 0, 0, 0, 60 );
            $gradient.addColorStop( 0.0, 'rgba(0, 0, 255, 1)' );
            $gradient.addColorStop( 0.3, 'rgba(128, 0, 255, 0.6)' );
            $gradient.addColorStop( 0.6, 'rgba(0, 0, 255, 0.4)' );
            $gradient.addColorStop( 1.0, 'rgba(0, 255, 0, 0.2)' );
            $this.ctx.fillStyle = $gradient; 
            return $gradient; 
        }, 
        pattern: function( $img ){
            var $this=this; 
            var $pattern = $this.ctx.createPattern( $img, 'repeat' );
            $this.ctx.fillStyle = $pattern; 
            return $pattern; 
        },
        line: function( $x1, $y1, $x2, $y2, $width, $color, $dash, $cap ){
            var $this=this; 
            $this.ctx.closePath();
            $this.ctx.beginPath(); 
            $this.ctx.lineWidth = $width ? $width : 1; 
            $this.ctx.strokeStyle = $color ? $color : "black"; 
            $this.ctx.lineCap = $cap ? $cap : "square"; // butt, square  round
            $this.ctx.setLineDash( ( $dash && $dash.length ) ? $dash : [] );
            $this.ctx.moveTo( $x1, $y1 );
            $this.ctx.lineTo( $x2, $y2 ); 
            $this.ctx.stroke();
            $this.ctx.closePath(); 
            return true;
        }, 
        arc: function( $x, $y, $radius, $start, $end, $direction, $width, $color, $fill ){ 
            var $this = this; 
            $this.ctx.closePath();
            $this.ctx.beginPath();
            $this.ctx.lineWidth = $width ? $width : 1; 
            $this.ctx.strokeStyle = $color ? $color : "black"; 
            if( $fill ){ $this.ctx.fillStyle = $fill; } 
            $this.ctx.arc( $x, $y, $radius, $start*($this.PI/180), $end*($this.PI/180), $direction ); // $direction true ccw false cw 
            if( $fill ){ $this.ctx.fill(); }
            $this.ctx.stroke();
            $this.ctx.closePath(); 
            return true;
        }, 
        filled_arch: function( $x, $y, $radius, $start, $end, $direction, $width, $color ){
            var $this=this;
            $this.ctx.closePath();
            $this.ctx.beginPath();
            $this.ctx.lineWidth = 1; 
            $this.ctx.strokeStyle = $color ? $color : "black";
            $this.ctx.fillStyle = $color ? $color : "black"; 
            $this.ctx.arc( $x, $y, $radius, $start*($this.PI/180), $end*($this.PI/180), $direction, 1, ( $color ? $color : "black" ) );
            $this.ctx.arc( $x, $y, $radius-$width, $end*($this.PI/180), $start*($this.PI/180), !$direction, 1, ( $color ? $color : "black" ) );
            $this.ctx.fill();
            $this.ctx.stroke();
            $this.ctx.closePath(); 
            return true;
        },
        show_photo: function(){
            var $this=this; 
            $('#photo').show(); 
        },
        crop_image: function(){  
            var $uploadCrop;

            function readFile(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    
                    reader.onload = function (e) {
                        $('.upload-demo').addClass('ready');
                        $uploadCrop.croppie('bind', {
                            url: e.target.result
                        }).then(function(){
                            console.log('jQuery bind complete');
                        });
                        
                    }
                    
                    reader.readAsDataURL(input.files[0]);
                }
                else {
                    swal("Sorry - you're browser doesn't support the FileReader API");
                }
            }

            function popupResult(result) { 
                console.log( result ); 
                //var $image = $('img', result.src).attr('src');
                //console.log( $image );
                $('#photo').css('background-image', 'url('+ result.src +')').show(); 
                $('#image_loader').hide(); 
            }

            $uploadCrop = $('#upload-demo').croppie({
                viewport: {
                    width: 620,
                    height: 620,
                    type: 'circle'
                },
                enableExif: true
            });

            $('#upload').on('change', function () { 
                $('#image_loader').css('display', "flex"); 
                readFile(this); 
            });
            
            $('.upload-result').on('click', function (ev) { 
                $uploadCrop.croppie('result', {
                    type: 'base64',
                    size: { width:480, height:480 }
                }).then(function (resp) {
                    popupResult({
                        src: resp
                    });
                });
            });
        },
        downloadCanvas: function( el ){ 
            var $this=this; 
            const imageURI = $this.canvas.toDataURL("image/png");
            el.href = imageURI;
        }, 
        deg2rad: function( $a ){
            var $this=this; 
            return $a * ( $this.PI / 180 )
        }, 
        hexToRgbA: function(hex, opacity){
            var c;
            if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
                c= hex.substring(1).split('');
                if(c.length== 3){
                    c= [c[0], c[0], c[1], c[1], c[2], c[2]];
                }
                c= '0x'+c.join('');
                return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+ ( typeof opacity != "undefined" ? opacity : 1 ) +')';
            }
            console.log('Bad Hex');
        },
        coords_from_angle: function( $x, $y, $radius, $angle ){
            var $this = this; 
            var $angle = $this.deg2rad( $angle ); 
            var $coord = {
                x: $x + $radius * Math.cos( $angle ), 
                y: $y + $radius * Math.sin( $angle )
            } 
            return $coord; 
        }, 
        field: function(){
            var $this = this; 
            $this.ctx.clearRect( 0, 0, 800, 800 );                                                                            // clear
            // circles 
            var $rads = [ 220, 160, 95 ];
            //$this.arc( $this.center.x, $this.center.y, $this.r, 0, 360, false, 1, '#000', '#fff' );                                  // BG
            $this.arc( $this.center.x, $this.center.y, $this.r, 0, 360, false, $this.sys.width, $this.sys.color );            // main outer circle
            //$this.arc( $this.center.x, $this.center.y, $rads[0], 4, 176, false, $this.sys.width, "green" );                        // main inner circle
            //$this.arc( $this.center.x, $this.center.y, $rads[0], 184, 356, false, $this.sys.width, "green" );                        // main inner circle
            //$this.arc( $this.center.x, $this.center.y, $rads[1], 5, 174, false, $this.sys.width, "green" );                        // main inner circle
            //$this.arc( $this.center.x, $this.center.y, $rads[1], 185, 355, false, $this.sys.width, "green" );                        // main inner circle
            //$this.arc( $this.center.x, $this.center.y, $rads[2], 6, 174, false, $this.sys.width, $this.sys.color );                 // main inner circle
            //$this.arc( $this.center.x, $this.center.y, $rads[2], 186, 354, false, $this.sys.width, $this.sys.color );                 // main inner circle
            //$this.arc( $this.center.x, $this.center.y, $rads[2], 0, 360, false, $this.sys.width, $this.sys.color );                 // main inner circle
            // grades
            var $grades = [ 0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165 ];
            for( var $i=0; $i<$grades.length; $i++ ){ 
                var $helper1 = $this.coords_from_angle( $this.center.x, $this.center.y, $this.r + 10, -( $grades[ $i ] ) ); 
                var $helper2 = $this.coords_from_angle( $this.center.x, $this.center.y, $this.r + 10, 180-(360-(-$grades[ $i ])) );
                $this.line( $helper1.x, $helper1.y, $helper2.x, $helper2.y, $this.sys.width, $this.sys.color, [20, $this.r*( $grades[$i] == 0 || $grades[ $i ] == 90 ? 1 : 2 )-20] ); 
            } 

            var $font = "normal 14px Arial"; 
            var $shift = 15;
            var $coord = $this.coords_from_angle( $this.center.x, $this.center.y, $this.r+$shift, 0 );
                $app.text( "0", $coord.x, $coord.y, { font: $font, align: "left" } );
            $coord = $this.coords_from_angle( $this.center.x, $this.center.y, $this.r+$shift, -30 );
                $app.text( "30", $coord.x, $coord.y, { font: $font, align: "left" } );
            $coord = $this.coords_from_angle( $this.center.x, $this.center.y, $this.r+$shift, -60 );
                $app.text( "60", $coord.x, $coord.y, { font: $font, align: "left" } );
            $coord = $this.coords_from_angle( $this.center.x, $this.center.y, $this.r+$shift, -90 );
                $app.text( "90", $coord.x, $coord.y, { font: $font  } ); 
            $coord = $this.coords_from_angle( $this.center.x, $this.center.y, $this.r+$shift, -120 );
                $app.text( "120", $coord.x, $coord.y, { font: $font, align: "right" } );
            $coord = $this.coords_from_angle( $this.center.x, $this.center.y, $this.r+$shift, -150 );
                $app.text( "150", $coord.x, $coord.y, { font: $font, align: "right" } );
            $coord = $this.coords_from_angle( $this.center.x, $this.center.y, $this.r+$shift, -180 );
                $app.text( "180", $coord.x, $coord.y, { font: $font } );
            $coord = $this.coords_from_angle( $this.center.x, $this.center.y, $this.r+$shift, -210 );
                $app.text( "210", $coord.x, $coord.y, { font: $font, align: "right" } );
            $coord = $this.coords_from_angle( $this.center.x, $this.center.y, $this.r+$shift, -240 );
                $app.text( "240", $coord.x, $coord.y, { font: $font, align: "right" } );
            $coord = $this.coords_from_angle( $this.center.x, $this.center.y, $this.r+$shift, -270 );
                $app.text( "270", $coord.x, $coord.y, { font: $font } );
            $coord = $this.coords_from_angle( $this.center.x, $this.center.y, $this.r+$shift, -300 );
                $app.text( "300", $coord.x, $coord.y, { font: $font, align: "left" } );
            $coord = $this.coords_from_angle( $this.center.x, $this.center.y, $this.r+$shift, -330 );
                $app.text( "330", $coord.x, $coord.y, { font: $font, align: "left" } );

            //$app.text( "3", $this.center.x-$rads[2], $this.center.y, { font: "normal 16px Arial"} );
            //$app.text( "5", $this.center.x-$rads[1], $this.center.y, { font: "normal 16px Arial"} );
            //$app.text( "7", $this.center.x-$rads[0], $this.center.y, { font: "normal 16px Arial"} ); 
            //$app.text( "3", $this.center.x+$rads[2], $this.center.y, { font: "normal 16px Arial"} );
            //$app.text( "5", $this.center.x+$rads[1], $this.center.y, { font: "normal 16px Arial"} );
            //$app.text( "7", $this.center.x+$rads[0], $this.center.y, { font: "normal 16px Arial"} );
            
            $app.text( ( $this.sys.eye ).toUpperCase() +" EYE", 5, 15, { color:"#000", font: "bold 25px Arial", align: "left", baseline: "top" } );//"#758FAD"

        }, 
        process: function(){
            var $this=this; 
            $this.field(); 
            // helpers
            for( var $i=0; $i<$this.helpers.length; $i++ ){
                var $row = $this.helpers[ $i ];  
                if( $row.visibility ){
                    var $helper1 = $this.coords_from_angle( $this.center.x, $this.center.y, $this.r + 10, -( $row.angle ) ); 
                    var $helper2 = $this.coords_from_angle( $this.center.x, $this.center.y, $this.r + 10, 180-(360-(-$row.angle)) );
                    $this.line( $helper1.x, $helper1.y, $helper2.x, $helper2.y, $row.width, $this.hexToRgbA($row.color, $row.opacity), $row.dash ); 
                }
            } 
            // calculator
            for( var $i=0; $i<$this.lines.length; $i++ ){
                var $line = $this.lines[ $i ]; 
                if( $line.visibility ){
                    // Axis
                    var $coord = $this.coords_from_angle( $this.center.x, $this.center.y, $this.r+10, $line.angle ); 
                    var $coord2 = $this.coords_from_angle( $this.center.x, $this.center.y, $this.r+10, 180-(360-($line.angle)) );
                    //$this.line( $coord.x, $coord.y, $coord2.x, $coord2.y, $line.width, $line.color ); 
                    // Satellite
                    if( $line.satellite && +$line.satellite.visibility ){
                        var $coord3 = $this.coords_from_angle( $this.center.x, $this.center.y, $line.satellite.radius, -90+$line.angle );
                        var $coord4 = $this.coords_from_angle( $this.center.x, $this.center.y, $line.satellite.radius-$line.satellite.shift, -90+$line.angle );
                        var $dash = [ $line.satellite.shift, $this.r ];//( $this.r - $line.satellite.shift )*2 ];
                        $this.line( $coord3.x, $coord3.y, $coord4.x, $coord4.y, $line.satellite.width, $this.hexToRgbA($line.satellite.color, $line.satellite.opacity) );
                        var $coord5 = $this.coords_from_angle( $this.center.x, $this.center.y, $line.satellite.radius, 180 - ( 360-( -90 + $line.angle ) ) );
                        var $coord6 = $this.coords_from_angle( $this.center.x, $this.center.y, $line.satellite.radius-$line.satellite.shift, 180 - ( 360-( -90 + $line.angle ) ) ); 
                        $this.line( $coord5.x, $coord5.y, $coord6.x, $coord6.y, $line.satellite.width, $this.hexToRgbA($line.satellite.color, $line.satellite.opacity) ); 
                    } 

                    var $acc = $line.shift/2; 
                    var $coord7 = $this.coords_from_angle( $this.center.x, $this.center.y, $this.r+10, $line.angle+$acc ); 
                    var $coord8 = $this.coords_from_angle( $this.center.x, $this.center.y, $this.r+10, 180-(360-($line.angle-$acc)) );
                    $this.line( $coord7.x, $coord7.y, $coord8.x, $coord8.y, $line.width, $this.hexToRgbA($line.color, $line.opacity) ); 
                    var $coord9 = $this.coords_from_angle( $this.center.x, $this.center.y, $this.r+10, $line.angle-$acc ); 
                    var $coord10 = $this.coords_from_angle( $this.center.x, $this.center.y, $this.r+10, 180-(360-($line.angle+$acc)) );
                    $this.line( $coord9.x, $coord9.y, $coord10.x, $coord10.y, $line.width, $this.hexToRgbA($line.color, $line.opacity) ); 

                    // Arcs
                    for( var $j=0; $j<$line.arcs.length; $j++ ){ 
                        var $arc = $line.arcs[ $j ]; 
                        if( +$arc.visibility ){ 
                            var $start = ( $arc.angle / 2 ); 
                            $start = $start > 177.5 ? 177.5 : ( $start < -177.5 ? -177.5 : $start ); 
                            var $a = $line.angle + $start; 
                            var $b = $line.angle - $start;   
                            //console.log( "angle: ", $line.angle, $start );
                            if( $arc.angle != 0 ){
                                //$this.arc( $this.center.x, $this.center.y, $arc.radius-$arc.shift, $a, $b, true, $arc.width, $this.hexToRgbA($arc.color, $arc.opacity) ); 
                                $this.filled_arch( $this.center.x, $this.center.y, $arc.radius-$arc.shift, $a, $b, true, $arc.width, $this.hexToRgbA($arc.color, $arc.opacity) ); 
                            }
                        } else { $arc = {} }
                    } 
                }
            }
        }, 
        draw_settings: function(){
            var $this=this; 
            // Axis
            for( var $i=0; $i<$this.lines.length; $i++ ){
                var $row = $this.lines[ $i ]; 
                var $tmps = '<div class="line" data-rel="lines" data-id="'+ $i +'">'+ 
                                '<div class="item"> <span>'+ $row.name +'</span>'+ $row.visual +'</div>'+ 
                                '<div class="item"> <span>Shift</span> <input type="text" value="'+ $row.shift +'" name="shift" maxlength="2" /> </div>'+ 
                                '<div class="item"> <span>Width</span> <input type="text" value="'+ $row.width +'" name="width" maxlength="2" /> </div>'+ 
                                '<div class="item"> <span>Opacity</span> <input type="text" value="'+ $row.opacity +'" name="opacity" maxlength="3" /> </div>'+ 
                                '<div class="item"> <span>Color</span> <input type="color" value="'+ $row.color +'" name="color" /> </div>'+ 
                                '<div class="item"> <span>Visibility</span> <input type="checkbox" name="visibility" value="" '+ ( $row.visibility ? 'checked="checked"' : '' ) +' /> </div>'+ 
                            '</div>'; 
                $('#settings .field').append( $tmps ); 
                // Perpendiculars
                if( $row.satellite ){ 
                    var $tmps = '<div class="line" data-rel="satellite" data-id="0" data-parent="'+ $i +'">'+ 
                            '<div class="item"> <span>'+ $row.satellite.name +'</span>'+ $row.satellite.visual +'</div>'+ 
                            '<div class="item"> <span>Radius</span> <input type="text" value="'+ $row.satellite.radius +'" name="radius" maxlength="3" /> </div>'+  
                            '<div class="item"> <span>Width</span> <input type="text" value="'+ $row.satellite.width +'" name="width" maxlength="3" /> </div>'+ 
                            '<div class="item"> <span>Opacity</span> <input type="text" value="'+ $row.satellite.opacity +'" name="opacity" maxlength="3" /> </div>'+ 
                            '<div class="item"> <span>Color</span> <input type="color" value="'+ $row.satellite.color +'" name="color" /> </div>'+ 
                            '<div class="item"> <span>Visibility</span> <input type="checkbox" value="" name="visibility" '+ ( $row.satellite.visibility ? 'checked="checked"' : '' ) +' /> </div>'+ 
                        '</div>'; 
                    $('#settings .field').append( $tmps ); 
                }
                // Arks
                if( $row.arcs && $row.arcs.length ){
                    for( var $j=0; $j<$row.arcs.length; $j++ ){
                        var $arc = $row.arcs[ $j ]; 
                        var $tmps = '<div class="line" data-rel="arcs" data-id="'+ $j +'" data-parent="'+ $i +'">'+ 
                                '<div class="item"> <span>'+ $arc.name +'</span>'+ $arc.visual +'</div>'+ 
                                '<div class="item"> <span>Radius</span> <input type="text" value="'+ $arc.radius +'" name="radius" maxlength="3" /> </div>'+ 
                                '<div class="item"> <span>Width</span> <input type="text" value="'+ $arc.width +'" name="width" maxlength="3" /> </div>'+ 
                                '<div class="item"> <span>Opacity</span> <input type="text" value="'+ $arc.opacity +'" name="opacity" maxlength="3" /> </div>'+ 
                                '<div class="item"> <span>Color</span> <input type="color" value="'+ $arc.color +'" name="color" /> </div>'+ 
                                '<div class="item"> <span>Visibility</span> <input type="checkbox" value="" name="visibility" '+ ( $arc.visibility ? 'checked="checked"' : '' ) +' /> </div>'+ 
                            '</div>'; 
                $('#settings .field').append( $tmps ); 
                    }
                }
            }
            // Helpers
            for( var $i=0; $i<$this.helpers.length; $i++ ){
                var $row = $this.helpers[ $i ];
                var $tmps = '<div class="line" data-rel="helpers" data-id="'+ $i +'">'+ 
                                '<div class="item"> <span>'+ $row.name +'</span>'+ $row.visual +'</div>'+ 
                                '<div class="item"> <span>Angle</span> <input type="text" value="'+ $row.angle +'" name="angle" maxlength="3" /> </div>'+ 
                                '<div class="item"> <span>Width</span> <input type="text" value="'+ $row.width +'" name="width" maxlength="3" /> </div>'+ 
                                '<div class="item"> <span>Opacity</span> <input type="text" value="'+ $row.opacity +'" name="opacity" maxlength="3" /> </div>'+ 
                                '<div class="item"> <span>Color</span> <input type="color" value="'+ $row.color +'" name="color" /> </div>'+ 
                                '<div class="item"> <span>Visibility</span> <input type="checkbox" value="" name="visibility" '+ ( $row.visibility ? 'checked="checked"' : '' ) +' /> </div>'+ 
                            '</div>'; 
                $('#settings .field').append( $tmps );
            }
        }
    }
}
$(document).ready(function(){ 
    window.$app = new App(); 
    $app.init("canvas");
}); 
   

