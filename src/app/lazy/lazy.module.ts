import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyRoutingModule } from './lazy-routing.module';
import { GameComponent } from '../components/game/game.component';
import { HomeComponent } from '../components/home/home.component';

@NgModule({
  declarations: [GameComponent, HomeComponent],
  imports: [CommonModule, LazyRoutingModule],
})
export class LazyModule {}
