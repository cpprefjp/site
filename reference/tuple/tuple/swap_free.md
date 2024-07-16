# swap (非メンバ関数)
* tuple[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class... Types>
  void swap(tuple<Types...>& x, tuple<Types...>& y)
    noexcept(noexcept(x.swap(y)));                            // (1) C++11
  template <class... Types>
  constexpr void swap(tuple<Types...>& x, tuple<Types...>& y)
    noexcept(noexcept(x.swap(y)));                            // (1) C++20

  template<class... Types>
  constexpr void swap(const tuple<Types...>& x, 
                      const tuple<Types...>& y) 
    noexcept(see below);                                      // (2) C++23
}
```

## 概要
- (1) : 2つの`tuple`オブジェクトを入れ替える。
- (2) : 2つの[プロキシ参照](/reference/iterator/indirectly_writable.md)である`tuple`オブジェクトについて、対応する要素毎に参照先の値を入れ替える。


## 要件
効果の式に現れている、[`tuple::swap`](swap.md)に準じる。


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
```cpp example
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
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1032R1 Misc constexpr bits](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1032r1.html)
