import { Request, Response } from 'express';
import { Controller, Get, Put, Post, Delete } from '@overnightjs/core';
import { OK, BAD_REQUEST } from 'http-status-codes';
import { Logger } from '@overnightjs/logger';
import { BeanieService } from '../services/beanie.service';

@Controller('beanie')
export class BeanieController {

    private service: BeanieService = new BeanieService();

    @Post('players')
    private setPlayers(req: Request, res: Response) {
        Logger.Info(req.body);
        let result = this.service.SetPlayers(req.body);
        Logger.Info("Result: " + result);
        if (result)
        {
            res.status(OK).json({
                "Players": req.body
            });
        }
        else
        {
            res.status(BAD_REQUEST).json("ERROR: Unable to assign players.");
        }
    }

    @Get('players')
    private getPlayers(req: Request, res: Response) {

        let players = this.service.GetPlayers();
        
        Logger.Info(players);
        return res.status(OK).json(players);
    }

    @Delete('players')
    private clearPlayers(req: Request, res: Response) {
        this.service.ClearPlayers();
        res.status(OK).json("players deleted.");
    };
    
    @Post('round')
    private setRound(req: Request, res: Response) {
        if (!req.body || !req.body.activeIndex || !req.body.scores) {
            res.status(BAD_REQUEST);
        }
        console.log(this.service.SetRoundScores(req.body.activeIndex, req.body.scores));
        res.status(OK).json({ roundSet: req.body });
    };
    
    @Get('score')
    private getScore(req: Request, res: Response) {
        let scores = this.service.GetScores();
        res.status(OK).json(scores);
    };
    
    @Delete('score')
    private resetScore(req: Request, res: Response) {
        this.service.ResetScore();
        res.status(OK).json("scores reset.");
    };
}