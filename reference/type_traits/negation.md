# negation
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class Trait>
  struct negation;

  template <class Trait>
  inline constexpr bool negation_v = negation<Trait>::value;
}
```

## 概要
特性（`bool`値を返すメタ関数）の論理否定を計算する。

## 要件
型引数`Trait`は`bool`に変換可能なメンバ変数`value`を持つこと。

## 効果
[`bool_constant<!Trait::value>`](bool_constant.md)から派生する。

すなわち、`Trait::value == true`ならば[`false_type`](false_type.md)から派生し、`Trait::value == false`ならば[`true_type`](true_type.md)から派生する。

主に[`conjunction`](conjunction.md)、[`disjunction`](disjunction.md)のような、結果となる`::value`ではなくメタ関数そのものを受け取る高階メタ関数の引数において結果の真理値を反転させたいときに利用する。

## 例
```cpp example
#include <type_traits>
#include <iostream>
#include <memory>

template<typename T>
void f() {
  std::cout << std::boolalpha << "T::value = " << T::value << std::endl;
}

//型Tがムーブ構築のみが可能かどうかを調べる（is_move_constructible == true && is_copy_constructible == false）
template<typename T>
using is_only_move = std::conjunction<std::is_move_constructible<T>, std::negation<std::is_copy_constructible<T>>>;

int main()
{
  f<std::true_type>();
  f<std::negation<std::true_type>>();

  f<is_only_move<std::unique_ptr<int>>>();
}
```
* std::negation[color ff0000]
* std::true_type[link true_type.md]
* std::is_move_constructible[link is_move_constructible.md]
* std::is_copy_constructible[link is_copy_constructible.md]
* std::conjunction[link conjunction.md]

### 出力
```
T::value = true
T::value = false
T::value = true
```


## 実装例
```cpp
template <class Trait>
struct negation : bool_constant<!Trait::value> {};
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 3.8 [mark verified]
- [GCC](/implementation.md#gcc): 6.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2015 update2 [mark verified], 2017 [mark verified]
	- `negation_v`は、2015ではインテリセンスからは見えないが利用可能である。

## 参照
- [Logical Operator Type Traits (revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0013r1.html)
