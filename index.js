let img = null;
let imgTexto = new Image();
let altoFoto = 300;
let anchoFoto = 300;


function ejecuta() {
    
    if(img == null) {
        alert("No se ha seleccionado ninguna imagen!!!");
        return;
    }else{
        creaTexto();

        let canT = document.getElementById("canvas");
        let conT = canT.getContext("2d");
        let ITT = conT.getImageData(0,0,altoFoto,anchoFoto);
        let pxT = ITT.data;

        let canI = document.getElementById("canvas2");
        let conI = canI.getContext("2d");
        let ITI = conI.getImageData(0,0,altoFoto,anchoFoto);
        let pxI = ITI.data;

        let canR = document.getElementById("canvas3");
        let conR = canR.getContext("2d");
        let ITR = conR.getImageData(0,0,altoFoto,anchoFoto);
        let pxR = ITR.data;
 
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

        let button = document.getElementById("descarga");
        button.removeAttribute("hidden");
    }
}

function subeImagen() {
    let input = document.getElementById('upload');
    let can = document.getElementById("canvas2");
    let can2 = document.getElementById("canvas");
    let can3 = document.getElementById("canvas3");
    let con = can.getContext("2d");
    img = input.files[0];
    let reader = new FileReader();
        reader.onload = function(e) {
            let imgi = new Image();
            imgi.src = e.target.result;
            imgi.onload = function() {
                altoFoto = imgi.height;
                anchoFoto = imgi.width
                can.width = anchoFoto;
                can.height = altoFoto;
                can2.width = anchoFoto;
                can2.height = altoFoto;
                can3.width = anchoFoto;
                can3.height = altoFoto;
                con.drawImage(imgi,0,0,anchoFoto,altoFoto);
            }   
        };
    reader.readAsDataURL(img);
}

function creaTexto() {
    let texto = document.getElementById("frase").value;
    let font = document.getElementById("fuente").value;
    let fonts = document.getElementById("fonts").value;
    let can = document.getElementById("canvas");
    let con = can.getContext("2d");
    let multiplicador = altoFoto / font;
    let columnas = anchoFoto / texto.length*font;
    let reTexto = texto;

    con.clearRect(0, 0, can.width, can.height);
    con.font= font+"px "+fonts;
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

function descarga() {
    let button = document.getElementById("descarga");

    let image = document.getElementById("canvas3").toDataURL("image/png").replace("image/png", "image/octet-stream");
    document.location.href = image;
}
   