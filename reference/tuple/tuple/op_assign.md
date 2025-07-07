# operator=
* tuple[meta header]
* std[meta namespace]
* tuple[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
tuple& operator=(const tuple&);                          // (1) C++11
constexpr tuple& operator=(const tuple&);                // (1) C++20

constexpr const tuple& operator=(const tuple&) const;    // (2) C++23

tuple& operator=(tuple&&) noexcept(see below);           // (3) C++11
constexpr tuple& operator=(tuple&&) noexcept(see below); // (3) C++20

constexpr const tuple& operator=(tuple&&) const;         // (4) C++23

template <class... UTypes>
tuple& operator=(const tuple<UTypes...>&);               // (5) C++11
template <class... UTypes>
constexpr tuple& operator=(const tuple<UTypes...>&);     // (5) C++20

template<class... UTypes>
constexpr const tuple&
  operator=(const tuple<UTypes...>&) const;              // (6) C++23

template <class... UTypes>
tuple& operator=(tuple<UTypes...>&&);                    // (7) C++11
template <class... UTypes>
constexpr tuple& operator=(tuple<UTypes...>&&);          // (7) C++20

template<class... UTypes>
constexpr const tuple&
  operator=(tuple<UTypes...>&&) const;                   // (8) C++23

template <class U1, class U2>
tuple& operator=(const pair<U1, U2>&);                   // (9) C++11
template <class U1, class U2>
constexpr tuple& operator=(const pair<U1, U2>&);         // (9) C++20

template<class U1, class U2>
constexpr const tuple&
  operator=(const pair<U1, U2>&) const;                  // (10) C++23

template <class U1, class U2>
tuple& operator=(pair<U1, U2>&&);                        // (11) C++11
template <class U1, class U2>
constexpr tuple& operator=(pair<U1, U2>&&);              // (11) C++20

template<class U1, class U2>
constexpr const tuple& operator=(pair<U1, U2>&&) const;  // (12) C++23

template<tuple-like UTuple>
constexpr tuple& operator=(UTuple&&);                    // (13) C++23
template<tuple-like UTuple>
constexpr const tuple& operator=(UTuple&&) const;        // (14) C++23
```
* see below[italic]
* tuple-like[link ../tuple-like.md]

## 概要
- (1) : コピー代入を行う
- (2) : (1) のプロキシ参照版
- (3) : ムーブ代入を行う
- (4) : (3) のプロキシ参照版
- (5) : 変換可能な[`tuple`](../tuple.md)からのコピー代入を行う
- (6) : (5) のプロキシ参照版
- (7) : 変換可能な[`tuple`](../tuple.md)からのムーブ代入を行う
- (8) : (7) のプロキシ参照版
- (9) : 変換可能な[`pair`](/reference/utility/pair.md)からのコピー代入を行う
- (10) : (9) のプロキシ参照版
- (11) : 変換可能な[`pair`](/reference/utility/pair.md)からのムーブ代入を行う
- (12) : (11) のプロキシ参照版
- (13) : [`tuple-like`](../tuple-like.md)なオブジェクトを代入
- (14) : (13) のプロキシ参照版

[プロキシ参照](/reference/iterator/indirectly_writable.md)版とは、[プロキシ参照](/reference/iterator/indirectly_writable.md)である（要素が全て[プロキシ参照](/reference/iterator/indirectly_writable.md)である）[`tuple`](../tuple.md)が持つ各要素について、その要素の参照先へ、他の[`tuple`](../tuple.md)又は[`tuple-like`](../tuple-like.md)なオブジェクトの対応する値を代入する動作を行う版である。

## 要件
`Ti`（`i`は`[0, sizeof...(Types))`を範囲とする）が以下で現れた場合、元の[`tuple`](../tuple.md)のテンプレートパラメーターパックの`i`番目とする。また、`Ui`については、パラメーターの[`tuple`](../tuple.md)についてのテンプレートパラメーターパックの`i`番目とする。

- (1) : 全ての`i`について、[`is_copy_assignable`](/reference/type_traits/is_copy_assignable.md)`<Ti>::value == true`であること
- (2) : C++23 : 全ての`i`について、[`is_copy_assignable_v`](/reference/type_traits/is_copy_assignable.md)`<const Ti> == true`であること
- (3) : 全ての`i`について、[`is_move_assignable`](/reference/type_traits/is_move_assignable.md)`<Ti>::value == true`であること
- (4) : C++23 : 全ての`i`について、[`is_assignable_v`](/reference/type_traits/is_assignable.md)`<const Ti&, Ti> == true`であること
- (5) : 要素数が同じかつ、パラメータの[`tuple`](../tuple.md)の全ての要素型が、元の[`tuple`](../tuple.md)の全ての要素型にコピー代入可能であること
- (6) : C++23 : 要素数が同じかつ、全ての`i`について、[`is_assignable_v`](/reference/type_traits/is_assignable.md)`<const Ti&, const Ui&> == true`であること
- (7) : 要素数が同じかつ、パラメータの[`tuple`](../tuple.md)の全ての要素型が、元の[`tuple`](../tuple.md)の全ての要素型にムーブ代入可能であること
- (8) : C++23 : 要素数が同じかつ、全ての`i`について、[`is_assignable_v`](/reference/type_traits/is_assignable.md)`<const Ti&, Ui> = true`であること
- (9) : 元の[`tuple`](../tuple.md)の要素数が2であり、パラメータの[`pair`](/reference/utility/pair.md)の全ての要素型が元の[`tuple`](../tuple.md)の全ての要素型にコピー代入可能であること
- (10) : C++23 : 元の[`tuple`](../tuple.md)の要素数が2であり、[`is_assignable_v`](/reference/type_traits/is_assignable.md)`<const T0&, U1> &&` [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<const T1&, U2>`であること
- (11) : 元の[`tuple`](../tuple.md)の要素型が2であり、パラメータの[`pair`](/reference/utility/pair.md)の全ての要素型が元の[`tuple`](../tuple.md)の全ての要素型にムーブ代入可能であること
- (12) : C++23 : 元の[`tuple`](../tuple.md)の要素数が2であり、[`is_assignable_v`](/reference/type_traits/is_assignable.md)`<const T0&, U1> &&` [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<const T1&, U2>`であること
- (13) : 要素数が同じかつ、次を全て満たすこと
    - C++23 : [`different-from`](/reference/ranges/different-from.md)`<UTuple, tuple>`
    - C++23 : [`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<UTuple>`が[`ranges::subrange`](/reference/ranges/subrange.md)の特殊化でないこと
    - C++23 : 全ての`i`について、[`is_assignable_v`](/reference/type_traits/is_assignable.md)`<Ti&, decltype(get<i>(`[`std::forward`](/reference/utility/forward.md)`<UTuple>(u)))>`
- (14) : 要素数が同じかつ、次をすべて満たすこと
    - C++23 : [`different-from`](/reference/ranges/different-from.md)`<UTuple, tuple>`
    - C++23 : [`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<UTuple>`が[`ranges::subrange`](/reference/ranges/subrange.md)の特殊化でないこと
    - C++23 : [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<const Ti&, decltype(get<i>(`[`std::forward`](/reference/utility/forward.md)`<UTuple>(u)))>`


## 例外
- (3) : 全ての`i`について、[`is_nothrow_move_assignable`](/reference/type_traits/is_nothrow_move_assignable.md)`<Ti>::value == true`の場合、決して例外を投げない。


## 例
```cpp example
#include <string>
#include <tuple>

int main()
{
  // コピーコンストラクタ
  {
    std::tuple<int, char, std::string> t1(1, 'a', "hello");
    std::tuple<int, char, std::string> t2 = t1;
  }

  // ムーブコンストラクタ
  {
    std::tuple<int, char, std::string> t = std::tuple<int, char, std::string>(1, 'a', "hello");
  }

  // 変換可能なタプルからのコピー構築
  {
    std::tuple<int, char, const char*> t1(1, 'a', "hello");
    std::tuple<int, char, std::string> t2 = t1;
  }

  // 変換可能なタプルからのムーブ構築
  {
    std::tuple<int, char, std::string> t = std::make_tuple(1, 'a', "hello");
  }

  // 変換可能なpairからのコピー構築
  {
    std::pair<int, char> p(1, 'a');
    std::tuple<int, char> t = p;
  }

  // 変換可能なpairからのムーブ構築
  {
    std::tuple<int, char> t = std::make_pair(1, 'a');
  }
}
```

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
- [P2165R4 Compatibility between `tuple`, `pair` and *tuple-like* objects](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2165r4.pdf)
