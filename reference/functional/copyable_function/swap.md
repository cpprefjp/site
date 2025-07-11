# swap
* functional[meta header]
* std[meta namespace]
* copyable_function[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
void swap(copyable_function& other) noexcept;
```

## 概要
他の`copyable_function`オブジェクトと中身を入れ替える。


## 効果
`*this`が持つ関数と`other`が持つ関数を交換する。


## 戻り値
なし


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <functional>

int ident(int x) { return x; }
int add(int x) { return x + 1; }

int main()
{
  std::copyable_function<int(int)> f = ident;
  std::copyable_function<int(int)> g = add;

  // fとgを交換
  f.swap(g);

  std::cout << f(1) << std::endl; // add
  std::cout << g(1) << std::endl; // ident
}
```
* swap[color ff0000]
* f(1)[link op_call.md]
* g(1)[link op_call.md]

### 出力
```
2
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
