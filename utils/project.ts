export interface Project {
    readonly name: string,
    readonly imageUrl: string,
    readonly desc: string,
    readonly tags: readonly string[],
    readonly link?: string,
}

export type ProjectList = { body: Project[] };
