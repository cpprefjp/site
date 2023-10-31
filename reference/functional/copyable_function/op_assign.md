# operator=
* functional[meta header]
* std[meta namespace]
* copyable_function[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
copyable_function& operator=(const copyable_function& f); // (1)

copyable_function& operator=(copyable_function&& f);      // (2)

copyable_function& operator=(nullptr_t); noexcept; // (3)

template<class F>
copyable_function& operator=(F&& f);               // (4)
```

## 効果

- (1) : コピー代入。[`copyable_function`](op_constructor.md)`(f).`[`swap`](swap.md)`(*this)`
- (2) : ムーブ代入。[`copyable_function`](op_constructor.md)`(`[`std::move`](/reference/utility/move.md)`(f)).`[`swap`](swap.md)`(*this)`
- (3) : `*this`が有効な関数ポインタ、メンバポインタ、もしくは関数オブジェクトを持っている場合、それを解放する。
- (4) : [`copyable_function`](op_constructor.md)`(`[`std::forward`](/reference/utility/forward.md)`<F>(f)).`[`swap`](swap.md)`(*this)`


## 戻り値
`*this`


## 例外
- (3) : 投げない


## 例
```cpp example
#include <iostream>
#include <functional>

int ident(int x) { return x; }

int main()
{
  std::copyable_function<int(int)> f;

  // 関数を代入
  f = ident;

  int result = f(1);
  std::cout << result << std::endl;
}
```
* f(1)[link op_call.md]

### 出力
```
1
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2548R6 copyable_function](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2548r6.pdf)
