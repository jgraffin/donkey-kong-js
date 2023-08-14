import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements AfterViewInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ACTIVE = 'active';
  BUTTON = '.app-game-button';
  ITEMS = ['blue', 'red', 'yellow', 'green'];

  _ = this;
  listColors: number[] = [];

  status = {
    level: 1,
    result: false,
    selected: [] as any,
  };

  ngAfterViewInit(): void {
    this.listColors = [...this.listColors, this.randomize()];

    this.toggleClass();
  }

  toggleClass() {
    const els = this.el.nativeElement.querySelectorAll(this.BUTTON);

    const wait = (value: number) =>
      new Promise((resolve) => setTimeout(() => resolve(0), value));

    this.listColors.forEach(async (number, index) => {
      await wait(1000 * index);

      this.elements(els, number);
    });
  }

  elements(els: [], num: number) {
    els.forEach((id: HTMLElement) => {
      if (Number(id.getAttribute('id')) === num) {
        this._.renderer.addClass(id, this._.ACTIVE);
      }

      this.remove(els, this._);
    });
  }

  remove(els: [], __: any) {
    setTimeout(() => {
      els.forEach((id: HTMLElement) => __.renderer.removeClass(id, __.ACTIVE));
    }, 500);
  }

  onSelectColor(id: number) {
    this.status.selected = [...this.status.selected, id];

    while (this.status.selected.length !== this.listColors.length) return;

    this.checkValues();
  }

  checkValues() {
    const value = this.compare(this.listColors, this.status.selected);

    if (value) {
      this.status.result = true;
      this.status.selected = [];

      setTimeout(() => {
        this.status.level = this.status.level + 1;
        this.status.result = false;
        this.ngAfterViewInit();
      }, 1000);
    } else {
      console.log('err');
    }
  }

  compare(a: number[], b: number[]) {
    return a.toString() === b.toString();
  }

  randomize() {
    return Math.floor(Math.random() * this.ITEMS.length);
  }
}
