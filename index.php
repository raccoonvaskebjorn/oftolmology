<!DOCTYPE html>
<html lang="ru">
<head>
    <title>

    </title> 
    <meta http-equiv="Content-Type" content="application/xhtml+xml; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta name="keywords" content=" " />
    <meta name="description" content=" " /> 
    <link rel="shortcut icon" href="logo.png" type="image/x-icon" /> 
    <link rel="stylesheet" href="res/css/reset.css">   
    <link rel="stylesheet" href="res/css/croppie.css">   
    <link rel="stylesheet" href="res/css/index.css?<?= rand(0,99999); ?>">   
    <script type="text/javascript" src="res/js/jquery.js"></script> 
    <script type="text/javascript" src="res/js/interact.js"></script> 
    <script type="text/javascript" src="res/js/croppie.js"></script> 
    <script type="text/javascript" src="res/js/html2canvas.js"></script> 
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;700;900&display=swap" rel="stylesheet">  
</head>
<body>
    <div id="main_wrapper">
        <div id="main_field"> 
            <div id="topdferapper"> 
                <div id="nose_left" class="nose_wrapper">
                    <div class="info">
                        <div class="line"><hr></div>
                        <div class="word">NOSE</div>
                        <div class="line"><hr></div>
                    </div>
                </div>
                <div id="canvas_wrapper">
                    <div id="canvas_bg">
                        <canvas id="canvas" width="620" height="620"></canvas>
                        <div id="photo" style="">
                            <div class="marker a"></div>
                            <div class="marker b"></div>
                            <div class="marker c"></div>
                            <div class="marker d"></div>
                            <div class="marker e"></div>
                            <div class="marker f"></div>
                            <div class="marker g"></div>
                            <div class="marker h"></div> 
                        </div>
                    </div>
                    <div id="spiner1">
                        <div class="wrap">
                            <div class="item"> 
                                <div class="inner"> 
                                    <h3>Axis 1</h3>
                                    <div class="range">
                                        <button class="btn_left"></button>
                                        <input id="slider1" class="sliders" type="range" value="0" min="0" max="360" data-type="lines" data-id="1" />  
                                         <button class="btn_right"></button>
                                    </div>
                                </div>
                                <div class="inner"> 
                                    <h3>&nbsp;</h3>
                                    <input type="text" value="0" class="inputs" data-id="1" data-type="angle" autocomplete="false" maxlength="3" />
                                </div>
                            </div>
                            <div class="item">
                                <div class="inner">  
                                    <h3>Arc 1</h3>
                                    <div class="range"> 
                                        <button class="btn_left"></button>
                                        <input id="slider3" class="sliders" type="range" value="0" min="0" max="355" data-type="arcs" data-id="1" /> 
                                         <button class="btn_right"></button>
                                    </div>
                                </div>
                                <div class="inner"> 
                                    <h3>&nbsp;</h3>
                                    <input type="text" value="0" class="inputs" data-id="1" id="arc1" data-type="arc" autocomplete="false" maxlength="3" /> 
                                </div>
                            </div>
                        </div>
                        <div class="wrap">
                            <div class="item"> 
                                <div class="inner"> 
                                    <h3>Axis 2</h3> 
                                    <div class="range">
                                        <button class="btn_left"></button>
                                        <input id="slider2" class="sliders" type="range" value="0" min="0" max="360" data-type="lines" data-id="2" />  
                                         <button class="btn_right"></button>
                                    </div>
                                </div> 
                                <div class="inner">
                                    <h3>&nbsp;</h3>
                                    <input type="text" value="0" class="inputs" data-id="2" data-type="angle" autocomplete="false" maxlength="3" />
                                </div>
                            </div>
                            <div class="item">
                                <div class="inner">
                                    <h3>Arc 2</h3>
                                    <div class="range">
                                        <button class="btn_left"></button>
                                        <input id="slider4" class="sliders" type="range" value="0" min="0" max="355" data-type="arcs" data-id="2" />
                                        <button class="btn_right"></button>
                                    </div>
                                </div>
                                <div class="inner">
                                    <h3>&nbsp;</h3>
                                    <input type="text" value="0" class="inputs" data-id="2" id="arc2" data-type="arc" autocomplete="false" maxlength="3" /> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--button id="show_settings">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.7369 12.3941L19.1989 12.1065C18.4459 11.7041 18.0843 10.8487 18.0843 9.99495C18.0843 9.14118 18.4459 8.28582 19.1989 7.88336L19.7369 7.59581C19.9474 7.47484 20.0316 7.23291 19.9474 7.03131C19.4842 5.57973 18.6843 4.28943 17.6738 3.20075C17.5053 3.03946 17.2527 2.99914 17.0422 3.12011L16.393 3.46714C15.6883 3.84379 14.8377 3.74529 14.1476 3.3427C14.0988 3.31422 14.0496 3.28621 14.0002 3.25868C13.2568 2.84453 12.7055 2.10629 12.7055 1.25525V0.70081C12.7055 0.499202 12.5371 0.297594 12.2845 0.257272C10.7266 -0.105622 9.16879 -0.0653007 7.69516 0.257272C7.44254 0.297594 7.31623 0.499202 7.31623 0.70081V1.23474C7.31623 2.09575 6.74999 2.8362 5.99824 3.25599C5.95774 3.27861 5.91747 3.30159 5.87744 3.32493C5.15643 3.74527 4.26453 3.85902 3.53534 3.45302L2.93743 3.12011C2.72691 2.99914 2.47429 3.03946 2.30587 3.20075C1.29538 4.28943 0.495411 5.57973 0.0322686 7.03131C-0.051939 7.23291 0.0322686 7.47484 0.242788 7.59581L0.784376 7.8853C1.54166 8.29007 1.92694 9.13627 1.92694 9.99495C1.92694 10.8536 1.54166 11.6998 0.784375 12.1046L0.242788 12.3941C0.0322686 12.515 -0.051939 12.757 0.0322686 12.9586C0.495411 14.4102 1.29538 15.7005 2.30587 16.7891C2.47429 16.9504 2.72691 16.9907 2.93743 16.8698L3.58669 16.5227C4.29133 16.1461 5.14131 16.2457 5.8331 16.6455C5.88713 16.6767 5.94159 16.7074 5.99648 16.7375C6.75162 17.1511 7.31623 17.8941 7.31623 18.7552V19.2891C7.31623 19.4425 7.41373 19.5959 7.55309 19.696C7.64066 19.7589 7.74815 19.7843 7.85406 19.8046C9.35884 20.0925 10.8609 20.0456 12.2845 19.7729C12.5371 19.6923 12.7055 19.4907 12.7055 19.2891V18.7346C12.7055 17.8836 13.2568 17.1454 14.0002 16.7312C14.0496 16.7037 14.0988 16.6757 14.1476 16.6472C14.8377 16.2446 15.6883 16.1461 16.393 16.5227L17.0422 16.8698C17.2527 16.9907 17.5053 16.9504 17.6738 16.7891C18.7264 15.7005 19.4842 14.4102 19.9895 12.9586C20.0316 12.757 19.9474 12.515 19.7369 12.3941ZM10.0109 13.2005C8.1162 13.2005 6.64257 11.7893 6.64257 9.97478C6.64257 8.20063 8.1162 6.74905 10.0109 6.74905C11.8634 6.74905 13.3792 8.20063 13.3792 9.97478C13.3792 11.7893 11.8634 13.2005 10.0109 13.2005Z"></path>
                        </svg>
                    </button-->
                    <div id="settings">
                        <h2>Settings</h2>
                        <div class="field"></div>
                        <div class="buttons"> 
                            <button class="downloader" id="settings_close">Close</button>
                        </div>
                    </div>
                </div>
                <div id="nose_right" class="nose_wrapper">
                    <div class="info">
                        <div class="line"><hr></div>
                        <div class="word">NOSE</div>
                        <div class="line"><hr></div>
                    </div>
                </div>

            </div>

            <div id="patient_data">
                <h2>Patient information</h2>
                <div class="line">
                    <div class="item"> 
                        <div><span>First name</span></div> 
                        <div><input type="text" value="" name="firstname" maxlength="50" /></div> 
                    </div>
                    <div class="item"> 
                        <div><span>Last name</span></div> 
                        <div><input type="text" value="" name="lastname" maxlength="50" /></div> 
                    </div>
                </div>
                <div class="line">
                    <div class="item"> 
                        <div><span>Date of birth</span></div> 
                        <div><input type="date" value="" format="dd / mm / yyyy" placeholder="dd / mm / yyyy" name="dateofbirth" /> </div>
                    </div>
                    <div class="item"> 
                        <div><span>Patient ID</span> </div>
                        <div><input type="text" value="" maxlength="50" name="patientid" /> </div>
                    </div>
                </div>
                <div class="line">
                    <div class="item"> 
                        <div><span>Notes</span> </div>
                        <div><textarea name="notes" maxlength="10240"></textarea> </div>
                    </div>
                </div> 
                <div class="line">
                    <div class="item"> 
                        <div><span>Eye</span> </div> 
                        <div>
                            <select name="eye"> 
                                <option value="left" selected="selected">Left</option>
                                <option value="right">Right</option> 
                            </select>
                        </div>
                    </div>
                    <div class="item"> 
                        <div><span>PRE-OP BCVA</span> </div>
                        <div><input type="text" value="" name="bcva" maxlength="100" /> </div>
                    </div>
                    <div class="item"> 
                        <div><span>PRE-OP UCVA</span> </div>
                        <div><input type="text" value="" name="ucva" maxlength="100" /> </div>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
                <h2>Refraction</h2>
                <div class="line">
                    <div class="item"> 
                        <div><span>Sphere</span> </div>
                        <div> 
                            <select name="refraction_sphere"> 
                                <option value="-12.00">-12.00</option><option value="-11.75">-11.75</option><option value="-11.50">-11.50</option><option value="-11.25">-11.25</option><option value="-11.00">-11.00</option><option value="-10.75">-10.75</option><option value="-10.50">-10.50</option><option value="-10.25">-10.25</option><option value="-10.00">-10.00</option><option value="-9.75">-9.75</option><option value="-9.50">-9.50</option><option value="-9.25">-9.25</option><option value="-9.00">-9.00</option><option value="-8.75">-8.75</option><option value="-8.50">-8.50</option><option value="-8.25">-8.25</option><option value="-8.00">-8.00</option><option value="-7.75">-7.75</option><option value="-7.50">-7.50</option><option value="-7.25">-7.25</option><option value="-7.00">-7.00</option><option value="-6.75">-6.75</option><option value="-6.50">-6.50</option><option value="-6.25">-6.25</option><option value="-6.00">-6.00</option><option value="-5.75">-5.75</option><option value="-5.50">-5.50</option><option value="-5.25">-5.25</option><option value="-5.00">-5.00</option><option value="-4.75">-4.75</option><option value="-4.50">-4.50</option><option value="-4.25">-4.25</option><option value="-4.00">-4.00</option><option value="-3.75">-3.75</option><option value="-3.50">-3.50</option><option value="-3.25">-3.25</option><option value="-3.00">-3.00</option><option value="-2.75">-2.75</option><option value="-2.50">-2.50</option><option value="-2.25">-2.25</option><option value="-2.00">-2.00</option><option value="-1.75">-1.75</option><option value="-1.50">-1.50</option><option value="-1.25">-1.25</option><option value="-1.00">-1.00</option><option value="-0.75">-0.75</option><option value="-0.50">-0.50</option><option value="-0.25">-0.25</option><option selected="" value=""></option><option value="0">Plano</option><option value="0.00">0.00</option><option value="0.25">+0.25</option><option value="0.50">+0.50</option><option value="0.75">+0.75</option><option value="1.00">+1.00</option><option value="1.25">+1.25</option><option value="1.50">+1.50</option><option value="1.75">+1.75</option><option value="2.00">+2.00</option><option value="2.25">+2.25</option><option value="2.50">+2.50</option><option value="2.75">+2.75</option><option value="3.00">+3.00</option><option value="3.25">+3.25</option><option value="3.50">+3.50</option><option value="3.75">+3.75</option><option value="4.00">+4.00</option><option value="4.25">+4.25</option><option value="4.50">+4.50</option><option value="4.75">+4.75</option><option value="5.00">+5.00</option><option value="5.25">+5.25</option><option value="5.50">+5.50</option><option value="5.75">+5.75</option><option value="6.00">+6.00</option><option value="6.25">+6.25</option><option value="6.50">+6.50</option><option value="6.75">+6.75</option><option value="7.00">+7.00</option><option value="7.25">+7.25</option><option value="7.50">+7.50</option><option value="7.75">+7.75</option><option value="8.00">+8.00</option><option value="8.25">+8.25</option><option value="8.50">+8.50</option>
                            </select>
                        </div>
                    </div>
                    <div class="item"> 
                        <div><span>Cylinder</span> </div> 
                        <div> 
                            <select name="refraction_cylinder"> 
                                <option value="-6.5">-18.00</option>
                                <option value="-6.5">-18.75</option>
                                <option value="-6.5">-18.50</option>
                                <option value="-6.5">-18.25</option>
                                <option value="-6.5">-18.00</option>
                                <option value="-6.5">-17.75</option>
                                <option value="-6.5">-17.50</option>
                                <option value="-6.5">-17.25</option>
                                <option value="-6.5">-17.00</option>
                                <option value="-6.5">-16.75</option>
                                <option value="-6.5">-16.50</option>
                                <option value="-6.5">-16.25</option>
                                <option value="-6.5">-16.00</option>
                                <option value="-6.5">-15.75</option>
                                <option value="-6.5">-15.50</option>
                                <option value="-6.5">-15.25</option>
                                <option value="-6.5">-15.00</option>
                                <option value="-6.5">-14.75</option>
                                <option value="-6.5">-14.50</option>
                                <option value="-6.5">-14.25</option>
                                <option value="-6.5">-14.00</option>
                                <option value="-6.5">-13.75</option>
                                <option value="-6.5">-13.50</option>
                                <option value="-6.5">-13.25</option>
                                <option value="-6.5">-13.00</option>
                                <option value="-6.5">-12.75</option>
                                <option value="-6.5">-12.50</option>
                                <option value="-6.5">-12.25</option>
                                <option value="-6.5">-12.00</option>
                                <option value="-6.5">-11.75</option>
                                <option value="-6.5">-11.50</option>
                                <option value="-6.5">-11.25</option>
                                <option value="-6.5">-11.00</option>
                                <option value="-6.5">-10.75</option>
                                <option value="-6.5">-10.50</option>
                                <option value="-6.5">-10.25</option>
                                <option value="-6.5">-10.00</option>
                                <option value="-6.5">-9.75</option>
                                <option value="-6.5">-9.50</option>
                                <option value="-6.5">-9.25</option>
                                <option value="-6.5">-9.00</option>
                                <option value="-6.5">-8.75</option>
                                <option value="-6.5">-8.50</option>
                                <option value="-6.5">-8.25</option>
                                <option value="-6.5">-8.00</option>
                                <option value="-6.5">-7.75</option>
                                <option value="-6.5">-7.50</option>
                                <option value="-6.5">-7.25</option>
                                <option value="-6.5">-7.00</option>
                                <option value="-6.25">-6.75</option>
                                <option value="-6.25">-6.50</option>
                                <option value="-6.25">-6.25</option>
                                <option value="-6.00">-6.00</option>
                                <option value="-5.75">-5.75</option>
                                <option value="-5.50">-5.50</option>
                                <option value="-5.25">-5.25</option>
                                <option value="-5.00">-5.00</option>
                                <option value="-4.75">-4.75</option>
                                <option value="-4.50">-4.50</option>
                                <option value="-4.25">-4.25</option>
                                <option value="-4.00">-4.00</option>
                                <option value="-3.75">-3.75</option>
                                <option value="-3.50">-3.50</option>
                                <option value="-3.25">-3.25</option>
                                <option value="-3.00">-3.00</option>
                                <option value="-2.75">-2.75</option>
                                <option value="-2.50">-2.50</option>
                                <option value="-2.25">-2.25</option>
                                <option value="-2.00">-2.00</option>
                                <option value="-1.75">-1.75</option>
                                <option value="-1.50">-1.50</option>
                                <option value="-1.25">-1.25</option>
                                <option value="-1.00">-1.00</option>
                                <option value="-0.75">-0.75</option>
                                <option value="-0.50">-0.50</option>
                                <option value="-0.25">-0.25</option>
                                <option selected="" value=""></option>
                                <!--option value="None">None</option-->
                                <option value="DS">DS</option>
                                <!--option value="SPH">SPH</option-->
                                <!--option value="0.00">0.00</option-->
                                <option value="0.25">+0.25</option>
                                <option value="0.50">+0.50</option>
                                <option value="0.75">+0.75</option>
                                <option value="1.00">+1.00</option>
                                <option value="1.25">+1.25</option>
                                <option value="1.50">+1.50</option>
                                <option value="1.75">+1.75</option>
                                <option value="2.00">+2.00</option>
                                <option value="2.25">+2.25</option>
                                <option value="2.50">+2.50</option>
                                <option value="2.75">+2.75</option>
                                <option value="3.00">+3.00</option>
                                <option value="3.25">+3.25</option>
                                <option value="3.50">+3.50</option>
                                <option value="3.75">+3.75</option>
                                <option value="4.00">+4.00</option>
                                <option value="4.25">+4.25</option>
                                <option value="4.50">+4.50</option>
                                <option value="4.75">+4.75</option>
                                <option value="5.00">+5.00</option>
                                <option value="5.25">+5.25</option>
                                <option value="5.50">+5.50</option>
                                <option value="5.75">+5.75</option>
                                <option value="6.00">+6.00</option>
                                <option value="6.25">+6.25</option>
                                <option value="6.50">+6.50</option>
                                <option value="6.50">+6.75</option>
                                <option value="6.50">+7.00</option>
                                <option value="6.50">+7.25</option>
                                <option value="6.50">+7.50</option>
                                <option value="6.50">+7.75</option>
                                <option value="6.50">+8.00</option>
                                <option value="6.50">+8.25</option>
                                <option value="6.50">+8.50</option>
                                <option value="6.50">+8.75</option>
                                <option value="6.50">+9.00</option>
                                <option value="6.50">+9.25</option>
                                <option value="6.50">+9.50</option>
                                <option value="6.50">+9.75</option>
                                <option value="6.50">+10.00</option>
                                <option value="6.50">+10.25</option>
                                <option value="6.50">+10.50</option>
                                <option value="6.50">+10.75</option>
                                <option value="6.50">+11.00</option>
                                <option value="6.50">+11.25</option>
                                <option value="6.50">+11.50</option>
                                <option value="6.50">+11.75</option>
                                <option value="6.50">+12.00</option>
                            </select>
                        </div>
                    </div>
                    <div class="item"> 
                        <div><span>Axis</span> </div> 
                        <div> 
                            <select name="refraction_axis">
                                <option selected="" value=""></option><option value="None">None</option><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option><option value="60">60</option><option value="61">61</option><option value="62">62</option><option value="63">63</option><option value="64">64</option><option value="65">65</option><option value="66">66</option><option value="67">67</option><option value="68">68</option><option value="69">69</option><option value="70">70</option><option value="71">71</option><option value="72">72</option><option value="73">73</option><option value="74">74</option><option value="75">75</option><option value="76">76</option><option value="77">77</option><option value="78">78</option><option value="79">79</option><option value="80">80</option><option value="81">81</option><option value="82">82</option><option value="83">83</option><option value="84">84</option><option value="85">85</option><option value="86">86</option><option value="87">87</option><option value="88">88</option><option value="89">89</option><option value="90">90</option><option value="91">91</option><option value="92">92</option><option value="93">93</option><option value="94">94</option><option value="95">95</option><option value="96">96</option><option value="97">97</option><option value="98">98</option><option value="99">99</option><option value="100">100</option><option value="101">101</option><option value="102">102</option><option value="103">103</option><option value="104">104</option><option value="105">105</option><option value="106">106</option><option value="107">107</option><option value="108">108</option><option value="109">109</option><option value="110">110</option><option value="111">111</option><option value="112">112</option><option value="113">113</option><option value="114">114</option><option value="115">115</option><option value="116">116</option><option value="117">117</option><option value="118">118</option><option value="119">119</option><option value="120">120</option><option value="121">121</option><option value="122">122</option><option value="123">123</option><option value="124">124</option><option value="125">125</option><option value="126">126</option><option value="127">127</option><option value="128">128</option><option value="129">129</option><option value="130">130</option><option value="131">131</option><option value="132">132</option><option value="133">133</option><option value="134">134</option><option value="135">135</option><option value="136">136</option><option value="137">137</option><option value="138">138</option><option value="139">139</option><option value="140">140</option><option value="141">141</option><option value="142">142</option><option value="143">143</option><option value="144">144</option><option value="145">145</option><option value="146">146</option><option value="147">147</option><option value="148">148</option><option value="149">149</option><option value="150">150</option><option value="151">151</option><option value="152">152</option><option value="153">153</option><option value="154">154</option><option value="155">155</option><option value="156">156</option><option value="157">157</option><option value="158">158</option><option value="159">159</option><option value="160">160</option><option value="161">161</option><option value="162">162</option><option value="163">163</option><option value="164">164</option><option value="165">165</option><option value="166">166</option><option value="167">167</option><option value="168">168</option><option value="169">169</option><option value="170">170</option><option value="171">171</option><option value="172">172</option><option value="173">173</option><option value="174">174</option><option value="175">175</option><option value="176">176</option><option value="177">177</option><option value="178">178</option><option value="179">179</option><option value="180">180</option>
                            </select>
                        </div>
                    </div>
                </div> 
                <div class="line">
                    <div class="item"> 
                        <div><span>Surgeon</span> </div>
                        <div><input type="text" value="" name="surgeon_name" maxlength="200" /> </div>
                    </div>
                </div> 
                <br/>
                <br/>
                <br/>
                <br/>
                <h2>Actions</h2>
                <div class="line">
                    <div class="item"> <button class="downloader" id="show_settings">Setup</button> </div>
                    <div class="item"> <label class="downloader" id="uploader" for="upload" >Upload <input type="file" id="upload" value="Choose a file" accept=".jpg, .jpeg, .png"> </div>
                    <div class="item"> <a href="#" class="downloader" id="downloader">JPEG</a> </div>
                    <div class="item"> <a href="#" class="downloader" id="topdf">PDF</a> </div>
                </div>
            </div>
            <a href="" download="" id="save_image"></a>
        </div>
        <div id="output">
            
        </div>
    </div> 

    <div id="image_loader">
        <div id="image_crop_container"> <div id="upload-demo"></div> </div>
        <button id="save_crop" class="upload-result">SAVE</button>
        <button class="closer" onclick="$('#image_loader').hide();"></button>
    </div>
    <div id="overlay"></div>
    <script src="res/js/index.js?<?= rand(0, 9999); ?>"></script>
</body>
</html> 



