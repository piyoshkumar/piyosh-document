// @ts-nocheck

/** Minimalist code for uibuilder and Node-RED */
'use strict'

// return formatted HTML version of JSON object
window.syntaxHighlight = function (json) {
    json = JSON.stringify(json, undefined, 4)
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number'
        if ((/^"/).test(match)) {
            if ((/:$/).test(match)) {
                cls = 'key'
            } else {
                cls = 'string'
            }
        } else if ((/true|false/).test(match)) {
            cls = 'boolean'
        } else if ((/null/).test(match)) {
            cls = 'null'
        }
        return '<span class="' + cls + '">' + match + '</span>'
    })
    return json
} // --- End of syntaxHighlight --- //

// Send a message back to Node-RED
window.fnSendToNR = function fnSendToNR(payload) {
    uibuilder.send({
        'topic': 'msg-from-uibuilder-front-end',
        'payload': payload,
    })
}



// run this function when the document is loaded
window.onload = function() {
    // Start up uibuilder - see the docs for the optional parameters
    uibuilder.start()

    // Listen for incoming messages from Node-RED
    uibuilder.onChange('msg', function(msg) {
        if (parseInt(msg.payload.h) > 0 ){
            if(parseInt(msg.payload.age) == "0"){
              
            }
        }
        // console.info('[indexjs:uibuilder.onChange] msg received from Node-RED server:', msg)
        // const eMsg = document.getElementById('msg')
        // if (eMsg) eMsg.innerHTML = window.syntaxHighlight(msg.payload)
        // dump the msg as text to the "msg" html element
        const ip = document.getElementById('ips')
        const h = document.getElementById('h')
        const w = document.getElementById('w')
        const bmi = document.getElementById('bmi')
        const bmr = document.getElementById('bmr')
        const bfp = document.getElementById('bfp')
        const tbw = document.getElementById('tbw')
        const lbm = document.getElementById('lbm')
        const spo = document.getElementById('spo2')
        const pr = document.getElementById('pr')
        const sys = document.getElementById('sys') 
        const dia = document.getElementById('dia')
        const pid = document.getElementById('pidval2')
        const mob = document.getElementById('mobile2')
        const mob2 = document.getElementById('mobile')
        const age = document.getElementById('age')
        if(age) age.innerHTML = msg.payload.age
        if (mob) mob.innerHTML = msg.payload.mobile
        if (mob2) mob2.innerHTML = msg.payload.mobile
        if(pid) pid.innerHTML = msg.payload.pid
        if (ip) ip.innerHTML = msg.payload.ip
        if (h) h.innerHTML = msg.payload.h+" cm"
        if (w) w.innerHTML = msg.payload.w+" Kg"
        if (bmi) bmi.innerHTML = msg.payload.bmi
        if (bmr) bmr.innerHTML = msg.payload.bmr+ ""
        if (bfp) bfp.innerHTML = msg.payload.bfp+ ""
        if (tbw) tbw.innerHTML = msg.payload.tbw
        if (lbm) lbm.innerHTML = msg.payload.lbm
        var dta = msg.payload.spo2.split(":")
        var bp = msg.payload.bp.split(":")
        if (dta) spo.innerHTML = dta[0]
        if (dta) pr.innerHTML = dta[1]

        if (bp) sys.innerHTML = bp[0]
        if (bp) dia.innerHTML = bp[1]
        if (msg.payload.hold == 1){
            document.getElementById('hold2').style.backgroundColor = "red";
            document.getElementById('hold2').style.color = "white";
           }else{
            document.getElementById('hold2').style.backgroundColor = "#ED9A01";
            document.getElementById('hold2').style.color = "black";
         }

        if (msg.payload.spo2_pos == 1) {
            // document.getElementById('spo2').style.backgroundColor = "green";
            // document.getElementById('hold2').style.color = "white";
        } else {
            // document.getElementById('spo2').style.backgroundColor = "#ED9A01";
            // document.getElementById('hold2').style.color = "black";
        }
        if (msg.payload.bp_pos == 1) {
            // document.getElementById('bp').style.backgroundColor = "green";
            // document.getElementById('hold2').style.color = "white";
        } else {
            // document.getElementById('bp').style.backgroundColor = "#ED9A01";
            // document.getElementById('hold2').style.color = "black";
        }
    })
}
