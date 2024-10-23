
enum layout{
    'normal', 'split', 'flip', 'double-faced', 'token', 'plane', 'scheme', 'phenomenon', 'leveler', 'vanguard', 'aftermath'
}

enum rarity{
    'Common', 'Uncommon', 'Rare', 'Mythic Rare', 'Special', 'Basic Land'
}

type rules = {
    date: string,
    text: string
}

type language = {
    name: string,
    language: string,
    multiverseid: number,
}

export type reponse = {
    card?: card,
    cards?: card[]
}

export type card = {
    name: string, 
    layout: layout,
    cmc: number,
    colors: string[],
    type: string,
    supertypes?: string[],
    types: string[],
    subtypes: string[],
    rarity: rarity,
    set: string,
    setName: string,
    text: string,
    flavor: string,
    artist: string,
    number: string,
    power: string,
    toughness: string,
    loyalty?: string,
    language: string,
    gameFormat: string,
    legality: string[],
    multiverseid: number,
    rulings: rules[],
    foreignNames: language[],
    printings: string[],
    originalText: string,
    originalType: string,
    id: string,
    colorIdentity: string[],
    imageUrl: string,
}
