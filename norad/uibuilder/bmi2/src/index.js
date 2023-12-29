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
window.onload = function () {
    // Start up uibuilder - see the docs for the optional parameters
    uibuilder.start()
    let hasCodeRun = false;
    // console.log(hasCodeRun)

    // Listen for incoming messages from Node-RED
    uibuilder.onChange('msg', function (msg) {
        if (parseInt(msg.payload.h) > 0) {
            if (parseInt(msg.payload.age) == "0") {

            }
        }
        var net0 = '<img src="network/0.png" class="float-start mx-auto" style="height:20px;padding-top:5px;">'
        var net1 = '<img src="network/1.png" class="float-start mx-auto" style="height:20px;padding-top:5px;">'
        var net2 = '<img src="network/2.png" class="float-start mx-auto" style="height:20px;padding-top:5px;">'
        // console.info('[indexjs:uibuilder.onChange] msg received from Node-RED server:', msg)
        // const eMsg = document.getElementById('msg')
        // if (eMsg) eMsg.innerHTML = window.syntaxHighlight(msg.payload)
        // dump the msg as text to the "msg" html element
        // console.log(msg.payload)
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
        const pid = document.getElementById('floatingInput-3')
        const mob = document.getElementById('floatingInput-1')
        const uname = document.getElementById('floatingInput-2')
        const age = document.getElementById('floatingSelect-4')
        const gender = document.getElementById('floatingSelect-5')
        const network = document.getElementById('network')

        if (msg.payload.network == 0){
            if (network) network.innerHTML = net0
        } else if (msg.payload.network == 1) {
            if (network) network.innerHTML = net1
        } else if (msg.payload.network == 2) {
            if (network) network.innerHTML = net2
        }


        if (ip) ip.innerHTML = msg.payload.ip
        if (h) h.innerHTML = msg.payload.h + " cm"
        if (w) w.innerHTML = msg.payload.w + " Kg"
        if (bmi) bmi.innerHTML = msg.payload.bmi + " kg/m<sup>2</sup>"
        if (bmr) bmr.innerHTML = msg.payload.bmr + ""
        if (bfp) bfp.innerHTML = msg.payload.bfp + ""
        if (tbw) tbw.innerHTML = msg.payload.tbw
        if (lbm) lbm.innerHTML = msg.payload.lbm
        var dta = msg.payload.spo2.split(":")
        var bp = msg.payload.bp.split(":")
        if (dta) spo.innerHTML = dta[0] + " %"
        if (dta) pr.innerHTML = dta[1] + " /min"

        if (bp) sys.innerHTML = bp[0]
        if (bp) dia.innerHTML = bp[1]
        // percentColors: [[0.0, "#ffff00"], [0.399, "#ffff00"], [0.40, "#00ff00"], [0.5556, "#00ff00"], [0.556, "#ff0000"], [1.0, "#ff0000"]]
        var bmiavg = (msg.payload.bmi / 45).toFixed(3)
        // console.log(bmiavg)
        if (bmiavg >= 0.1 && bmiavg <= 0.399) {
            document.getElementById('bmi-color').style.backgroundColor = "#ffff00";
            // document.getElementById('hold2').style.color = "white";
            document.getElementById('bmi-color').style.color = "#000";
        } else if (bmiavg >= 0.4 && bmiavg <= 0.556) {
            document.getElementById('bmi-color').style.backgroundColor = "#00ff00";
            // document.getElementById('hold2').style.color = "black";
            document.getElementById('bmi-color').style.color = "#000";
        } else if (bmiavg >= 0.557 && bmiavg <= 1.0) {
            document.getElementById('bmi-color').style.backgroundColor = "#ff0000";
            document.getElementById('bmi-color').style.color = "#fff";
        } else {
            document.getElementById('bmi-color').style.backgroundColor = "";
            document.getElementById('bmi-color').style.color = "";
        }

        if (msg.payload.hold == 1) {
            document.getElementById('hold2').style.backgroundColor = "red";
            // document.getElementById('hold2').style.color = "white";
        } else {
            document.getElementById('hold2').style.backgroundColor = "#5432EE";
            // document.getElementById('hold2').style.color = "black";
        }

        // Select all elements with class '.english' and '.hindi'

        if (parseInt(msg.payload.lang) === 1 && !hasCodeRun) {
            // English language is selected and the code hasn't run yet
            console.log("eng");
            if (uname) uname.value = msg.payload.uname
            if (age) age.value = msg.payload.age + " years";
            if (mob) mob.value = msg.payload.mobile
            if (pid) pid.value = msg.payload.pid
            if (gender) gender.value = (msg.payload.gender == 1) ? "Male" : "Female";
            // Show all English elements
            document.querySelectorAll('.english').forEach(element => {
                element.style.display = '';
            });

            // Hide all Hindi elements
            document.querySelectorAll('.hindi').forEach(element => {
                element.style.display = 'none';
            });

            // Define a closure that sets the flag to true after execution
            (function () {
                hasCodeRun = true;
            })();

            // Call fill_gen_eng() and agefill_eng() only the first time
            console.log("eng")

        } else if (!hasCodeRun) {
            console.log("hindi");

            // Call fill_gen_hin() and agefill_hin() only the first time

            if (uname) uname.value = msg.payload.uname
            if (age) age.value = msg.payload.age + " वर्ष";
            if (mob) mob.value = msg.payload.mobile
            if (pid) pid.value = msg.payload.pid
            if (gender) gender.value = (msg.payload.gender == 1) ? "पुरुष" : "महिला";
            // Hide all English elements
            document.querySelectorAll('.english').forEach(element => {
                element.style.display = 'none';
            });

            // Show all Hindi elements
            document.querySelectorAll('.hindi').forEach(element => {
                // console.log(element.style);
                element.style.display = 'block';
            });

            // Define a closure that sets the flag to true after execution
            (function () {
                hasCodeRun = true;
            })();
        }
        // console.log(hasCodeRun)
        if (msg.payload.bp_pos == 1) {
            // document.getElementById('bp').style.backgroundColor = "green";
            // document.getElementById('hold2').style.color = "white";
        } else {
            // document.getElementById('bp').style.backgroundColor = "#ED9A01";
            // document.getElementById('hold2').style.color = "black";
        }
    })
}
