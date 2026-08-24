# disjunction
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class... Traits>
  struct disjunction;

  template <class... Traits>
  inline constexpr bool disjunction_v = disjunction<Traits...>::value;
}
```

## 概要
複数の特性（bool値を返すメタ関数）の論理和を計算する。

## 要件
- `Traits`内の型のうち、`Bi::value`が実体化されるものは、基底クラスとして使用可能で（`final`指定されていない）、`bool`に変換可能なメンバ変数`value`を持つこと。
    - 短絡評価によって`value`が参照されない型には、この要件は及ばない。

## 効果
`sizeof...(Traits) == 0`ならば[`false_type`](false_type.md)から派生し

`sizeof...(Traits) == 1`ならばそのTraitsから派生し

`sizeof...(Traits) > 1`ならば`Traits::value == true`となる最初の型か、Traits列の一番最後の型から派生する。

すなわち、（結果だけを見れば）全てのTraits::valueを||演算子で結合した結果に等しい（`(... || Traits::value)`）。

## 備考
`disjunction`は短絡評価される。

||演算子を用いると||で連結されているすべてのメタ関数のインスタンス化が行われるのに対して、`disjunction`では::value==trueとなるメタ関数が出現した時点で処理は終了し、後続のメタ関数のインスタンス化は行われない。

## 例
```cpp example
#include <type_traits>
#include <iostream>

template<typename T>
using is_some_of_pointer = std::disjunction<std::is_pointer<T>, std::is_member_object_pointer<T>, std::is_member_function_pointer<T>>;

template<typename T, std::enable_if_t<is_some_of_pointer<T>::value, std::nullptr_t> = nullptr>
void f(T) {
  std::cout << "Tは何らかのポインタ" << std::endl;
}

template<typename T, std::enable_if_t<!is_some_of_pointer<T>::value, std::nullptr_t> = nullptr>
void f(T) {
  std::cout << "Tはポインタではない" << std::endl;
}

struct s {
  void member_function(){};
  int member_object;
};

int main()
{
  int n = 1234;
  int* p = &n;

  f(p);
  f(n);
  f(&s::member_object);
  f(&s::member_function);
}
```
* std::disjunction[color ff0000]
* std::is_pointer[link is_pointer.md]
* std::is_member_object_pointer[link is_member_object_pointer.md]
* std::is_member_function_pointer[link is_member_function_pointer.md]
* std::enable_if_t[link enable_if.md]

### 出力
```
Tは何らかのポインタ
Tはポインタではない
Tは何らかのポインタ
Tは何らかのポインタ
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 3.8 [mark verified]
- [GCC](/implementation.md#gcc): 6.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2015 update2 [mark verified], 2017 [mark verified]
	- `disjunction_v`は、2015 update3までは定義されているが有効化されていない。


## 参照
- [C++17 で追加された std::conjunction/std::disjunction メタ関数 - Secret Garden(Instrumental)](http://secret-garden.hatenablog.com/entry/2017/08/13/203150)
- [conjunction/disjunctionと短絡インスタンス化 - yohhoyの日記](https://yohhoy.hatenadiary.jp/entry/20171103/p1)
- [Logical Operator Type Traits (revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0013r1.html)
- [LWG Issue 2557. Logical operator traits are broken in the zero-argument case](https://cplusplus.github.io/LWG/issue2557)
    - C++17の策定中に、引数が0個の場合（`conjunction<>`は`true_type`、`disjunction<>`は`false_type`）を正しく扱うよう文言が整理された
- [LWG Issue 2567. Specification of logical operator traits uses `BaseCharacteristic`, which is defined only for `UnaryTypeTraits` and `BinaryTypeTraits`](https://cplusplus.github.io/LWG/issue2567)
    - C++17の策定中に、`conjunction`/`disjunction`/`negation`のBaseCharacteristic（派生元の基底）の規定が、どの型から派生するかを明示する形に整理された
- [LWG Issue 2569. `conjunction` and `disjunction` requirements are too strict](https://cplusplus.github.io/LWG/issue2569)
    - C++17の策定中に、テンプレート引数のうち`Bi::value`が実体化されるものだけが基底クラスとして使用可能であればよい、と要件が緩和された（短絡評価される型には要件が及ばない）
