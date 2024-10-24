import { cardResponse } from "../types"
import { api } from "./api"

class Service{
    private apiRoute: string

    constructor( route: string ){
        this.apiRoute = `${api}/${route}`
    }

    private getTarget = async ( target: string ): Promise<cardResponse> => {
        const response = await fetch(`${this.apiRoute}/${target}`, {
            method: 'GET'
        })

        return (await response.json()) as Promise<cardResponse>
    }

    public getByName = async ( target : string ): Promise<cardResponse> => {
        const response = await fetch(`${this.apiRoute}?${new URLSearchParams({
            name: target
        })}`, {
            method: 'GET'
        })

        return (await response.json()) as Promise<cardResponse>
    }

    private getAll = async (): Promise<cardResponse> => {
        const response = await fetch(`${this.apiRoute}?${new URLSearchParams({
            random: "true",
            contains: "imageUrl"
        })}`, {
            method: 'GET',
        })

        return (await response.json()) as Promise<cardResponse>
    }

    public get = async ( target?: string ): Promise<cardResponse> => target ? this.getTarget( target ) : this.getAll()

    public search =  async ( search: string ): Promise<cardResponse> => {
        const response = await fetch(`${this.apiRoute}?${new URLSearchParams({
            name: search
        })}`)

        return (await response.json()) as Promise<cardResponse>
    } 
}

const CardService = new Service('cards')
export default CardService;
