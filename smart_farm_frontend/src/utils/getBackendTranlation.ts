
export function getBackendTranslation(value: string, languageCode: string) {
    const split = value.split(';');
    if (languageCode === 'de' && split.length > 1) {
        return split[1];
    }
    // default return EN
    return split[0];
}