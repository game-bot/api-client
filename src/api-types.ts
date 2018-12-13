export type GamePlayer = { id: string, gameId: string, identity: string, userId: string, status: string, createdAt: string } 

export type InputListGamePlayerQueryParams = { gameId: string, limit: number, status?: string, skip?: number } 

export const GamePlayerStringFields = 'id gameId identity userId status createdAt';

export const InputListGamePlayerQueryParamsStringFields = 'gameId limit status skip';