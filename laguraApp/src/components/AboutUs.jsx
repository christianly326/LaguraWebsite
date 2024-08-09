import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDown } from "@fortawesome/free-solid-svg-icons";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from 'react';
import  owners from '../images/owners.png';

function AboutUs(){

    useEffect(() => {
        // Code Referenced from "https://wpdean.com/css-text-animation/" - Up And Down we Go!
        gsap.utils.toArray(".revealUp").forEach(function(elem) {
            ScrollTrigger.create({
              trigger: elem,
              start: "top 80%",
              end: "bottom 20%",
              onEnter: () => gsap.fromTo(elem, { y: 100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "back", duration: 1.25 }),
              onLeave: () => gsap.to(elem, { autoAlpha: 0 }),
              onEnterBack: () => gsap.fromTo(elem, { y: -100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "back", duration: 1.25 }),
              onLeaveBack: () => gsap.to(elem, { autoAlpha: 0 })
            });
          });
          // Clean up function
          return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
          };
    }, []);
    
    return(
        <div className="aboutUs">
            <h1 className="title revealUp"/>
            <p className="revealUp">Aenean pharetra nec lectus eget gravida

Etiam hendrerit nisi id facilisis imperdiet. Nulla congue viverra nulla, sed fringilla eros interdum sit amet. Quisque non tincidunt massa. Nam quam turpis, fringilla ut augue et, convallis feugiat eros. Quisque gravida at nibh ut ullamcorper. Sed faucibus, nisl non posuere elementum, purus mauris ultrices tellus, vel rutrum sem tortor ac ipsum. Sed purus erat, euismod ut lacus vel, tincidunt dignissim ipsum. Integer eget libero lorem. Morbi blandit, dolor at bibendum ullamcorper, mauris leo commodo lorem, nec consectetur eros libero.
<br></br><br></br>
Aenean pharetra nec lectus 
<br></br><br></br>
Nulla fermentum vitae ipsum elementum fringilla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam ut imperdiet eros, a rutrum nibh. Proin posuere a nulla vitae semper. Nunc eros purus, tempus in tellus id, finibus vehicula tellus. Aliquam ac odio quis orci egestas porttitor eu vitae diam. Integer nec congue mi. Proin ac nunc ipsum. Proin.</p>
<img src={owners} />
        </div>
    )
}

export default AboutUs;