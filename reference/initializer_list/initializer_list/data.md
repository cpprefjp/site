# data
* initializer_list[meta header]
* std[meta namespace]
* initializer_list[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr const E* data() const noexcept; // (1) C++26
```

## 概要
配列の先頭へのポインタを取得する。


## 戻り値
配列の先頭要素を指すポインタを返す。

配列の要素数が空である場合、[`begin()`](begin.md)と同じ未規定のポインタ値を返す。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <initializer_list>

int main()
{
  std::initializer_list<int> init = {1, 2, 3};

  const int* p = init.data();

  std::cout << *p << std::endl;
}
```
* init.data()[color ff0000]

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
- [P3016R6 Resolve inconsistencies in `begin`/`end` for `valarray` and `braced-initializer-list`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3016r6.html)
