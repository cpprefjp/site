# operator<=
* variant[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class... Types>
  constexpr bool operator<=(const variant<Types...>& x, const variant<Types...>& y);
}
```

## 概要
`variant`オブジェクトにおいて、左辺が右辺以下かを判定する。


## テンプレートパラメータ制約
- 全ての候補型インデックス`I`において、式[`get`](get.md)`<I>(x) <=` [`get`](get.md)`<I>(y)`によって返される型が`bool`に変換可能であること


## 戻り値
- `x.`[`valueless_by_exception()`](valueless_by_exception.md)が`true`である場合、`true`が返る
- `y.`[`valueless_by_exception()`](valueless_by_exception.md)が`true`である場合、`false`が返る
- `x.`[`index()`](index.md) `< y.`[`index()`](index.md)である場合、`true`が返る
- `x.`[`index()`](index.md) `> y.`[`index()`](index.md)である場合、`false`が返る
- いずれでもない場合 (`x.`[`index()`](index.md) `== y.`[`index()`](index.md))、そのインデックス値を`I`として、[`get`](get.md)`<I>(x) <=` [`get`](get.md)`<I>(y)`の戻り値が返る


## 例
```cpp example
#include <cassert>
#include <variant>

int main()
{
  std::variant<int, char, double> a = 1;
  std::variant<int, char, double> b = 3.14;
  std::variant<int, char, double> c = 3;

  assert(a <= a); // 保持する型が同じで、値がa <= aの関係
  assert(a <= c); // 保持する型が同じで、値がa <= cの関係
  assert(a <= b); // 保持する型のインデックスがa < bの関係
}
```

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.2 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0393R3 Making Variant Greater Equal](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0393r3.html)
