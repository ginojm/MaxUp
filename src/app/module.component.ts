import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { COURSE_IMAGES } from './course-images';
import { Module } from './module.model';
import { MaxUpApiService } from './maxup-api.service';

@Component({
  selector: 'app-module',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './module.component.html',
})
export class ModuleComponent implements OnInit {
  private readonly api = inject(MaxUpApiService);
  private readonly route = inject(ActivatedRoute);

  module: Module | null = null;
  readonly courseImages = COURSE_IMAGES;
  loading = true;
  error = '';
  menuOpen = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (!slug) {
        this.error = 'Formation introuvable.';
        this.loading = false;
        return;
      }

      this.loading = true;
      this.module = null;
      this.error = '';
      this.api.getModule(slug)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: module => this.module = module,
          error: () => {
            this.module = null;
            this.error = 'Cette formation est introuvable ou temporairement indisponible.';
          },
        });
    });
  }
}
