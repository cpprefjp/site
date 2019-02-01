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
  constexpr bool negation_v = negation<Trait>::value;
}
```

## 概要
特性（bool値を返すメタ関数）の論理否定を計算する。

## 要件
Traitはboolに変換可能なメンバ変数valueを持つこと。

## 効果
[`bool_constant<!Trait::value>`](bool_constant.md)から派生する。

すなわち、`Trait::value == true`ならば[`false_type`](false_type.md)から派生し、`Trait::value == false`ならば[`true_type`](true_type.md)から派生する。


## 例
```cpp example
#include <type_traits>
#include <iostream>

template<typename T>
void f() {
  std::cout << std::boolalpha << "T::value = " << T::value << std::endl;
}

int main()
{
  f<std::is_integral<int>>();
  f<std::negation<std::is_integral<int>>>();
}
```
* std::negation[color ff0000]
* std::is_integral[link is_integral.md]

### 出力
```
T::value = true
T::value = false
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
- [Clang](/implementation.md#clang): 3.8
- [GCC](/implementation.md#gcc): 6.3
- [Visual C++](/implementation.md#visual_cpp): 2015 update2, 2017
	- `negation_v`は、2015 update3までは定義されているが有効化されていない。


## 参照
- [Logical Operator Type Traits (revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0013r1.html)
