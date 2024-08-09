import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AnimatedHeader() {
  useEffect(() => {
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

  return (
    <div className="section">
      <div className="section bg1">
        <h1 className="revealUp">Animation For the win </h1>
      </div>
      <div className="section bg1">
        <h1 className="revealUp">Animation</h1>
      </div>
      <div className="spacer"></div>
    </div>
  );
}

export default AnimatedHeader;
