# forward_like
* utility[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class T, class U>
  [[nodiscard]] constexpr auto forward_like(U&& x) noexcept -> see-below;
}
```
* see-below[italic]

## 概要
第一テンプレート引数の`const`性と参照修飾を用いて関数テンプレートの引数を転送する。

この関数は主に、クラスオブジェクトの`const`性と参照修飾を用いてメンバ変数を転送する目的で使用される。

## 効果
- `COPY_CONST(A, B)`を`A`が`const`修飾されているとき`const B`、そうでないとき`B`とする
- `OVERRIDE_REF(A, B)`を`A`が右辺値参照のとき`remove_reference_t<B>&&`、そうでないとき`B&`とする
- `V`を`OVERRIDE_REF(T&&, COPY_CONST(remove_reference_t<T>, remove_reference_t<U>))`とする

以上のもとで、`forward_like`は`static_cast<V>(x)`を返す。

## 例外
投げない

## 備考
戻り値の型は`V`である。

## 例
### 効果の確認
```cpp example
#include <type_traits>
#include <utility>

int main()
{
  int a = 0;
  int& b1 = a;
  int&& b2 = 0;
  const int& b3 = a;
  const int&& b4 = 0;
  static_assert(std::is_same_v<decltype(std::forward_like<decltype(b1)>(a)), int&>);
  static_assert(std::is_same_v<decltype(std::forward_like<decltype(b2)>(a)), int&&>);
  static_assert(std::is_same_v<decltype(std::forward_like<decltype(b3)>(a)), const int&>);
  static_assert(std::is_same_v<decltype(std::forward_like<decltype(b4)>(a)), const int&&>);
}
```
* std::forward_like[color ff0000]
* std::is_same_v[link /reference/type_traits/is_same.md]

#### 出力
```
```

### 基本的な使用例 (`not_fn`の再実装)
```cpp example
#include <functional>
#include <iostream>
#include <string>
#include <type_traits>
#include <utility>

template <class F>
struct not_fn_t {
  F f;

  template <class Self, class... Args>
  constexpr auto operator()(this Self&& self, Args&&... args) noexcept(
    noexcept(   !std::invoke(std::forward_like<Self>(self.f), std::forward<Args>(args)...)))
    -> decltype(!std::invoke(std::forward_like<Self>(self.f), std::forward<Args>(args)...)) {
    return      !std::invoke(std::forward_like<Self>(self.f), std::forward<Args>(args)...);
  }
};

template <class F>
constexpr not_fn_t<std::decay_t<F>> my_not_fn(F&& f) {
  return {std::forward<F>(f)};
}

int main()
{
  constexpr auto non_empty = my_not_fn(&std::string::empty);
  std::string str = "str";
  std::cout << std::boolalpha << non_empty(str) << std::endl;
}
```
* std::forward_like[color ff0000]
* std::invoke[link /reference/functional/invoke.md]
* std::forward[link /reference/utility/forward.md]
* std::decay_t[link /reference/type_traits/decay.md]

#### 出力
```
true
```

## 実装例
```cpp
template <class A, class B>
using __copy_const_t = conditional_t<is_const_v<A>, const B, B>;

template <class A, class B>
using __override_ref_t =
  conditional_t<is_rvalue_reference_v<A>, remove_reference_t<B>&&, B&>;

template <class T, class U>
using __forward_like_t = __override_ref_t<
  T&&, __copy_const_t<remove_reference_t<T>, remove_reference_t<U>>>;

template <class T, class U>
[[nodiscard]] constexpr auto forward_like(U&& x) noexcept
  -> __forward_like_t<T, U> {
  return static_cast<__forward_like_t<T, U>>(x);
}
```
* conditional_t[link /reference/type_traits/conditional.md]
* is_const_v[link /reference/type_traits/is_const.md]
* is_rvalue_reference_v[link /reference/type_traits/is_rvalue_reference.md]
* remove_reference_t[link /reference/type_traits/remove_reference.md]

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 16.0.0 [mark verified]
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2022 17.4 [mark verified]


## 参照
- [P2445R1 std::forward_like](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2445r1.pdf)
