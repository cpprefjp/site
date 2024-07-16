# operator=
* functional[meta header]
* std[meta namespace]
* move_only_function[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
move_only_function& operator=(move_only_function&& f); // (1)

move_only_function& operator=(nullptr_t); noexcept;    // (2)

template<class F>
move_only_function& operator=(F&& f);                  // (3)
```

## 効果
- (1) : ムーブ代入。[`move_only_function`](op_constructor.md)`(`[`std::move`](/reference/utility/move.md)`(f)).`[`swap`](swap.md)`(*this)`
- (2) : `*this`が有効な関数ポインタ、メンバポインタ、もしくは関数オブジェクトを持っている場合、それを解放する。
- (3) : [`move_only_function`](op_constructor.md)`(`[`std::forward`](/reference/utility/forward.md)`<F>(f)).`[`swap`](swap.md)`(*this)`


## 戻り値
`*this`


## 例外
- (2) : 投げない


## 例
```cpp example
#include <iostream>
#include <functional>

int ident(int x) { return x; }

int main()
{
  std::move_only_function<int(int)> f;

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
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0288R9 move_only_function](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0288r9.html)
