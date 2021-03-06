## Note

### 代码文件结构, 代码和文件命名规范

- **components** 文件夹存放所有的展示型组件.
- **containers** 文件夹存放所有的容器型组件.
- 两个文件夹下都有 `__test__` 文件夹存放组件测试文件.
- 文件使用 **Pascal Case** 命名法, 首字母大写, 后续每个单词首字母都大写.
- **src** 根目录下放统一使用的一些文件.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### 测试

#### 测试框架 Jest

- 通用的测试框架, 支持多平台.
- 测试速度快.
- 内置总结覆盖率.

```javascript
test('测试相等', () => {
	expect(2 + 2).toBe(4)
})

test('测试不相等', () => {
	expect(2 + 2).not.toBe(5)
})

test('测试布尔值', () => {
	expect(1).toBeTruthy()
	expect(0).toBeFalsy()
})

test('测试数值', () => {
	expect(4).toBeGreaterThan(3)
	expect(4).toBeLessThan(5)
})

test('测试对象', () => {
	expect({ name: 'zlk', age: 30 }).toEqual({ name: 'zlk', age: 30 })
})
```

#### Enzyme 

> 基于React官方测试工具 - ReactTestUtils 的封装, Airbnb出品.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
