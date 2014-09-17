var map;
$(document).ready(function(){

    map = new GMaps({
        div: '#map',
        lat: 6.444328,
        lng: 3.465677,
    });
    map.addMarker({
        lat: 6.444328,
        lng: 3.465677,
        title: 'Address',      
        infoWindow: {
            content: '<h5 class="title">Transit<span style="color:#d4653a !important;">Buddy</span></h5><p><span class="region">4 Akani Bashorun Street, off Road 14, Lekki Phase 1</span><br><span class="country-name">Nigeria</span></p>'
        }
        
    });

});


