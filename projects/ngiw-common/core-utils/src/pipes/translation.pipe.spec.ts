import { TestBed } from '@angular/core/testing';
import { TranslationPipe } from './translation.pipe';

describe('TranslationPipe', () => {
  it('create an instance', () => {
    const pipe = TestBed.inject(TranslationPipe);
    expect(pipe).toBeTruthy();
  });
});
