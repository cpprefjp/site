# conjunction
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class... Traits>
  struct conjunction;

  template <class... Traits>
  inline constexpr bool conjunction_v = conjunction<Traits...>::value;
}
```

## 概要
複数の特性（bool値を返すメタ関数）の論理積を計算する。

## 要件
Traits内の全ての型は基底クラスとして使用可能で（final指定されていない）、boolに変換可能なメンバ変数valueを持つこと。

## 効果
`sizeof...(Traits) == 0`ならば[`true_type`](true_type.md)から派生し

`sizeof...(Traits) == 1`ならばそのTraitsから派生し

`sizeof...(Traits) > 1`ならば`Traits::value == false`となる最初の型か、Traits列の一番最後の型から派生する。

すなわち、（結果だけを見れば）全てのTraits::valueを&&演算�で結合した結果に�しい（`(... && Traits::value)`）。

## 備考
`conjunction`は�絡評価される。

&&演算�を用いると&&で連結されているすべてのメタ関数のインスタンス化が行われるのに対して、`conjunction`では::value==falseとなるメタ関数が出現した時点で処理は終了し、後続のメタ関数のインスタンス化は行われない。

## 例
```cpp example
#include <type_traits>
#include <iostream>

template<typename T>
using is_full_movable = std::conjunction<std::is_move_constructible<T>, std::is_move_assignable<T>>;

template<typename T, std::enable_if_t<is_full_movable<T>::value, std::nullptr_t> = nullptr>
void f(T) {
  std::cout << "Tはムーブ構築/代入可能" << std::endl;
}

template<typename T, std::enable_if_t<!is_full_movable<T>::value, std::nullptr_t> = nullptr>
void f(T) {
  std::cout << "Tはムーブ構築/代入どちらかが不可" << std::endl;
}

struct Movable {};

struct NotMoveAssignable {
  NotMoveAssignable& operator=(NotMoveAssignable&&) = delete;
};

int main()
{
  f(Movable{});
  f(NotMoveAssignable{});
}
```
* std::conjunction[color ff0000]
* std::is_move_constructible[link is_move_constructible.md]
* std::is_move_assignable[link is_move_assignable.md]
* std::enable_if_t[link enable_if.md]

### 出力
```
Tはムーブ構築/代入可能
Tはムーブ構築/代入どちらかが不可
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 3.8
- [GCC](/implementation.md#gcc): 6.3
- [Visual C++](/implementation.md#visual_cpp): 2015 update2, 2017
	- `conjunction_v`は、2015 update3までは定義されているが有効化されていない。


## 参照
- [C++17 で追加された std::conjunction/std::disjunction メタ関数 - Secret Garden(Instrumental)](http://secret-garden.hatenablog.com/entry/2017/08/13/203150)
- [conjunction/disjunctionと�絡インスタンス化 - yohhoyの日記](https://yohhoy.hatenadiary.jp/entry/20171103/p1)
- [Logical Operator Type Traits (revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0013r1.html)
