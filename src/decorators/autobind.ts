export function Autobind(_: any, _2: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value;
  return {
    enumerable: false,
    configurable: true,
    get() {
      return originalMethod.bind(this)
    }
  } as PropertyDescriptor
}