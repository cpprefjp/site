# operator=
* utility[meta header]
* std[meta namespace]
* pair[meta class]
* function[meta id-type]

```cpp
pair& operator=(const pair& p);                             // (1) C++03
constexpr pair& operator=(const pair& p);                   // (1) C++20

constexpr const pair& operator=(const pair& p) const;       // (2) C++23

template <class U, class V>
  pair& operator=(const pair<U, V>& p);                     // (3) C++03
template <class U, class V>
  constexpr pair& operator=(const pair<U, V>& p);           // (3) C++20

template<class U, class V>
constexpr const pair& operator=(const pair<U, V>& p) const; // (4) C++23

pair& operator=(pair&& p) noexcept(see below);              // (5) C++11
constexpr pair& operator=(pair&& p) noexcept(see below);    // (5) C++20

constexpr const pair& operator=(pair&& p) const;            // (6) C++23

template <class U, class V>
  pair& operator=(pair<U, V>&& p);                          // (7) C++11
template <class U, class V>
  constexpr pair& operator=(pair<U, V>&& p);                // (7) C++20

template<class U, class V>
  constexpr const pair& operator=(pair<U, V>&& p) const;    // (8) C++23

template<pair-like P>
  constexpr pair& operator=(P&& p);                         // (9) C++23
template<pair-like P>
  constexpr const pair& operator=(P&& p) const;             // (10) C++23
```
* pair-like[link /reference/tuple/pair-like.md]

## 概要
- (1) : 同じ型の[`pair`](../pair.md)をコピー代入する
- (2) : (1) のプロキシ参照版
- (3) : 変換可能な[`pair`](../pair.md)をコピー代入する
- (4) : (3) のプロキシ参照版
- (5) : 同じ型の[`pair`](../pair.md)をムーブ代入する
- (6) : (5) のプロキシ参照版
- (7) : 変換可能な[`pair`](../pair.md)をムーブ代入する
- (8) : (6) のプロキシ参照版
- (9) : [`pair-like`](/reference/tuple/pair-like.md)なオブジェクトを代入
- (10) : (9) のプロキシ参照版

[プロキシ参照](/reference/iterator/indirectly_writable.md)版とは、[プロキシ参照](/reference/iterator/indirectly_writable.md)である（要素がどちらも[プロキシ参照](/reference/iterator/indirectly_writable.md)である）[`pair`](../pair.md)が持つ各要素について、その要素の参照先へ、他の[`pair`](../pair.md)又は[`pair-like`](/reference/tuple/pair-like.md)なオブジェクトの対応する値を代入する動作を行う版である。


## 要件
- (1) : [`is_copy_assignable`](/reference/type_traits/is_copy_assignable.md)`<T1>::value &&` [`is_copy_assignable`](/reference/type_traits/is_copy_assignable.md)`<T2>::value`であること
- (2) : C++23 : [`is_copy_assignable_v`](/reference/type_traits/is_copy_assignable.md)`<const T1> &&` [`is_copy_assignable_v`](/reference/type_traits/is_copy_assignable.md)`<const T2>`であること
- (3) : [`is_assignable`](/reference/type_traits/is_assignable.md)`<T1&, const U&>::value &&` [`is_assignable`](/reference/type_traits/is_assignable.md)`<T2&, const V&>::value`であること
- (4) : C++23 : [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<const T1&, const U&> &&` [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<const T2&, const V&>`であること
- (5) : [`is_move_assignable`](/reference/type_traits/is_move_assignable.md)`<T1>::value &&` [`is_move_assignable`](/reference/type_traits/is_move_assignable.md)`<T2>::value`であること
- (6) : C++23 : [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<const T1&, T1> &&` [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<const T2&, T2>`であること
- (7) : [`is_assignable`](/reference/type_traits/is_assignable.md)`<T1&, U>::value &&` [`is_assignable`](/reference/type_traits/is_assignable.md)`<T2&, V>::value`であること
- (8) : C++23 : [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<const T1&, U> &&` [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<const T2&, V>`であること
- (9) : 次を全て満たすこと
    - C++23 : [`different-from`](/reference/ranges/different-from.md)`<P, pair>`
    - C++23 : [`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<P>`が[`ranges::subrange`](/reference/ranges/subrange.md)の特殊化でないこと
    - C++23 : [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<T1&, decltype(get<0>(`[`std::forward`](/reference/utility/forward.md)`<P>(p)))>`
    - C++23 : [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<T2&, decltype(get<1>(`[`std::forward`](/reference/utility/forward.md)`<P>(p)))>`
- (10) : 次を全て満たすこと
    - C++23 : [`different-from`](/reference/ranges/different-from.md)`<P, pair>`
    - C++23 : [`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<P>`が[`ranges::subrange`](/reference/ranges/subrange.md)の特殊化でないこと
    - C++23 : [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<const T1&, decltype(get<0>(`[`std::forward`](/reference/utility/forward.md)`<P>(p)))>`
    - C++23 : [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<const T2&, decltype(get<1>(`[`std::forward`](/reference/utility/forward.md)`<P>(p)))>`


## 効果
- (1), (2), (3), (4) : `p.first`を`this->first`に、`p.second`を`this->second`にコピー代入する
- (5), (6), (7), (8) : `p.first`を`this->first`に、`p.second`を`this->second`にムーブ代入する
- (9), (10) : `get<0>(p)`を`p.first`に、`get<1>(p)`を`p.second`に代入する


## 戻り値
`*this`


## 例外
- (5) : [`is_nothrow_move_assignable`](/reference/type_traits/is_nothrow_move_assignable.md)`<T1>::value &&` [`is_nothrow_move_assignable`](/reference/type_traits/is_nothrow_move_assignable.md)`<T2>::value`である場合、この関数は例外を決して投げない


## 例
```cpp example
#include <iostream>
#include <utility>
#include <string>

template <class T1, class T2>
void print(const std::string& name, const std::pair<T1, T2>& p)
{
  std::cout << name << " : (" << p.first << "," << p.second << ")" << std::endl;
}

int main()
{
  // コピー代入
  {
    std::pair<int, std::string> p(1, "abc");
    std::pair<int, std::string> p1;
    p1 = p;
    print("p1", p1);
  }

  // 変換可能なpairのコピー代入
  {
    std::pair<int, const char*> p(1, "abc");
    std::pair<int, std::string> p2;
    p2 = p;
    print("p2", p2);
  }

  // ムーブ代入
  {
    std::pair<int, std::string> p(1, "abc");
    std::pair<int, std::string> p3;
    p3 = std::move(p);
    print("p3", p3);
  }

  // 変換可能なpairのムーブ代入
  {
    std::pair<int, const char*> p(1, "abc");
    std::pair<int, std::string> p4;
    p4 = std::move(p);
    print("p4", p4);
  }
}
```
* std::move[link /reference/utility/move.md]

### 出力
```
p1 : (1,abc)
p2 : (1,abc)
p3 : (1,abc)
p4 : (1,abc)
```

## バージョン
### 言語
- C++11 : (5), (7)

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]
	- (1), (3)はそれより前から実装されている。

## 参照
- [P1032R1 Misc constexpr bits](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1032r1.html)
