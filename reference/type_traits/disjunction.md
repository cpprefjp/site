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
Traits内の全ての型は基底クラスとして使用可能で（final指定されていない）、boolに変換可能なメンバ変数valueを持つこと。

## 効果
`sizeof...(Traits) == 0`ならば[`true_type`](true_type.md)から派生し

`sizeof...(Traits) == 1`ならばそのTraitsから派生し

`sizeof...(Traits) > 1`ならば`Traits::value == true`となる最初の型か、Traits列の一番最後の型から派生する。

すなわち、（結果だけを見れば）全てのTraits::valueを||演算�で結合した結果に�しい（`(... || Traits::value)`）。

## 備考
`disjunction`は�絡評価される。

||演算�を用いると||で連結されているすべてのメタ関数のインスタンス化が行われるのに対して、`disjunction`では::value==trueとなるメタ関数が出現した時点で処理は終了し、後続のメタ関数のインスタンス化は行われない。

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
* std::is_member_object_pointer[link is_move_assignable.md]
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
- [Clang](/implementation.md#clang): 3.8
- [GCC](/implementation.md#gcc): 6.3
- [Visual C++](/implementation.md#visual_cpp): 2015 update2, 2017
	- `disjunction_v`は、2015 update3までは定義されているが有効化されていない。


## 参照
- [C++17 で追加された std::conjunction/std::disjunction メタ関数 - Secret Garden(Instrumental)](http://secret-garden.hatenablog.com/entry/2017/08/13/203150)
- [conjunction/disjunctionと�絡インスタンス化 - yohhoyの日記](https://yohhoy.hatenadiary.jp/entry/20171103/p1)
- [Logical Operator Type Traits (revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0013r1.html)
