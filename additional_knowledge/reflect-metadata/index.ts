import "reflect-metadata"

// 把metadata都定义到这个全局变量
const globalMeta = Object.create(null);

const propertyCollector = (target: Object,
  propertyKey: string | symbol, descriptor?: any) => {
    // 把property的名字都放进一个叫properties的array
    const properties = Reflect.getMetadata('properties', globalMeta);
    if (properties) {
      Reflect.defineMetadata('properties', [...properties, propertyKey], globalMeta);
    } else {
      Reflect.defineMetadata('properties', [propertyKey], globalMeta);
    }
}

const methodCollector = (target: Object,
  propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    // 把methods的名字都放进一个叫methods的array
    const methodss = Reflect.getMetadata('methods', globalMeta);
    if (methodss) {
      Reflect.defineMetadata('methods', [...methodss, propertyKey], globalMeta);
    } else {
      Reflect.defineMetadata('methods', [propertyKey], globalMeta);
    }
}

const classCollector = (constructor: Function) => {
  // 把class的名字存到globalMeta的className
  Reflect.defineMetadata('className', constructor.name, globalMeta);
}

@classCollector
class Car {
  @propertyCollector
  private speed = 0;
  @propertyCollector
  private brand = 'BMW';
  @propertyCollector
  private model = 'X6 2012';
  @methodCollector
  run() {
    this.speed = 100;
    console.log(`The car is running at 100km/h`)
  }
  @methodCollector
  stop() {
    this.speed = 0;
    console.log(`The car stopped`)
  }
}

const className = Reflect.getMetadata('className', globalMeta);
const properties = Reflect.getMetadata('properties', globalMeta);
const methods = Reflect.getMetadata('methods', globalMeta);

console.log(
`Class [${className}] has ${properties.length} properties: ${properties.join(', ')}\t
Class [${className}] has ${methods.length} methods: ${methods.join(', ')}`,
);

// 输出
// Class [Car] has 3 properties: speed, brand, model
// Class [Car] has 2 methods: run, stop
