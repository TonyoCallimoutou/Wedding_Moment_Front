export class DeepCopy {
  static ofList(source : any) : any {
    return JSON.parse(JSON.stringify(source));
  }

  static ofMap<K, V>(source: Map<K, V>): Map<K, V> {
    const target: Map<K, V> = new Map();

    source.forEach((value, key) => {
      target.set(this.ofList(key), this.ofList(value));
    });

    return target;
  }
}
