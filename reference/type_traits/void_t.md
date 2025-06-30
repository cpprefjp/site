# void_t
* type_traits[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class...>
  using void_t = void;
}
```

## 概要
0個以上の任意の型をvoidに変換する。

## 効果
与えられた型の中に一つでもill-formedとなる型があれば`void_t`もまたill-formedとなる。そうでなければ（与えられた型がすべてwell-formedならば）`void_t`は`void`となる。

すなわち、与えられた型を一つづつ評価していった結果エラーとなる型が現れた場合に`void_t`もまたエラーとなる。

`void_t`はSFINAEと組み合わせて型が持つ特性・メンバや適用可能な操作を検出するのに使用される。そのような手法はdetection idiomと呼ばれる。


## 備考
C++14まではエイリアステンプレートでの未使用のテンプレートパラメータの評価に関しての規定が無かったことから、以下のような少し複雑な実装になっている場合がある。
この問題はcore issue 1558で把握され、C++17にて修正された。

```cpp
template <class... Types>
struct Tester {
  using type = void;
};

template <class... Types>
using void_t = typename Tester<Types...>::type;
```

## 例

```cpp example
#include <iostream>
#include <type_traits>
#include <vector>

template<class, template<class> class, class = std::void_t<>>
struct detect : std::false_type {};

template<class T, template<class> class Check>
struct detect<T, Check, std::void_t<Check<T>>>
  : std::true_type {};

template<class T>
using has_iterator_type_impl = typename T::iterator;

template<class T>
using has_iterator_type = detect<T, has_iterator_type_impl>;

template<class T>
using is_equality_comparable_impl = decltype(std::declval<const T&>() == std::declval<const T&>());

template<class T>
using is_equality_comparable = detect<T, is_equality_comparable_impl>;


struct NonComparable {};

int main()
{
  std::cout << std::boolalpha;

  //::iteratorを持っているかの検出
  std::cout << has_iterator_type<int>::value << std::endl;
  std::cout << has_iterator_type<std::vector<int>>::value << std::endl;

  //等値比較可能かの検出
  std::cout << is_equality_comparable<int>::value << std::endl;
  std::cout << is_equality_comparable<NonComparable>::value << std::endl;
}
```
* std::void_t[color ff0000]
* std::declval[link /reference/utility/declval.md]

### 出力
```
false
true
true
false
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 3.6 [mark verified]
- [GCC](/implementation.md#gcc): 6.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2015 [mark verified], 2017 [mark verified]
	- 2015では備考にある複雑な実装になっている。

## 参照
- [C++1z void_t - Faith and Brave - C++で遊ぼう](https://faithandbrave.hateblo.jp/entry/2016/09/05/170810)
- [Detection Idiom - yohhoyの日記](https://yohhoy.hatenadiary.jp/entry/20151103/p1)
- [Proposing Standard Library Support for the C++ Detection Idiom, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4502.pdf)
- [core issue 1558](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3952.html#1558)
