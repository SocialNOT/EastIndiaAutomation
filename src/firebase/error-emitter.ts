'use client';

type Listener<T> = (event: T) => void;

class EventEmitter<T extends Record<string, unknown>> {
  private listeners: { [K in keyof T]?: Listener<T[K]>[] } = {};

  on<K extends keyof T>(eventName: K, listener: Listener<T[K]>): void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName]!.push(listener);
  }

  off<K extends keyof T>(eventName: K, listener: Listener<T[K]>): void {
    if (!this.listeners[eventName]) {
      return;
    }
    this.listeners[eventName] = this.listeners[eventName]!.filter(
      (l) => l !== listener
    );
  }

  emit<K extends keyof T>(eventName: K, event: T[K]): void {
    if (!this.listeners[eventName]) {
      return;
    }
    this.listeners[eventName]!.forEach((listener) => listener(event));
  }
}

interface AppEvents {
    'permission-error': Error;
}

export const errorEmitter = new EventEmitter<AppEvents>();
