var initialSite = [];

var categorias = ["Finanzas Personales","Ahorra para tu retiro", "ABC Financiero", "Boletín Económico"];

var post1 = {
    img:"../assets/base/img/content/stock2/05.jpg",
    title:"Diferencia entre deducible y coaseguro",
    date:"20 Mayo 2016",
    tag:categorias[0],
    description:"La Revolución de Octubre, también conocida como Revolución bolchevique y para algunos grupos comunistas, particularmente entre los antirevisionistas, como Gran Revolución Socialista de Octubre,1 fue la segunda fase de la Revolución rusa de 1917, tras la Revolución de Febrero.2 La fecha 25 de octubre de 19173 corresponde al calendario juliano vigente en el Imperio ruso, después abolido por el nuevo Gobierno bolchevique. En el resto del mundo, bajo el calendario gregoriano, los sucesos se iniciaron el día 7 de noviembre de 1917. La insistencia del Gobierno provisional en continuar la guerra —muy impopular— impedía la aplicación de las profundas reformas que exigía la población.4 La ausencia de estas hizo que el programa bolchevique, reflejado en sus consignas de «Paz, pan y tierra» y «Todo el poder para los sóviets» (consejos), ganase partidarios rápidamente en el otoño de 1917.4 La crisis económica, que se había agravado desde el verano, la amenaza del frente para los soldados de la capital, la desilusión con la falta de reformas gubernamentales y el respaldo al Gobierno provisional de la mayoría de los partidos favoreció a los bolcheviques, que desencadenaron una intensa campaña de propaganda en la capital, por entonces Petrogrado.4 Entre las clases más desfavorecidas de la urbe, el rechazo a los sacrificios para continuar la guerra y a seguir en Gobiernos de coalición con los kadetes después del golpe de Kornílov era general.4",
    author:"Emilio"
};

document.getElementById("post1Img").src=post1.img;
document.getElementById("post1Title").innerHTML=post1.title;
document.getElementById("post1Author").innerHTML=post1.author;
document.getElementById("post1Date").innerHTML=post1.date;
document.getElementById("post1Description").innerHTML=post1.description;
document.getElementById("post1Tag").innerHTML=post1.tag;







