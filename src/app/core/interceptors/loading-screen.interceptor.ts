import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingScreenInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner=inject(NgxSpinnerService)
  spinner.show()
  return next(req).pipe(finalize(()=>spinner.hide()));
};
