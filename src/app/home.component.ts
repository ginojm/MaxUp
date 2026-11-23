import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { finalize } from 'rxjs';
import { COURSE_IMAGES } from './course-images';
import { InquiryRequest, Module } from './module.model';
import { MaxUpApiService } from './maxup-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private readonly api = inject(MaxUpApiService);
  private readonly router = inject(Router);
  private readonly viewportScroller = inject(ViewportScroller);

  modules: Module[] = [];
  readonly courseImages = COURSE_IMAGES;
  readonly testimonials = [
    {
      name: 'David M.',
      audience: 'Père antillais d’un collégien',
      quote: 'Mon fils a repris confiance en maths. Les objectifs sont clairs, et il sait maintenant comment s’organiser pour avancer.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=720&h=900&q=80',
    },
    {
      name: 'Sophie M.',
      audience: 'Mère antillaise d’une lycéenne',
      quote: 'Ma fille ose davantage poser ses questions et aborde ses révisions avec plus de sérénité. Le suivi nous aide à garder le cap.',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=720&h=900&q=80',
    },
    {
      name: 'Yanis R.',
      audience: 'Étudiant métis',
      quote: 'On reprend les notions à mon rythme et je peux poser toutes mes questions. Je me sens mieux préparé pour les contrôles.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=720&h=900&q=80',
    },
    {
      name: 'Kévin L.',
      audience: 'Adulte noir en formation',
      quote: 'J’avais besoin d’un cadre pour me remettre à niveau. Le suivi m’aide à garder le cap et à progresser étape par étape.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=720&h=900&q=80',
    },
  ];
  loadingModules = true;
  modulesError = '';
  menuOpen = false;
  activeTestimonialIndex = 0;
  inquiry: InquiryRequest = { name: '', email: '', message: '', moduleSlug: '' };
  sendingInquiry = false;
  inquiryError = '';
  inquirySent = false;

  scrollToSection(fragment: string, event: MouseEvent): void {
    event.preventDefault();
    this.menuOpen = false;

    this.router.navigate([], { fragment }).then(navigated => {
      if (!navigated) {
        requestAnimationFrame(() => this.viewportScroller.scrollToAnchor(fragment));
      }
    });
  }

  showTestimonial(index: number): void {
    this.activeTestimonialIndex = (index + this.testimonials.length) % this.testimonials.length;
  }

  showPreviousTestimonial(): void {
    this.showTestimonial(this.activeTestimonialIndex - 1);
  }

  showNextTestimonial(): void {
    this.showTestimonial(this.activeTestimonialIndex + 1);
  }

  ngOnInit(): void {
    this.api.getModules()
      .pipe(finalize(() => this.loadingModules = false))
      .subscribe({
        next: modules => this.modules = modules,
        error: () => this.modulesError = 'Les formations ne sont pas disponibles pour le moment. Réessayez plus tard.',
      });
  }

  submitInquiry(): void {
    this.sendingInquiry = true;
    this.inquiryError = '';
    this.inquirySent = false;
    this.api.sendInquiry(this.inquiry)
      .pipe(finalize(() => this.sendingInquiry = false))
      .subscribe({
        next: () => {
          this.inquirySent = true;
          this.inquiry = { name: '', email: '', message: '', moduleSlug: '' };
        },
        error: () => this.inquiryError = 'Votre demande n’a pas pu être envoyée. Veuillez réessayer.',
      });
  }
}
