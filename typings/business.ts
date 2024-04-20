import { Request, Response, NextFunction } from 'express';
import { ExpressResponseInterface } from './helpers'; // Assuming you have a file with ExpressResponseInterface defined

export abstract class BusinessControllerInterface {
  
  public static createBusiness: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => ExpressResponseInterface;

}
