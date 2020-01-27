# end
* initializer_list[meta header]
* std[meta namespace]
* initializer_list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const E* end() const noexcept;           // C++11
constexpr const E* end() const noexcept; // C++14
```

## 概要
最後尾要素の次を指すポインタを取得する。


## 戻り値
[`begin()`](begin.md) `+` [`size()`](size.md)を返す。


## 例外
投げない


## 備考
- この関数によって返されるイテレータは、`*this`が保持するいずれの要素も参照しない。その指す先は、不�な範囲となるだろう


## 例
```cpp example
#include <iostream>
#include <initializer_list>
#include <algorithm>

int main()
{
  std::initializer_list<int> init = {1, 2, 3};

  std::for_each(init.begin(), init.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* end()[color ff0000]
* init.begin()[link begin.md]

### 出力
```
1
2
3
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): 4.4.0


## 参照
- [N3469 Constexpr Library Additions: chrono, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3469.html)

