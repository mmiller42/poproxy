export function preserveOrder<T extends {}>(target: Partial<T>) {
  const ownKeys = new Set(Reflect.ownKeys(target));

  return new Proxy(target, {
    defineProperty: (target, key, descriptor) => {
      ownKeys.add(key);

      return Reflect.defineProperty(target, key, descriptor);
    },

    set: (target, key, value) => {
      ownKeys.add(key);

      return Reflect.set(target, key, value);
    },

    deleteProperty: (target, key) => {
      ownKeys.delete(key);

      return Reflect.deleteProperty(target, key);
    },

    ownKeys: () => {
      return Array.from(ownKeys);
    },
  });
}