/*
link a blogpost
imagen
link a autor
#comentarios
Fecha de publicación
Tags
Descripción






document.getElementById("imageid").src="../template/save.png";

<div class="col-md-6">
    <div class="c-content-blog-post-card-1 c-option-2 c-bordered">
        <div class="c-media c-content-overlay">
            <div class="c-overlay-wrapper">
                <div class="c-overlay-content">
                    <a href="#">
                        <i class="icon-link"></i>
                    </a>
                    <a href="../assets/base/img/content/stock2/04.jpg" data-lightbox="fancybox" data-fancybox-group="gallery">
                        <i class="icon-magnifier"></i>
                    </a>
                </div>
            </div>
            <img class="c-overlay-object img-responsive" src="../assets/base/img/content/stock2/04.jpg" alt=""> </div>
        <div class="c-body">
            <div class="c-title c-font-bold c-font-uppercase">
                <a href="#">Web & Mobile Development</a>
            </div>
            <div class="c-author"> By
                <a href="#">
                    <span class="c-font-uppercase">Nick Strong</span>
                </a> on
                <span class="c-font-uppercase">20 May 2015, 10:30AM</span>
            </div>
            <div class="c-panel">
                <ul class="c-tags c-theme-ul-bg">
                    <li>ux</li>
                    <li>web</li>
                    <li>events</li>
                </ul>
                <div class="c-comments">
                    <a href="#">
                        <i class="icon-speech"></i> 30 comments</a>
                </div>
            </div>
            <p> Lorem ipsum dolor sit amet, dolor adipisicing dolor sit amet elit atis unde omnis iste natus error sit dolor. Nulla nemo ad sapiente officia amet. Sed ut perspiciatis unde omnis iste natus error sit. </p>
        </div>
    </div>
    <div class="c-content-blog-post-card-1 c-option-2 c-bordered">
        <div class="c-media c-content-overlay">
            <div class="c-overlay-wrapper">
                <div class="c-overlay-content">
                    <a href="#">
                        <i class="icon-link"></i>
                    </a>
                    <a href="../assets/base/img/content/stock2/06.jpg" data-lightbox="fancybox" data-fancybox-group="gallery">
                        <i class="icon-magnifier"></i>
                    </a>
                </div>
            </div>
            <img class="c-overlay-object img-responsive" src="../assets/base/img/content/stock2/06.jpg" alt=""> </div>
        <div class="c-body">
            <div class="c-title c-font-bold c-font-uppercase">
                <a href="#">Efficient Coding</a>
            </div>
            <div class="c-author"> By
                <a href="#">
                    <span class="c-font-uppercase">Greg Idra</span>
                </a> on
                <span class="c-font-uppercase">23 May 2015, 10:30AM</span>
            </div>
            <div class="c-panel">
                <ul class="c-tags c-theme-ul-bg">
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>PHP</li>
                </ul>
                <div class="c-comments">
                    <a href="#">
                        <i class="icon-speech"></i> 14 comments</a>
                </div>
            </div>
            <p> Lorem ipsum dolor sit amet, dolor adipisicing dolor sit amet dolor sit amet elit. Nulla nemo ad sapiente officia amet ipsum dolor sit amet. </p>
        </div>
    </div>
    <div class="c-content-blog-post-card-1 c-option-2 c-bordered">
        <div class="c-media">
            <iframe src="https://player.vimeo.com/video/105329112" width="100%" height="300" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
        </div>
        <div class="c-body">
            <div class="c-title c-font-bold c-font-uppercase">
                <a href="#">Modern Web Trends</a>
            </div>
            <div class="c-author"> By
                <a href="#">
                    <span class="c-font-uppercase">Tracy Trendy</span>
                </a> on
                <span class="c-font-uppercase">25 May 2015, 10:30AM</span>
            </div>
            <div class="c-panel">
                <ul class="c-tags c-theme-ul-bg">
                    <li>Design</li>
                    <li>web</li>
                    <li>trends</li>
                </ul>
                <div class="c-comments">
                    <a href="#">
                        <i class="icon-speech"></i> 36 comments</a>
                </div>
            </div>
            <p> Lorem ipsum dolor sit amet, dolor adipisicing dolor sit amet dolor sit amet elit. Nulla nemo ad sapiente officia amet ipsum dolor sit amet. </p>
        </div>
    </div>
</div>
<div class="col-md-6">
    <div class="c-content-blog-post-card-1 c-option-2 c-bordered">
        <div class="c-media c-content-overlay">
            <div class="c-overlay-wrapper">
                <div class="c-overlay-content">
                    <a href="#">
                        <i class="icon-link"></i>
                    </a>
                    <a href="../assets/base/img/content/stock2/2.jpg" data-lightbox="fancybox" data-fancybox-group="gallery">
                        <i class="icon-magnifier"></i>
                    </a>
                </div>
            </div>
            <img class="c-overlay-object img-responsive" src="../assets/base/img/content/stock2/2.jpg" alt=""> </div>
        <div class="c-body">
            <div class="c-title c-font-bold c-font-uppercase">
                <a href="#">Code optimization</a>
            </div>
            <div class="c-author"> By
                <a href="#">
                    <span class="c-font-uppercase">Paul Roger</span>
                </a> on
                <span class="c-font-uppercase">26 May 2015, 10:30AM</span>
            </div>
            <div class="c-panel">
                <ul class="c-tags c-theme-ul-bg">
                    <li>code</li>
                    <li>clean</li>
                    <li>HTML</li>
                </ul>
                <div class="c-comments">
                    <a href="#">
                        <i class="icon-speech"></i> 17 comments</a>
                </div>
            </div>
            <p> Lorem ipsum dolor sit amet, dolor adipisicing dolor sit amet elit. Nulla nemo ad sapiente officia amet. </p>
        </div>
    </div>
    <div class="c-content-blog-post-card-1 c-option-2 c-bordered">
        <div class="c-media c-content-overlay">
            <div class="c-overlay-wrapper">
                <div class="c-overlay-content">
                    <a href="#">
                        <i class="icon-link"></i>
                    </a>
                    <a href="../assets/base/img/content/stock2/03.jpg" data-lightbox="fancybox" data-fancybox-group="gallery">
                        <i class="icon-magnifier"></i>
                    </a>
                </div>
            </div>
            <img class="c-overlay-object img-responsive" src="../assets/base/img/content/stock2/03.jpg" alt=""> </div>
        <div class="c-body">
            <div class="c-title c-font-bold c-font-uppercase">
                <a href="#">Device Optimization</a>
            </div>
            <div class="c-author"> By
                <a href="#">
                    <span class="c-font-uppercase">Tim Book</span>
                </a> on
                <span class="c-font-uppercase">28 May 2015, 10:30AM</span>
            </div>
            <div class="c-panel">
                <ul class="c-tags c-theme-ul-bg">
                    <li>iOS</li>
                    <li>Android</li>
                    <li>Web</li>
                </ul>
                <div class="c-comments">
                    <a href="#">
                        <i class="icon-speech"></i> 38 comments</a>
                </div>
            </div>
            <p> Lorem ipsum atis unde omnis iste natus error sit dolor dolor sit amet, atis unde omnis iste natus error sit dolor dolor adipisicing dolor sit amet elit. Nulla nemo ad sapiente officia amet. </p>
        </div>
    </div>
    <div class="c-content-blog-post-card-1 c-option-2 c-bordered">
        <div class="c-media c-content-overlay">
            <div class="c-overlay-wrapper">
                <div class="c-overlay-content">
                    <a href="#">
                        <i class="icon-link"></i>
                    </a>
                    <a href="../assets/base/img/content/stock2/01.jpg" data-lightbox="fancybox" data-fancybox-group="gallery">
                        <i class="icon-magnifier"></i>
                    </a>
                </div>
            </div>
            <img class="c-overlay-object img-responsive" src="../assets/base/img/content/stock2/01.jpg" alt=""> </div>
        <div class="c-body">
            <div class="c-title c-font-bold c-font-uppercase">
                <a href="#">Customer Satisfaction</a>
            </div>
            <div class="c-author"> By
                <a href="#">
                    <span class="c-font-uppercase">Sara Conner</span>
                </a> on
                <span class="c-font-uppercase">29 May 2015, 10:30AM</span>
            </div>
            <div class="c-panel">
                <ul class="c-tags c-theme-ul-bg">
                    <li>Guide</li>
                    <li>live</li>
                    <li>events</li>
                </ul>
                <div class="c-comments">
                    <a href="#">
                        <i class="icon-speech"></i> 9 comments</a>
                </div>
            </div>
            <p> Lorem ipsum dolor sit amet, Sed ut perspiciatis unde omnis iste natus error sit dolor adipisicing dolor sit amet elit. Nulla nemo ad sapiente officia amet ipsum dolor sit amet ipsum dolor sit amet perspiciatis
                unde omnis iste natus error sit dolo. </p>
        </div>
    </div>
</div>
*/