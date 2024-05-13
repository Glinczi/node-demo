# React

## React 基础

### Hello_React

### 虚拟 DOM 创建的两种方式

1. 使用 `JSX` 创建虚拟 DOM
2. 使用 `JS` 创建虚拟 DOM

总结: `JSX` 创建虚拟 `DOM` 就是 `JS` 创建虚拟 `DOM` 的一种语法糖

### 虚拟 DOM 和真实 DOM

- 虚拟 DOM 就是一个对象
- 虚拟 DOM 相比于真实 DOM 属性值少很多,显得更轻巧

### JSX 的语法规则

1. 定义虚拟 DOM 的时候,不要写引号
2. 标签中混入 JS 表达式时要用{} (记住这里是表达式 不是代码块 代码片段)

一个表达式能产生一个值,可以放在需要放值的地方

3. 样式的类名指定不要使用 class,要用 className
4. 内联样式 要使用 style={{key:value}} 的形式去写 最外面一个{}代表这个是 js 里面的{}表示这是一个对象
5. 只有一个根标签
6. 对于单标签必须要闭合
7. 标签首字母

- 首字母是小写字母开头,则将标签转换成 html 中对应的标签名 如果不存在对应的标签名,则报错
- 首字母是大写字母开头,react 就去渲染对应的组件,组件未定义则报错

### JSX 小练习

实现动态渲染列表

> JSX 中的{}可以自动遍历数组,但是没有办法遍历对象

### React 定义组件的方式

1. 通过函数的方式创建组件
   > 注意:组件名必须大写,组件函数在使用的时候要写成标签的形式
2. 通过类的方式创建组件
   > 注意:必须通过 extends 关键字继承 React.Component 这个类
   > 组件内部必须有 render 函数

### 组件实例的三大属性

#### state

1. `state` 的作用

state 就类似 VUE 中的 data,用来定义一些变量控制页面的显示状态

2. 如何给渲染的标签添加点击事件?

React 自己重写了事件关键字 比如 onclick => onClick onblur => onBlur

3. 关于类中 this 指向问题

4. 如何修改 state 中的值?

不能直接通过读取对象属性的方法去修改 state 中的值,需要借助官方提供的内置 API setState()方法去修改,
方法的参数需要传递一个对象,将 state 中需要修改的值传递进去,不需要修改的值可以不传递,这种修改是一种
合并修改,不会覆盖原有的 state 对象

5. 简化 State 的写法

组件内部使用的变量可以不通过构造器函数 constructor 来创建 可以通过赋值运算直接追加到类里面

类中定义的函数,可以通过箭头函数的形式将函数中的 this 指向创造的 class 类

#### props

1. props 的作用和基本使用

作用: props 主要用于从组件外部传递值到组件内部
使用: 通过给标签添加属性和属性值的方式,可以将外部的定义的数据传递到组件内部
注意: props 是只读的,不要在内部修改

2. 如何批量导入 props 值

可以在组件标签上通过 {...}展开运算符来实现

3. 如何限制 props 的值

React 拆分出一个单独的 propTypes 的库,专门来限制 props 的值

类名.propTyps 可以限制 props 的类型以及是否是必传项
类名.defaultProps 可以设定 props 在未传下的默认值

```javascript
// 1. 在构造函数身上有一个属性propTypes设置props的限制规则
类名.propTypes = {
  // 顺序不能变  类型需要小写 string number func
  name: PropTypes.string.isRequired, // 对名字进行限制 必须是字符串 且必填
  age: PropTypes.number,
};
// 2. defaultProps用来设置默认值
类名.defaultProps = {
  age: 18, // 年龄默认值
  sex: '男',
};
```

4. props 的简写形式

上面两种写法都是给类添加了一个属性,可以将属性直接写在定义类的里面
(但是直接写是给类的实例对象添加属性,需要添加 static)

这里要区分给类添加属性和给类的实例对象添加属性的区别

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  spake() {
    console.log(`我的名字叫${this.name},年龄${this.age}`);
  }
  static id = 11;
}

