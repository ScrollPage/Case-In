
export type typeOfType = 'success' | 'warning' | 'error'

export const hide = () => ({ type: 'ALERT_HIDE' } as const);
export const show = (text: string, typeOf: typeOfType = 'success', image?: string) => ({ type: 'ALERT_SHOW', text, typeOf, image } as const);






