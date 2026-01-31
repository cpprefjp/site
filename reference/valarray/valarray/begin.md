# begin
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
iterator begin();             // (1) C++26
const_iterator begin() const; // (2) C++26
```

## 概要
先頭の要素を指すイテレータを取得する。


## 戻り値
先頭要素を指すイテレータを返す。


## 備考
- この関数によって返されるイテレータは、[`resize()`](resize.md)メンバ関数が呼び出されると無効になる


## 例
```cpp example
#include <iostream>
#include <valarray>
#include <algorithm>

int main()
{
  std::valarray<int> va = {1, 2, 3};

  std::for_each(va.begin(), va.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* va.begin()[color ff0000]
* va.end()[link end.md]

### 出力
```
1
2
3
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
