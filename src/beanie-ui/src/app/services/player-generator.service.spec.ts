import { TestBed } from '@angular/core/testing';
import { Player } from '../models/player.model';

import { PlayerGeneratorService } from './player-generator.service';

describe('PlayerGeneratorService', () => {
  let service: PlayerGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should have an array of 13 items', () => {
    let player: Player = service.Build("player1");
    expect(player.scores.length).toEqual(13);
  });

  it('should have initialized array of player scores', () => {
    let player: Player = service.Build("player1");
    expect(player.scores.length).toEqual(13);

    player.scores.forEach(score => {
      expect(score.penalty).toBeFalse();
      expect(score.points).toEqual(0);
      expect(score.saved).toBeFalse();
    });
  });
});
