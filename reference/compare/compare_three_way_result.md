# compare_three_way_result

* compare[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {

  template<class T, class U = T>
  struct compare_three_way_result {
    using type = …;
  };

  template<class T, class U = T>
  using compare_three_way_result_t = typename compare_three_way_result<T, U>::type;
}
```

## 概要

与えられた型の間の`<=>`による比較結果型を求める。

## 効果

`T2 = remove_reference_t<T>`、`U2 = remove_reference_t<U>`として、`const T2& t`、`const U2& u`のように定義されるオブジェクト`t, u`に対する`t <=> u`が使用可能であれば、`type = decltype(t <=> u)`のようにメンバ型`type`を定義する。

それ以外の場合は、`type`は定義されない。

ただし、これらのチェックは未評価の文脈で行われる。

## 備考

ユーザーはこのクラスの明示的、部分特殊化を定義してはならない。それらの特殊化を定義した場合、そのプログラムの動作は未定義。

## 例

```cpp example
#include <iostream>
#include <compare>
#include <type_traits>

template<typename T, typename Cat>
using fallback_comp3way_t = std::conditional_t<std::three_way_comparable<T>, std::compare_three_way_result<T>, std::type_identity<Cat>>::type;

template<typename T>
struct wrap {
  T t;

  // <=>を使用可能ならそれを、そうでないなら< ==を使ってdefault実装
  auto operator<=>(const wrap&) const
    -> fallback_comp3way_t<T, std::weak_ordering>
      = default;
};

// <=>を定義しない型
struct no_spaceship {
  int n;

  bool operator<(const no_spaceship& that) const noexcept {
    return n < that.n;
  }

  bool operator==(const no_spaceship& that) const noexcept {
    return n == that.n;
  }
};

int main()
{
  wrap<no_spaceship> t1 = {{20}}, t2 = {{30}};

  std::cout << std::boolalpha;
  std::cout << (t1 <  t2) << std::endl;
  std::cout << (t1 <= t2) << std::endl;
  std::cout << (t1 >  t2) << std::endl;
  std::cout << (t1 >= t2) << std::endl;
}
```
* compare_three_way_result[color ff0000]
* type_identity[link /reference/type_traits/type_identity.md]

### 出力
```
true
true
false
false
```

このコードをコンパイルできるコンパイラがまだないため、結果は予想。

## 実装例

```cpp
template<typename T, typename U = T>
concept simple_3way_comparable = requires(const std::remove_reference_t<T>& t, const std::remove_reference_t<U>& u) {
  t <=> u;
};

template<typename T, typename U = T>
struct compare_three_way_result {};

template<typename T, typename U>
requires simple_3way_comparable<T, U>
struct compare_three_way_result<T, U> {
  using type = decltype(declval<const remove_reference_t<T>&>() <=> declval<const remove_reference_t<U>&>());
};

```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??

## 関連項目

- [C++20 `<=>`/`==`による比較演算子の自動定義](/lang/cpp20/consistent_comparison.md)


## 参照

- [P1614R2 The Mothership has Landed (Adding <=> to the Library)](http://wg21.link/p1614)