// spake不能直接通过类名去调用,只能通过构造的实例对象去访问
Person.spake(); // undefined
// 如果给spake添加static属性的时候就可以直接通过类名访问
Person.spake();
Person.id; // 11
```

5. 类式组件构造器和 props

尽量不要在类式组件中使用 constructor

6. 函数式组件使用 props

旧版本中,函数式组件只能处理 props,是通过函数的形参接收,然后处理的,但是不能处理 state 和 refs
新版本中引入 hook 后可以处理(后续)

#### refs

1. ref 的作用和基本使用

作用: 通过给 DOM 元素身上绑定 ref 属性,可以为当前属性做标识,从而可以在组件实例身上拿到对应的数据
使用: 组件实例身上有一个 refs 属性,里面存放了做过标识的 DOM 元素

2. 使用回调函数的形式访问 ref

直接使用字符串形式创建 ref 的方式已经过时,现在主要通过在 ref 上使用回调函数的形式创建 ref

```javascript
class Demo extends React.Component {
  showData1 = () => {
    // 通过回调函数的形式将对应的节点挂载到组件实例身上
    const { input1 } = this;
    alert(input1.value);
  };
  render() {
    return (
      <div>
        <input
          ref={(elementNode) => {
            this.input1 = elementNode;
          }}
          type="text"
          placeholder="请输入内容"
        />
        <button onClick={this.showData1}>点击我出提示</button>
      </div>
    );
  }
}
```

3. 关于回调函数访问 ref 的执行次数的问题

如果 ref 回调函数是以内联函数的方式定义的,在更新过程中它会被执行两次，第一次传入参数 null,然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例,所以 React 清空旧的 ref 并且设置新的。通过将 ref 的回调函数定义成 class 的绑定函数的方式可以避免上述问题,但是大多数情况下它是无关紧要的。

4. createRef

React 自身上有一个 API -- createRef,用于访问 ref

```javascript
class Demo extends React.Component {
  showData1 = () => {
    let element = this.setInput.current;
    alert(element.value);
  };
  showData2 = () => {};
  // React 身上有一个API 用于创建 ref (目前最推荐)
  setInput = React.createRef();
  render() {
    return (
      <div>
        <input
          ref={this.setInput}
          type="text"
          placeholder="请输入内容"
        />
        <button onClick={this.showData1}>点击我出提示</button>
      </div>
    );
  }
}
```

### React 中的事件处理

1.形式类似 onXxxx（区别大小写）
a. react 自己封装的事件 -- 为了更好的兼容性
b. 事件一般都是依靠事件委托，绑定在最外层的元素身上 -- 为了高效 2.可以通过 event.target 拿到绑定事件元素的相关 DOM 属性 -- 这样是为了减少 ref 的使用
！具体通过 event.target 如何实现和 ref 相同效果的例子如下

```javascript
class Demo extends React.Component {
  showData2 = (event) => {
    // 事件回调函数自带的event参数
    alert(event.target.value); // NEW 这样就完全避免了使用ref，
    // 这种方式主要还是适用于事件回调函数和你想触发的元素绑定在一起的
  };
  setInput = React.createRef();
  render() {
    return (
      <div>
        <input
          onBlur={this.showData2}
          type="text"
          placeholder="请输入需要提示的内容"
        />
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.querySelector('#box1'));
```

### React 收集表单数据

#### 非受控组件和受控组件

1. 非受控组件：（现用现取）通过 ref 获取 DOM 节点，获取相应的值
2. 受控组件：通过 state 存储表单组件的值，通过 setState 对值修改，不涉及到 ref

```javascript
// 受控组件
class Demo extends React.Component {
  // TIPS 记住要初始化state的值
  state = {
    userName: '',
    userPassword: '',
  };
  handlerSubmit = (event) => {
    event.preventDefault(); // 阻止默认事件
    const { userName, userPassword } = this.state;
    // 注意 受控组件就不是通过ref来获取节点数据了，而是通过state来
    alert(`用户名：${userName} 密码：${userPassword}`);
  };

  setUserName = (event) => {
    // 由state来保存表单数据  通过setState来修改数据
    this.setState({
      userName: event.target.value,
    });
  };
  setUserPwd = (event) => {
    // 由state来保存表单数据  通过setState来修改数据
    this.setState({
      userPassword: event.target.value,
    });
  };
  render() {
    return (
      <form onSubmit={this.handlerSubmit}>
        用户名：
        <input
          onChange={this.setUserName}
          type="text"
          placeholder="请输入用户名"
          name="userName"
        />
        密码：
        <input
          onChange={this.setUserPwd}
          type="password"
          name="userPassword"
          placeholder="请输入密码"
        />
        <button>登录</button>
      </form>
    );
  }
}
ReactDOM.render(<Demo />, document.querySelector('#box1'));
```

```javascript
// 非受控组件 通过DOM节点获取数据的方式属于非受控
class Demo extends React.Component {
  handlerSubmit = (event) => {
    event.preventDefault(); // 阻止默认事件
    const { userName, userPassword } = this;
    // 注意 这里事读取DOM的值，需要拿到DOM节点后通过 .value获取
    alert(`用户名：${userName.value} 密码：${userPassword.value}`);
  };
  render() {
    return (
      <form onSubmit={this.handlerSubmit}>
        用户名：
        <input
          ref={(cN) => {
            this.userName = cN;
          }}
          type="text"
          placeholder="请输入用户名"
          name="userName"
        />
        密码：
        <input
          ref={(cN) => {
            this.userPassword = cN;
          }}
          type="password"
          name="userPassword"
        />
        <button>登录</button>
      </form>
    );
  }
}
ReactDOM.render(<Demo />, document.querySelector('#box1'));
```

##### 函数柯里化

高阶函数：一个函数出现一下两种情况的一种，就算是高阶函数

1. 若函数 A 接收的参数还是一个函数，就称之为高阶函数
2. 若函数 A 的返回值依然是一个函数，也可以称之为高阶函数

函数的柯里化：通过函数继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式

这里处理表单数据需要用到函数柯里化，为的是在处理多个表单元素的时候可以公用一个函数

### 组件的生命周期

#### 页面卸载

```javascript
ReactDOM.unmountComponentAtNode('选中的节点');
// 示例：卸载组件(只能选中组件挂载位置的dom)
ReactDOM.unmountComponentAtNode(document.querySelector('#box1'));
```

#### 页面挂载只执行一次 DidMount

```javascript
// 组件挂载完毕 类似mounted
componentDidMount() {}
```

#### 组件卸载之前 WillUnmount

```javascript
// 组件将要卸载 类似beforeDestroy
componentWillUnmount() {}
```

#### 旧版生命周期总结

初始化阶段：由 `ReactDom.render() ` 触发 -- 初次渲染

1. `constructor()`
2. `componentWillMount()`
3. `render()`
4. `componentDidMount()`

更新阶段：由组件内部 `this.setState()` 或使用强制更新 `forceUpdata()`

1. `shouldComponentUpdate()` -- `forceUpdata()`不经过这个周期钩子 这个周期钩子需要一个布尔类型的返回值，默认 `true`
2. `componentWillUpdate()`
3. `render()`
4. `componentDidUpdate()`

卸载组件：由 `ReactDOM.unmountComponentAtNode()`触发

1. `componentWillUnmount()`

#### 新版生命周期
