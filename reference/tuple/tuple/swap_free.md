# swap (非メンバ関数)
* tuple[meta header]
* std[meta namespace]
* tuple[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class... Types>
  void swap(tuple<Types...>& x, tuple<Types...>& y)
    noexcept(noexcept(x.swap(y)));
}
```

## 概要
2つの`tuple`オブジェクトを入れ替える。


## 効果
```cpp
x.swap(y);
```
* swap[link swap.md]


## 戻り値
なし


## 例外
効果の式が例外を投げない場合、この関数は決して例外を投げない。


## 例
```cpp
#include <string>
#include <tuple>
#include <cassert>

int main()
{
  std::tuple<int, char, std::string> a(1, 'a', "hello");
  std::tuple<int, char, std::string> b(2, 'b', "good-bye");

  std::swap(a, b);

  assert(a == std::make_tuple(2, 'b', "good-bye"));
  assert(b == std::make_tuple(1, 'a', "hello"));
}
```
* std::swap[color ff0000]
* std::make_tuple[link /reference/tuple/make_tuple.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照


