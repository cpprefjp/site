# swap (非メンバ関数)
* functional[meta header]
* std[meta namespace]
* move_only_function[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
friend void swap(move_only_function& f1, move_only_function& f2) noexcept;
```

## 概要
2つの`move_only_function`オブジェクトを入れ替える。


## 効果
`f1.`[`swap`](swap.md)`(f2)`


## 戻り値
なし


## 例
```cpp example
#include <iostream>
#include <functional>

int ident(int x) { return x; }
int add(int x) { return x + 1; }

int main()
{
  std::move_only_function<int(int)> f = ident;
  std::move_only_function<int(int)> g = add;

  // fとgを交換
  std::swap(f, g);

  std::cout << f(1) << std::endl; // add
  std::cout << g(1) << std::endl; // ident
}
```
* std::swap[color ff0000]
* f(1)[link op_call.md]
* g(1)[link op_call.md]

### 出力
```
2
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
