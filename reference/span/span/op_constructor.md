# コンストラクタ
* span[meta header]
* std[meta namespace]
* span[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr span() noexcept;                                             // (1)

template<class It>
constexpr span(It first, size_type count);                             // (2)

template<class It, class End>
constexpr span(It first, End last);                                    // (3)

template <size_t N>
constexpr span(element_type (&arr)[N]) noexcept;                       // (4)

template <size_t N>
constexpr span(array<value_type, N>& arr) noexcept;                    // (5)

template <size_t N>
constexpr span(const array<value_type, N>& arr) noexcept;              // (6)

template<class R>
constexpr span(R&& r);                                                 // (7)

constexpr span(const span& other) noexcept = default;                  // (8)

template <class OtherElementType, size_t OtherExtent>
constexpr span(const span<OtherElementType, OtherExtent>& s) noexcept; // (9)
```
* size_t[link /reference/cstddef/size_t.md]
* array[link /reference/array/array.md]

## 概要
`span`オブジェクトを構築する。

- (1) : デフォルトコンストラクタ。空の`span`オブジェクトを構築する
- (2) : 参照範囲として先�要素を指すイテレータと、そこからの要素数を指定して、それらの要素を参照する`span`オブジェクトを構築する
- (3) : 参照範囲として先�要素を指すイテレータと、末尾要素の次を指すイテレータを指定して、それらの要素を参照する`span`オブジェクトを構築する
- (4) : 指定された組み込み配列の全体を参照する`span`オブジェクトを構築する
- (5) : 指定された非`const`左辺値参照の[`std::array`](/reference/array/array.md)の全体を参照する`span`オブジェクトを構築する
- (6) : 指定された`const`左辺値参照の[`std::array`](/reference/array/array.md)の全体を参照する`span`オブジェクトを構築する
- (7) : 指定された、メモリ連続性をもつイテレータを持つオブジェクトの要素全体を参照する`span`オブジェクトを構築する
- (8) : コピーコンストラクタ。`other`と同じ範囲を参照する`span`オブジェクトを構築する
- (9) : テンプレートパラメータの異なる`span`オブジェクトを変換する。以下のような変換ができる：
    - 静的な要素数をもつ`span`から動的な要素数をもつ`span`への変換。
    - 動的な要素数をもつ`span`同士の変換
    - `span<T>`から`span<const T>`への変換
    - バイト数が同じ暗黙の型変換が可能な要素型をもつ`span`同士の変換


## テンプレートパラメータ制約
- (1) :
    - `Extent ==` [`dynamic_extent`](/reference/span/dynamic_extent.md) `|| Extent == 0`が`true`であること
        - 値`-1`はオーバーフ�ーによって�の最大値になるので`false`
- (2) :
    - 型 `U` を `std::remove_reference_t<std::iter_reference_t<It>>`とするとき
        - 型 `It` はコンセプト `std::contiguous_iterator` を満たしていること
        - `std::is_convertible_v<U(*)[], element_type(*)[]>` が `true` であること。(その意図は、イテレータ参照型から `element_type` への `qualification conversions`のみを許可することである。)
- (3) :
    - 型 `U` を `std::remove_reference_t<std::iter_reference_t<It>>`とするとき
        - 型 `It` はコンセプト `std::contiguous_iterator` を満たしていること
        - `std::is_convertible_v<U(*)[], element_type(*)[]>` が `true` であること。(その意図は、イテレータ参照型から `element_type` への `qualification conversions`のみを許可することである。)
        - 型 `End` はコンセプト `std::sized_sentinel_for<It>` を満たしていること
        - `std::is_convertible_v<End, size_t>` が `false`であること
- (4), (5), (6) :
    - `extent ==` [`dynamic_extent`](/reference/span/dynamic_extent.md) `|| N == extent`が`true`であること
    - [`remove_pointer_t`](/reference/type_traits/remove_pointer.md)`<decltype(`[`data`](/reference/iterator/data.md)`(arr)))>(*)[]`型が`ElementType(*)[]`型に変換可能であること
- (7) :
    - 型 `U` を `std::remove_reference_t<std::iter_reference_t<R>>`とするとき
        - `extent ==` [`dynamic_extent`](/reference/span/dynamic_extent.md)が`true`であること
        - 型 `R` はコンセプト `std::ranges::contiguous_range` 及び `std::ranges::sized_range` を満たしていること
        - 型 `R` がコンセプト `std::ranges::safe_range` を満たすか、`std::is_const_v<element_type>` が`true`であること
        - `std::remove_cvref_t<R>`が`std::span`の特殊化ではないこと
        - `std::remove_cvref_t<R>`が`std::array`の特殊化ではないこと
        - `std::is_array_v<std::remove_cvref_t<R>>` が `false` であること
        - `std::is_convertible_v<U(*)[], element_type(*)[]>` が `true` であること。(その意図は、イテレータ参照型から `element_type` への `qualification conversions`のみを許可することである。)
- (9) :
    - `Extent ==` [`dynamic_extent`](/reference/span/dynamic_extent.md) `|| Extent == OtherExtent`が`true`であること (受け取り側が[`dynamic_extent`](/reference/span/dynamic_extent.md)を持っていれば任意の`Extent`から変換できる)
    - `OtherElementType(*)[]`型が`ElementType(*)[]`型に変換可能であること


## 事前条件
- (2) :
    - `[first, first + count)`が妥当な範囲であること
    - 型 `It` はコンセプト `std::contiguous_iterator` のモデルであること
    - メンバ定数`extent`が[`dyanmic_extent`](/reference/span/dynamic_extent.md)と�値ではない場合、`count`と`extent`が�値であること
- (3) :
    - `[first, last)`が妥当な範囲であること
    - メンバ定数`extent`が[`dyanmic_extent`](/reference/span/dynamic_extent.md)と�値ではない場合、`last - first`と`extent`が�値であること
    - 型 `It` はコンセプト `std::contiguous_iterator` のモデルであること
    - 型 `End` はコンセプト `std::sized_sentinel_for<It>` のモデルであること
- (7) :
    - 型 `R` はコンセプト `std::ranges::contiguous_range` 及び `std::ranges::sized_range` のモデルであること
    - `std::is_const_v<element_type>` が `false`であるとき、型 `R` は `std::ranges::safe_range` のモデルであること


## 効果
- (2) : 範囲`[first, first + count)`を参照する`span`オブジェクトを構築する
- (3) : 範囲`[first, last)`を参照する`span`オブジェクトを構築する
- (4), (5), (6) : 範囲`[`[`data`](/reference/iterator/data.md)`(arr),` [`data`](/reference/iterator/data.md)`(arr) + N)`を参照する`span`オブジェクトを構築する
- (7) : 範囲`[std::ranges::data(r), std::ranges::data(r) + std::ranges::size(r))`を参照する`span`オブジェクトを構築する
- (9) : 範囲`[s.`[`data()`](data.md)`, s.`[`data()`](data.md) `+ s.`[`size()`](size.md)`)`を参照する`span`オブジェクトを構築する


## 事後条件
- (1) : [`size()`](size.md) `== 0 &&` [`data()`](data.md) `== nullptr`
- (4), (5), (6) : [`size()`](size.md) `== N &&` [`data()`](data.md) `==` [`data`](/reference/iterator/data.md)`(arr)`
- (8) : [`size()`](size.md) `==` [`size`](/reference/iterator/size.md)`(cont) &&` [`data()`](data.md) `==` [`data`](/reference/iterator/data.md)`(cont)`
- (9) : [`size()`](size.md) `== s.`[`size()`](size.md) `&&` [`data()`](data.md) `== s.`[`data()`](data.md)


## 例外
- (1), (2), (3), (4), (5), (6) : 投げない
- (7) : コンテナ型によっては、`std::ranges::data(r)`と`std::ranges::size(r)`の呼び出しがなんらかの例外を送出する可能性がある


## 計算量
- (1)-(9) : 定数時間


## 例
```cpp example
#include <cassert>
#include <span>
#include <vector>
#include <array>
#include <string>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  // (1) デフォルトコンストラクタ
  {
    // 長さ0の参照範囲をもつspanオブジェクト
    std::span<int, 0> s1;
    assert(s1.empty());

    // 動的な要素数をもつspanオブジェクト
    std::span<int> s2;
    assert(s2.empty());

    // 以下はコンパイルエラーになる。
    // 長さ1以上のspanは、参照範囲を�定しなければならない
    // std::span<int, 1> s3{};
  }

  // (2) イテレータと要素数の組を指定
  {
    // vの先�3要素を参照する。
    std::span<int> s{v.begin(), 3};
    assert(s.size() == 3);
    assert(s[0] == 1);
    assert(s[1] == 2);
    assert(s[2] == 3);
  }

  // (3) 範囲を指定
  {
    std::span<int> s{v.begin(), v.begin() + 3};
    assert(s.size() == 3);
    assert(s[0] == 1);
    assert(s[1] == 2);
    assert(s[2] == 3);
  }

  // (4) 組み込み配列への参照を指定
  {
    int ar[] = {1, 2, 3, 4, 5};
    std::span<int> s{ar};
    assert(s.size() == 5);
    assert(s.data() == ar); // 元の配列をコピーせず、参照している
  }

  // (5) std::arrayオブジェクトへの参照を指定
  {
    std::array ar = {1, 2, 3, 4, 5};
    std::span<int> s{ar};
    assert(s.size() == ar.size());
    assert(s.data() == ar.data());
  }

  // (6) const std::arrayオブジェクトへの参照を指定
  {
    std::array ar = {1, 2, 3, 4, 5};
    const auto& car = ar;
    std::span<const int> s{car};

    assert(s.size() == car.size());
    assert(s.data() == car.data());
  }

  // (7) メモリの連続性をもつイテレータをもつオブジェクトの要素全体を参照させる
  {
    std::span<int> s1{v};
    assert(s1.size() == v.size());
    assert(s1.data() == v.data());

    // std::string_viewの代わり
    std::string str = "Hello";
    std::span<char> s2{str};
    assert(s2.size() == str.size());
    assert(s2.data() == str.data());
  }

  // (8) コピーコンストラクタ
  {
    std::span<int> s1{v};
    std::span<int> s2 = s1;

    // コピー元とコピー先が同じ範囲を参照する
    assert(s1.data() == v.data());
    assert(s2.data() == v.data());
  }

  // (9) 変換コンストラクタ
  {
    int ar[] = {1, 2, 3};

    std::span<int, 3> s1{ar};
    std::span<int> s2 = s1;
    std::span<int> s3 = s2.first(2);
    std::span<const int> s4 = s3;

    assert(s4.size() == 2);
    assert(s4.data() == ar);
  }
}
```
* s1.empty()[link empty.md]
* s2.empty()[link empty.md]
* s.size()[link size.md]
* s.data()[link data.md]
* s1.size()[link size.md]
* s1.data()[link data.md]
* s2.size()[link size.md]
* s2.data()[link data.md]
* s2.first[link first.md]
* s4.size()[link size.md]
* s4.data()[link data.md]
* v.size()[link /reference/vector/vector/size.md]
* v.data()[link /reference/vector/vector/data.md]
* cv.size()[link /reference/vector/vector/size.md]
* cv.data()[link /reference/vector/vector/data.md]
* ar.size()[link /reference/array/array/size.md]
* ar.data()[link /reference/array/array/data.md]
* car.size()[link /reference/array/array/size.md]
* car.data()[link /reference/array/array/data.md]
* str.size()[link /reference/string/basic_string/size.md]
* str.data()[link /reference/string/basic_string/data.md]
* std::move[link /reference/utility/move.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): (10.0.0 現在、実装は P1394R4 以前の不完全なものである)
- [GCC](/implementation.md#gcc): 10.0.1
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 3101. `span`'s Container constructors need another constraint](https://wg21.cmeerw.net/lwg/issue3101)
- [LWG Issue 3198. Bad constraint on `std::span::span()`](https://cplusplus.github.io/LWG/issue3198)
- [P1872R0 `span` should have `size_type`, not `index_type`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1872r0.pdf)
- [P1394R4 Range constructor forstd::span](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1394r4.pdf)
