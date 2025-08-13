declare module 'howler' {
  export interface HowlOptions {
    src: string | string[];
    volume?: number;
    html5?: boolean;
    loop?: boolean;
    preload?: boolean | 'none' | 'metadata';
    autoplay?: boolean;
    mute?: boolean;
    sprite?: { [key: string]: [number, number] };
    rate?: number;
    pool?: number;
    format?: string[];
    xhr?: {
      method?: string;
      headers?: { [key: string]: string };
      withCredentials?: boolean;
    };
    onload?: () => void;
    onloaderror?: (id?: number, error?: any) => void;
    onplayerror?: (id?: number, error?: any) => void;
    onplay?: (id?: number) => void;
    onend?: (id?: number) => void;
    onpause?: (id?: number) => void;
    onstop?: (id?: number) => void;
    onmute?: (id?: number) => void;
    onvolume?: (id?: number) => void;
    onrate?: (id?: number) => void;
    onseek?: (id?: number) => void;
    onfade?: (id?: number) => void;
    onunlock?: () => void;
  }

  export class Howl {
    constructor(options: HowlOptions);
    play(id?: number): number;
    pause(id?: number): Howl;
    stop(id?: number): Howl;
    mute(muted?: boolean, id?: number): Howl | boolean;
    volume(vol?: number, id?: number): Howl | number;
    fade(from: number, to: number, duration: number, id?: number): Howl;
    rate(rate?: number, id?: number): Howl | number;
    seek(seek?: number, id?: number): Howl | number;
    loop(loop?: boolean, id?: number): Howl | boolean;
    state(): string;
    playing(id?: number): boolean;
    duration(id?: number): number;
    on(event: string, handler: Function, id?: number): Howl;
    off(event?: string, handler?: Function, id?: number): Howl;
    once(event: string, handler: Function, id?: number): Howl;
    load(): Howl;
    unload(): void;
  }

  export class Howler {
    static mute(muted?: boolean): boolean;
    static volume(vol?: number): number;
    static codecs(ext: string): boolean;
    static unload(): Howler;
    static usingWebAudio: boolean;
    static html5PoolSize: number;
    static noAudio: boolean;
    static autoUnlock: boolean;
    static autoSuspend: boolean;
    static ctx: AudioContext;
    static masterGain: GainNode;
  }
}
