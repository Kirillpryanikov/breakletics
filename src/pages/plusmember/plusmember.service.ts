import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';

@Injectable()
export class PlusmemberService {
  constructor() {
  }

  testimonials(){
    return [
        {
          avatar: "../assets/imgs/avatar1.jpg",
          name : "Jennifer",
          date: "Jennifer aus Wien, 34",
          description: "Es ist einfach dank verschiedener Levels aber trotzdem intensiv und man sieht Resultate nach kurzer Zeit!"
        },
        {
          avatar: "../assets/imgs/avatar2.jpg",
          name : "Larissa",
          date: "aus Berlin, 24",
          description: "Die effektiven kurzen Trainings passen super zu meinem Tagesrythmus. Ich kann trainieren wann und wo ich will!"
        },
        {
          avatar: "../assets/imgs/avatar3.jpg",
          name : "Tobi",
          date: "aus München, 28",
          description: "Absolute Empfehlung – garantiert keine Tanzerfahrung nötig!"
        },
        {
          avatar: "../assets/imgs/avatar4.jpg",
          name : "Henk",
          date: "aus Essen, 17",
          description: "Mir gefallen besonders die vielen verschiedene Übungen und all die Variationen"
        },
        {
          avatar: "../assets/imgs/avatar5.jpg",
          name : "Luisa",
          date: "aus Höxter, 39",
          description: "Herausfordernde funktionelle Bewegungen zu cooler Musik!"
        }
    ];
  };

  benefits(language){
      if(language === 'de'){
            return [
                {
                    title: "Effektives funktionales Training",
                    description: "Erhalte einen athletischen Körper, der auch wirklich was kann!"
                },
                {
                    title: "ABWECHSLUNG OHNE ENDE",
                    description: "48 Workouts, 36 Exercises, 4 Warm Up, 4 Cool Downs!"
                },
                {
                    title: "FÜR ABSOLUT JEDE/N",
                    description: "für absolute Anfänger bis Fitness Freaks!"
                },
                {
                    title: "NIE MEHR LANGEWEILE BEIM TRAINING",
                    description: "Es werden regelmäßig neue Workouts und Features entwickelt!"
                },
                {
                    title: "MOTIVIERENDE NEUE MUSIK",
                    description: "Es gibt regelmäßig neue fette Power-Beats!"
                }
            ];
      } else {
          return [
              {
                  title: "EFFECTIVE FUNCTIONAL TRAINING",
                  description: "Get an athletic body which not only looks fantastic but which is also able to move!"
              },
              {
                  title: "ENDLESS VARIETY",
                  description: "48 Workouts, 36 Exercises, 4 Warm Ups, 4 Cool Downs!"
              },
              {
                  title: "ANYONE CAN DO IT",
                  description: "For absolute beginners to fitness freaks!"
              },
              {
                  title: "IT NEVER EVER GET’S BORING",
                  description: "Continuous updates with new workouts, exercises and even features!"
              },
              {
                  title: "NEW FRESH MUSIC",
                  description: "Train to new powerful beats!"
              }
          ];
      }
  }
}
