var mpw, error = null ;

function updateMPW() {
    mpw = null;
    startWork();
    mpw = new MPW( $('#userName')[0].value, $('#masterPassword')[0].value, $('#version')[0].value );
    mpw.key.then(
        function() {
            error = null;
            doneWork();
        },
        function(reason) {
            error = reason;
            mpw = null;
            doneWork();
        }
    );
}
function startWork() {
    update(true);
}
function doneWork() {
    update(false);
}
function update(working) {
    if(working) {
        $('#submit').val('确认中..');
    } else {
        $('#submit').val('确认身份');
        if (error == null) {
            $('#identity_info').text($('#userName')[0].value);
            if(skel.breakpoint("medium").active)
                $('.scrolly').trigger('click');
        } else {
            // $('#identity_info').text(error);
        }
    }
}
function updateSite() {
    if (!mpw) {
        return
    }

    mpw.generatePassword( $('#siteName')[0].value, Number.parseInt($('#siteCounter')[0].value), $('#siteType')[0].value )
       .then( function (sitePassword) {
           $('#sitePassword').text(sitePassword);
       }, function (reason) {
           error = reason;
           doneWork();
       });
}
function selectText(element) {
    var doc = document, range, selection;    

    if (doc.body.createTextRange) { //ms
        range = doc.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) { //all others
        selection = window.getSelection();        
        range = doc.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}


$(function() {

    $('#identity form').on('submit', function() {
        updateMPW();
        return false;
    });
    $('#site input, #site select').on('change input keyup', function() {
        updateSite();
    });
    $('#sitePassword').on('click', function() {
        selectText(this);
    });
});
