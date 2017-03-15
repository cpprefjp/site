# begin (非メンバ関数)
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  unspecified1 begin(valarray<T>& va);       // (1)

  template <class T>
  unspecified2 begin(const valarray<T>& va); // (2)
}
```
* unspecified1[italic]
* unspecified2[italic]

## 概要
先頭の要素を指すイテレータを取得する。


## 戻り値
先頭要素を指すイテレータを返す。この関数によって返されるイテレータは、ランダムアクセスイテレータの要件を満たす型である。

*unspecified1*は非`const`なランダムアクセスイテレータ、*unspecified2*は`const`なランダムアクセスイテレータである。


## 備考
この関数によって返されるイテレータは、[`resize()`](resize.md)メンバ関数が呼び出されると無効になる。


## 例
```cpp
#include <iostream>
#include <valarray>
#include <algorithm>

int main()
{
  std::valarray<int> va = {1, 2, 3};

  std::for_each(std::begin(va), std::end(va), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* begin[color ff0000]

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
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


## 参照
- [LWG2058. valarray and begin/end](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2058)


