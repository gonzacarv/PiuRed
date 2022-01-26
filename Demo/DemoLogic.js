$.ajaxSetup({
    async: false
});
let engine = null
let audioBuf = null
let chart_level = null
let speed = null
let songsJson = null
let stageIndex = null
let songIndex = null
let mp3path = null
let sscpath = null
let selsong = null

let leftKeyMap = {
    dl: 'Z',
    ul : 'Q',
    c : 'S',
    ur : 'E',
    dr: 'C'
}

let rightKeyMap = {
    dl: 'V',
    ul : 'R',
    c : 'G',
    ur : 'Y',
    dr: 'N'
}

//FOR IOS/MAC: https://paulbakaus.com/tutorials/html5/web-audio-on-ios/
// window.addEventListener('touchstart', function() {
//
//     let context = null ;
//     if('webkitAudioContext' in window) {
//         context = new webkitAudioContext();
//     } else {
//         context = new AudioContext();
//     }
//     // create empty buffer
//     var buffer = context.createBuffer(1, 1, 22050);
//     var source = context.createBufferSource();
//     source.buffer = buffer;
//
//     // connect to output (your speakers)
//     source.connect(context.destination);
//
//     // play the file
//     source.noteOn(0);
//
// }, false);

$(window).on('unload', function() {
    if (engine != null) {
        engine.song.closeBuff() ;
    }

});

function play(){

    let speed = parseInt(document.getElementById('speed').value) ;
    let playback = 1.0 ;
    let offset = parseFloat(document.getElementById('offset').value) ;
    let noteskin = document.getElementById('noteskin').value ;
    let touchpadSize = 1.2 - (document.getElementById('touchpadSize').value/10.0) ;
    let useTouchInput = document.getElementById("touchInput").checked ;

    let config = {
        'speed': speed,
        'playback': playback,
        'offset': offset,
        'noteskin': noteskin,
        'touchpadSize': touchpadSize,
        'useTouchInput': useTouchInput,
        'resources': resources,
        'sscpath': sscpath,
        'mp3path': mp3path,
        'resourcePath': 'piured-engine/',
        'leftKeyMap': leftKeyMap,
        'rightKeyMap': rightKeyMap,
        'chartLevel': chart_level
    } ;

    var w = window.open("/piured/localStage.html");
    w.config = config ;

}









$( "#noteskin" ).on("change", function(){
  localStorage.setItem("last_noteskin", $(this).val());
});

$( "#touchpadSize" ).on("change", function(){
    localStorage.setItem("touchpadSize", $(this).val());
});


$( "#speed" ).on("change", function(){
  localStorage.setItem("last_speed", $(this).val());
});

$( "#offset" ).on("change", function(){
  localStorage.setItem("last_offset", $(this).val());
});

$("#touchInput").on("change", function() {
        localStorage.setItem("inputTouch", this.checked ? "true": "false")
});



/* Load dynamic values and set thise defaults */

readSongList() ;

/* Set default selection for static values: Noteskin, Speed and Offset */

let inputTouch = localStorage.getItem("inputTouch") !== null ? JSON.parse(localStorage.getItem("inputTouch")) : false ;
$( "#touchInput" ).prop('checked', inputTouch) ;


let default_noteskin = localStorage.getItem("last_noteskin") !== null ? localStorage.getItem("last_noteskin") : "EXCEED2-OLD" ;
$( "#noteskin" ).val(default_noteskin) ;

let default_speed = localStorage.getItem("last_speed") !== null ? parseFloat(localStorage.getItem("last_speed")) : 3 ;
$( "#speed" ).val(default_speed) ;

let touchpadSize = localStorage.getItem("touchpadSize") !== null ? parseFloat(localStorage.getItem("touchpadSize")) : 2 ;
$( "#touchpadSize" ).val(touchpadSize) ;

let default_offset = localStorage.getItem("last_offset") !== null ? parseFloat(localStorage.getItem("last_offset")) : "0.0" ;
$( "#offset" ).val(default_offset) ;


if ( JSON.parse(localStorage.getItem("last_lpad")) !== null ) {
     leftKeyMap =JSON.parse(localStorage.getItem("last_lpad")) ;
}

if ( JSON.parse(localStorage.getItem("last_rpad")) !== null ) {
    rightKeyMap =JSON.parse(localStorage.getItem("last_rpad")) ;
}

function updateMappings() {
    $('#ldlmap').val(leftKeyMap['dl']) ;
    $('#lulmap').val(leftKeyMap['ul']) ;
    $('#lcmap').val(leftKeyMap['c']) ;
    $('#lurmap').val(leftKeyMap['ur']) ;
    $('#ldrmap').val(leftKeyMap['dr']) ;

    $('#rdlmap').val(rightKeyMap['dl']) ;
    $('#rulmap').val(rightKeyMap['ul']) ;
    $('#rcmap').val(rightKeyMap['c']) ;
    $('#rurmap').val(rightKeyMap['ur']) ;
    $('#rdrmap').val(rightKeyMap['dr']) ;
}

updateMappings() ;
