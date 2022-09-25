
//import PCRE from '@stephen-riley/RegExp2-wasm';
import * as crypto from 'crypto';


export function match(subject: string, pattern: string, switches: string): any[] {
    let re: RegExp;

    try {
        re = new RegExp(pattern, switches);
        const results: any = re.exec(subject);
        return [results];
    } catch (e) {
        throw e;
    }
}

function getMatches( target : string, rExp : RegExp, matches : Array<RegExpExecArray> = []) {
    const matchIfAny  = rExp.exec(target);
    if (matchIfAny) { matches.push(matchIfAny); getMatches(target, rExp, matches); }
    return matches;
}

export function matchAll(subject: string, pattern: string, switches: string): any[] | null {
    let re: RegExp;

    try {
        re = new RegExp(pattern, switches + 'g');
        const results: any = getMatches(subject, re);
        return results;
    } catch (e) {
        throw e;
    }
}

/* export function split(subject: string, pattern: string, switches: string): any[] {
    let re: RegExp;
    const id = generateRandomId();

    try {
        re = new RegExp(pattern, switches);
        const result: any = re.exec(subject, id);
        return result.split(id);
    } catch (e) {
        throw e;
     
    }
}
 */
export function replace(subject: string, pattern: string, switches: string, replacement: string): any {
    let re: any;

    try {
        const matches = match(subject, pattern, switches);
        re = new RegExp(pattern, switches);
        const result: string = re.substitute(subject, replacement);
        return { result, matches: matches };
    } catch (e) {
        throw e;
    } finally {
        if (re) {
            re.destroy();
        }
    }
}

export function replaceAll(subject: string, pattern: string, switches: string, replacement: string): any {
    let re: any;

    try {
        const matches = matchAll(subject, pattern, switches);
        re = new RegExp(pattern, switches);
        const result: string = re.substituteAll(subject, replacement);
        return { result, matches: matches };
    } catch (e) {
        throw e;
    } finally {
        if (re) {
            re.destroy();
        }
    }
}

function generateRandomId() {
    return `--${crypto.randomBytes(16).toString("hex")}--`;
}