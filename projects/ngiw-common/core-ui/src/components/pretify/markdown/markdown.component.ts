/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, input } from '@angular/core';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'ngiw-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css'],
})
export class MarkdownComponent {
  markdown = input(` **פעם ראשונה** : חח😂

  **פעם שניה**: עצוב 😢 למה ?`);

  interpolation = input<any>({});
  html!: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}
  OnInit() {
    this.renderMarkdown();
  }

  OnChanges(e: any) {
    if (e && e.markdown) {
      this.renderMarkdown();
    }
  }

  interpolateText = () => {
    let interploated = this.markdown();
    Object.keys(this.interpolation()).forEach((interploationKey) => {
      interploated = interploated.replace(
        `{{${interploationKey}}}`,
        this.interpolation()[interploationKey] as string,
      );
    });
    return interploated;
  };

  renderMarkdown = async () => {
    const finalText = this.interpolateText();
    if (finalText) {
      this.html = this.sanitizer.bypassSecurityTrustHtml(
        await this.getMarkdownAsHtml(finalText),
      );
    }
  };

  getMarkdownAsHtml = async (markdown: string) => {
    return await marked.parse(markdown);
  };
}
