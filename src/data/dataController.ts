import data from "./data.json"

export interface ISLiderElement {
    year: string,
    text: string
}

export function getBlockByIndex(index: number) {
    return Object.values(data)[index]
}

export function getElementsByIndex(index: number) {
    const block = getBlockByIndex(index)
    return block.elements
}

export function getBlocksLength() {
    return Object.keys(data).length
}

export function getAllBlocks() {
    return Object.values(data)
}
