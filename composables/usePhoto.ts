export const usePhoto = () => {
    return {
        preview: useState<string | null>('preview', () => null),
    }
}