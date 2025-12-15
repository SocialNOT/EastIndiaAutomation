"use client";

import { useLayoutEffect, useRef, useCallback, MutableRefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type AnimationOptions = {
    stagger?: number;
    onEnter?: () => void;
    onLeaveBack?: () => void;
};

export const useScrollAnimations = (
    scope: MutableRefObject<HTMLElement | null>,
    options: AnimationOptions = {}
) => {
    const { stagger = 0.08, onEnter, onLeaveBack } = options;
    const elementsRef = useRef<(HTMLElement | null)[]>([]);

    const register = useCallback((el: HTMLElement | null) => {
        if (el && !elementsRef.current.includes(el)) {
            elementsRef.current.push(el);
        }
        return el;
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!scope.current) return;
            
            elementsRef.current.forEach((el, index) => {
                if (!el) return;

                gsap.set(el, { opacity: 0, y: 30 });
                
                ScrollTrigger.create({
                    trigger: el,
                    start: 'top 90%',
                    end: 'bottom 10%',
                    onEnter: () => {
                        gsap.to(el, {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: 'power3.out',
                            delay: index * stagger,
                        });
                        if (index === 0 && onEnter) onEnter();
                    },
                    onLeaveBack: () => {
                        gsap.to(el, {
                            opacity: 0,
                            y: 30,
                            duration: 0.5,
                            ease: 'power3.in',
                        });
                         if (index === 0 && onLeaveBack) onLeaveBack();
                    },
                    once: false
                });
            });

        }, scope);

        return () => {
            ctx.revert();
        };

    }, [register, scope, stagger, onEnter, onLeaveBack]);


    return { register };
};
