let img = null;
let imgTexto = new Image();

function ejecuta() {
    
    if(img == null) {
        alert("No se ha seleccionado ninguna imagen!!!");
        return;
    }else{
//        creaTexto();

        let canT = document.getElementById("canvas");
        let conT = canT.getContext("2d");
        let ITT = conT.getImageData(0,0,300,300);
        let pxT = ITT.data;

        let canI = document.getElementById("canvas2");
        let conI = canI.getContext("2d");
        let ITI = conI.getImageData(0,0,300,300);
        let pxI = ITI.data;

        let canR = document.getElementById("canvas3");
        let conR = canR.getContext("2d");
        let ITR = conR.getImageData(0,0,300,300);
        let pxR = ITR.data;
 
/*         console.log("pxT: "+pxT);

        console.log("pxI: "+pxI);

        console.log("pxR: "+pxR); */

        for(let i=0; i<pxT.length; i=i+4) {
            if(pxT[i+3]==0) {
                pxR[i+3] = 0;
            }else{
                pxR[i] = pxI[i];
                pxR[i+1] = pxI[i+1];
                pxR[i+2] = pxI[i+2];
                pxR[i+3] = pxI[i+3];
            }
            console.log("i="+i);
        } 
        console.log(pxR);

        conR.putImageData(ITR,0,0);
    }
    
        
    
}

function subeImagen() {
    let input = document.getElementById('upload');
    let can = document.getElementById("canvas2");
    let con = can.getContext("2d");
    img = input.files[0];
    let reader = new FileReader();

        reader.onload = function(e) {
            let imgi = new Image();
            imgi.src = e.target.result;
/*             foto.src = e.target.result; */
/*             foto.style.display = 'block'; */    
            imgi.onload = function() {
                can.width = 300;
                can.height = 300;
                con.drawImage(imgi,0,0,300,300);
            }   
        };
        reader.readAsDataURL(img);

}

function creaTexto() {
    let texto = document.getElementById("frase").value;
    let font = document.getElementById("fuente").value;
    let can = document.getElementById("canvas");
    let con = can.getContext("2d");
    let multiplicador = 300 / font;
    let columnas = 300 / texto.length*font;
    let reTexto = texto;

    con.clearRect(0, 0, can.width, can.height);
    con.font= font+"px Arial";
    con.fillStyle = "black";
    for(let i=0; i<multiplicador; i++) {
        let rt = ReTexto(reTexto)
        let tl = textoLargo(rt,columnas);
        con.fillText(tl,0,font*(i+1));
        reTexto = rt;   
    }
    var imgT = can.toDataURL("image/png");
    imgTexto.src = imgT;
}

function ReTexto(texto) {
    let reTexto = "";
    for(let k=0; k<texto.length-1; k++) {
        reTexto = reTexto+texto[k+1];
    }
    reTexto = reTexto+texto[0];
    console.log(reTexto);
    return reTexto;
}

function textoLargo(texto, columnas) {
    let textoLargo = texto;
    for(let i=0; i<columnas; i++) {
        textoLargo = textoLargo+texto;
    }
    return textoLargo
}
   