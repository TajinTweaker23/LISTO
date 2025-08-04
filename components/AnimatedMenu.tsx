
import React, { useEffect, useRef } from 'react';
import { gsap, Power2, Power4 } from 'gsap';
import '../styles/AnimatedMenu.css';

const AnimatedMenu: React.FC = () => {
  const menuTriggerRef = useRef<HTMLSpanElement>(null);
  const closeTriggerRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const menuTopRef = useRef<HTMLElement>(null);
  const menuMiddleRef = useRef<HTMLElement>(null);
  const menuBottomRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const tlOpen = gsap.timeline({ paused: true });
    const tlClose = gsap.timeline({ paused: true });

    const openTriggerTop = menuTriggerRef.current?.querySelector('.menu-trigger-bar.top');
    const openTriggerMiddle = menuTriggerRef.current?.querySelector('.menu-trigger-bar.middle');
    const openTriggerBottom = menuTriggerRef.current?.querySelector('.menu-trigger-bar.bottom');
    const closeTriggerLeft = closeTriggerRef.current?.querySelector('.close-trigger-bar.left');
    const closeTriggerRight = closeTriggerRef.current?.querySelector('.close-trigger-bar.right');

    tlOpen.add("preOpen")
      .to(logoRef.current, 0.4, {
        scale: 0.8,
        opacity: 0,
        ease: Power2.easeOut
      }, "preOpen")
      .to(openTriggerTop!, 0.4, {
        x: "+=80px", y: "-=80px", delay: 0.1, ease: Power4.easeIn, onComplete: () => {
          gsap.set(closeTriggerRef.current, { zIndex: 25 });
        }
      }, "preOpen")
      .to(openTriggerMiddle!, 0.4, {
        x: "+=80px", y: "-=80px", ease: Power4.easeIn,
        onComplete: () => {
          gsap.set(menuTriggerRef.current, { visibility: 'hidden' });
        }
      }, "preOpen")
      .to(openTriggerBottom!, 0.4, {
        x: "+=80px", y: "-=80px", delay: 0.2, ease: Power4.easeIn
      }, "preOpen")
      .add("open", "-=0.4")
      .to(menuTopRef.current, 0.8, {
        y: "13%",
        ease: Power4.easeInOut
      }, "open")
      .to(menuMiddleRef.current, 0.8, {
        scaleY: 1,
        ease: Power4.easeInOut
      }, "open")
      .to(menuBottomRef.current, 0.8, {
        y: "-114%",
        ease: Power4.easeInOut
      }, "open")
      .fromTo(menuRef.current, 0.6, {
        y: 30, opacity: 0, visibility: 'hidden'
      }, {
        y: 0, opacity: 1, visibility: 'visible', ease: Power4.easeOut
      }, "-=0.2")
      .add("preClose", "-=0.8")
      .to(closeTriggerLeft!, 0.8, {
        x: "-=100px", y: "+=100px", ease: Power4.easeOut
      }, "preClose")
      .to(closeTriggerRight!, 0.8, {
        x: "+=100px", y: "+=100px", delay: 0.2, ease: Power4.easeOut
      }, "preClose");

    tlClose.add("close")
      .to(menuTopRef.current, 0.2, {
        backgroundColor: "#6295ca", ease: Power4.easeInOut, onComplete: () => {
          gsap.set(logoRef.current, { zIndex: 26 });
          gsap.set(closeTriggerRef.current, { zIndex: 5 });
          gsap.set(menuTriggerRef.current, { visibility: 'visible' });
        }
      }, "close")
      .to(menuMiddleRef.current, 0.2, {
        backgroundColor: "#6295ca", ease: Power4.easeInOut
      }, "close")
      .to(menuBottomRef.current, 0.2, {
        backgroundColor: "#6295ca", ease: Power4.easeInOut
      }, "close")
      .to(menuRef.current, 0.6, {
        y: 20, opacity: 0, ease: Power4.easeOut, onComplete: () => {
          gsap.set(menuRef.current, { visibility: 'hidden' });
        }
      }, "close")
      .to(logoRef.current, 0.8, {
        scale: 1, opacity: 1, ease: Power4.easeInOut
      }, "close", "+=0.2")
      .to(menuTopRef.current, 0.8, {
        y: "-113%",
        ease: Power4.easeInOut
      }, "close", "+=0.2")
      .to(menuMiddleRef.current, 0.8, {
        scaleY: 0,
        ease: Power4.easeInOut
      }, "close", "+=0.2")
      .to(menuBottomRef.current, 0.8, {
        y: "23%",
        ease: Power4.easeInOut,
        onComplete: () => {
            gsap.set([menuTopRef.current, menuMiddleRef.current, menuBottomRef.current], { backgroundColor: '#ffffff' });
        }
      }, "close", "+=0.2")
      .to(closeTriggerLeft!, 0.2, {
        x: "+=100px", y: "-=100px", ease: Power4.easeIn
      }, "close")
      .to(closeTriggerRight!, 0.2, {
        x: "-=100px", y: "-=100px", delay: 0.1, ease: Power4.easeIn
      }, "close")
      .to(openTriggerTop!, 1, {
        x: "-=80px", y: "+=80px", delay: 0.2, ease: Power4.easeOut
      }, "close")
      .to(openTriggerMiddle!, 1, {
        x: "-=80px", y: "+=80px", ease: Power4.easeOut
      }, "close")
      .to(openTriggerBottom!, 1, {
        x: "-=80px", y: "+=80px", delay: 0.1, ease: Power4.easeOut
      }, "close");

    const openClickHandler = () => {
      if (tlOpen.progress() < 1) {
        tlOpen.play();
      } else {
        tlOpen.restart();
      }
    };

    const closeClickHandler = () => {
      if (tlClose.progress() < 1) {
        tlClose.play();
      } else {
        tlClose.restart();
      }
    };

    menuTriggerRef.current?.addEventListener('click', openClickHandler);
    closeTriggerRef.current?.addEventListener('click', closeClickHandler);

    return () => {
      menuTriggerRef.current?.removeEventListener('click', openClickHandler);
      closeTriggerRef.current?.removeEventListener('click', closeClickHandler);
    };
  }, []);

  return (
    <div className="container">
      <span ref={menuTriggerRef} className="menu-trigger">
        <i className="menu-trigger-bar top"></i>
        <i className="menu-trigger-bar middle"></i>
        <i className="menu-trigger-bar bottom"></i>
      </span>
      <span ref={closeTriggerRef} className="close-trigger">
        <i className="close-trigger-bar left"></i>
        <i className="close-trigger-bar right"></i>
      </span>
      <span ref={logoRef} className="logo">
        <div>
            {/* Your Logo Placeholder */}
            <svg width="100" height="100" viewBox="0 0 100 100">
                <rect width="100" height="100" rx="15" fill="#fff" />
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="50" fill="#6295ca">L</text>
            </svg>
        </div>
      </span>
      <div className="inner-container">
        <i ref={menuTopRef} className="menu-bg top"></i>
        <i ref={menuMiddleRef} className="menu-bg middle"></i>
        <i ref={menuBottomRef} className="menu-bg bottom"></i>
        <div ref={menuContainerRef} className="menu-container">
          <ul ref={menuRef} className="menu">
            <li>
              <a href="#">Login</a>
            </li>
            <li>
              <a href="#">Create account</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnimatedMenu;
