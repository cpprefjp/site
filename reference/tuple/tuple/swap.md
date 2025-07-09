# swap
* tuple[meta header]
* std[meta namespace]
* tuple[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void swap(tuple& rhs) noexcept(see below);           // (1) C++11
constexpr void swap(tuple& rhs) noexcept(see below); // (1) C++20

constexpr void
  swap(const tuple& rhs) const noexcept(see below);  // (2) C++23
```
* see below[italic]

## 概要
- (1) : 他の[`tuple`](../tuple.md)オブジェクトと中身を入れ替える。
- (2) : [プロキシ参照](/reference/iterator/indirectly_writable.md)である[`tuple`](../tuple.md)同士で、参照先の値を入れ替える。


## 要件
- (1) : [`tuple`](../tuple.md)の全ての要素型が`swap`可能であること。
- (2) : C++23 : `(`[`is_swappable_v`](/reference/type_traits/is_swappable.md)`<const Types> && ...) == true`であること。


## 効果
- (1) : 自身のインスタンスの全ての要素を、`rhs`の全ての要素と入れ替える
- (2) : 自身のインスタンスの各要素の参照先の値と、他の[プロキシ参照](/reference/iterator/indirectly_writable.md)な[`tuple`](../tuple.md)の各要素の参照先の値とを入れ替える。


## 戻り値
なし


## 例外
- (1) : [`tuple`](../tuple.md)の全ての要素型が、例外を投げない`swap`を持っている場合、この関数は例外を投げない
- (2) : C++23 : `(`[`is_nothrow_swappable_v`](/reference/type_traits/is_nothrow_swappable.md)`<const Types> && ...) == true`であること。


## 例
```cpp example
#include <string>
#include <tuple>
#include <cassert>

int main()
{
  std::tuple<int, char, std::string> a(1, 'a', "hello");
  std::tuple<int, char, std::string> b(2, 'b', "good-bye");

  a.swap(b);

  assert(a == std::make_tuple(2, 'b', "good-bye"));
  assert(b == std::make_tuple(1, 'a', "hello"));
}
```
* swap[color ff0000]
* std::make_tuple[link /reference/tuple/make_tuple.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 


## 参照
- [P1032R1 Misc constexpr bits](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1032r1.html)
- [P2321R2 `zip`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2321r2.html)
