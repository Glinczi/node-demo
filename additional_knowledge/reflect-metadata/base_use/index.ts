import 'reflect-metadata'

//  define a target
let self_target = {
	name: 'xiaozhi',
}

// add metadata to target or property
// 元数据值可以是任意 JavaScript 值
Reflect.defineMetadata('version', '1.0.0', self_target)
Reflect.defineMetadata('weather', 'sunshine', self_target)
Reflect.defineMetadata('age', 10, self_target, 'name')

// get metadata from target or property
console.log('version ->>>', Reflect.getMetadata('version', self_target))
console.log('age ->>>', Reflect.getMetadata('age', self_target, 'name'))
console.log('Missing metadata ->>>', Reflect.getMetadata('size', self_target)) // undefined

// is metadata in target or property
console.log('has version ->>>', Reflect.hasMetadata('version', self_target))
console.log('Missing metadata ->>>', Reflect.hasMetadata('size', self_target)) // undefined

// delete metadata from target or property
Reflect.deleteMetadata('version', self_target)
console.log('has version ->>>', Reflect.hasMetadata('version', self_target))

// getMetadataKeys from target or property
console.log('keys in target ->>>', Reflect.getMetadataKeys(self_target))

// tips: 默认情况下  getMetadata, hasMetadata, getMetadataKeys 会去检查target原型链
// 如果只想查询自身 需要使用 getOwnMetadata, hasOwnMetadata, getOwnMetadataKeys
const proto = { sex: 'boy' }
Reflect.setPrototypeOf(self_target, proto) // set prototype

console.log(self_target)
