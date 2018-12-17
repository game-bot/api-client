export type GamePlayer = { id: string, gameId: string, identity: string, userId?: string, status: string, createdAt: string } 

export type InputListGamePlayerQueryParams = { gameId: string, limit: number, status?: string, skip?: number } 

export type InputLatestGameJobLogQueryParams = { limit: number, gameId?: string, playerId?: string, skip?: number } 

export type InputGameJobLog = { gameId: string, playerId: string, jobId: string, status: string, error?: InputGameJobLogError, resources?: any, startAt: string, endAt: string, createdAt?: string } 

export type InputGameJobLogError = { code: string, message: string, taskId?: string } 

export type GameJobLog = { id: string, gameId: string, playerId: string, jobId: string, status: string, error?: GameJobLogError, resources?: any, startAt: string, endAt: string, executionTime?: number, createdAt: string } 

export type GameJobLogError = { code: string, message: string, taskId?: string } 

export type InputCreateGamePlayerParams = { gameId: string, identity: string } 

export const GamePlayerStringFields = 'id gameId identity userId status createdAt';

export const InputListGamePlayerQueryParamsStringFields = 'gameId limit status skip';

export const InputLatestGameJobLogQueryParamsStringFields = 'limit gameId playerId skip';

export const InputGameJobLogStringFields = 'gameId playerId jobId status error { code message taskId } resources startAt endAt createdAt';

export const InputGameJobLogErrorStringFields = 'code message taskId';

export const GameJobLogStringFields = 'id gameId playerId jobId status error { code message taskId } resources startAt endAt executionTime createdAt';

export const GameJobLogErrorStringFields = 'code message taskId';

export const InputCreateGamePlayerParamsStringFields = 'gameId identity';