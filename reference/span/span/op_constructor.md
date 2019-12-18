# コンストラクタ
* span[meta header]
* std[meta namespace]
* span[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr span() noexcept;                                             // (1)
constexpr span(pointer ptr, size_type count);                          // (2)
constexpr span(pointer first, pointer last);                           // (3)

template <size_t N>
constexpr span(element_type (&arr)[N]) noexcept;                       // (4)

template <size_t N>
constexpr span(array<value_type, N>& arr) noexcept;                    // (5)

template <size_t N>
constexpr span(const array<value_type, N>& arr) noexcept;              // (6)

template <class Container>
constexpr span(Container& cont);                                       // (7)

template <class Container>
constexpr span(const Container& cont);                                 // (8)

constexpr span(const span& other) noexcept = default;                  // (9)
constexpr span(const span&& other) noexcept = default;                 // (10)

template <class OtherElementType, size_t OtherExtent>
constexpr span(const span<OtherElementType, OtherExtent>& s) noexcept; // (11)
```
* size_t[link /reference/cstddef/size_t.md]
* array[link /reference/array/array.md]

## 概要
`span`オブジェクトを構築する。

- (1) : デフォルトコンストラクタ。空の`span`オブジェクトを構築する
- (2) : 参照範囲として先頭要素を指すポインタと、そこからの要素数を指定して、それらの要素を参照する`span`オブジェクトを構築する
- (3) : 参照範囲として先頭要素を指すポインタと、末尾要素の次を指すポインタを指定して、それらの要素を参照する`span`オブジェクトを構築する
- (4) : 指定された組み込み配列の全体を参照する`span`オブジェクトを構築する
- (5) : 指定された非`const`左辺値参照の[`std::array`](/reference/array/array.md)の全体を参照する`span`オブジェクトを構築する
- (6) : 指定された`const`左辺値参照の[`std::array`](/reference/array/array.md)の全体を参照する`span`オブジェクトを構築する
- (7) : 指定された、非`const`左辺値参照のメモリ連続性をもつコンテナの全体を参照する`span`オブジェクトを構築する
- (8) : 指定された、`const`左辺値参照のメモリ連続性をもつコンテナの全体を参照する`span`オブジェクトを構築する
- (9) : コピーコンストラクタ。`other`と同じ範囲を参照する`span`オブジェクトを構築する
- (10) : ムーブコンストラクタ。`other`と同じ範囲を参照する`span`オブジェクトを構築する。コピーコンストラクタと同じ
- (11) : テンプレートパラメータの異なる`span`オブジェクトを変換する。以下のような変換ができる：
    - 静的な要素数をもつ`span`から動的な要素数をもつ`span`への変換。
    - 動的な要素数をもつ`span`同士の変換
    - `span<T>`から`span<const T>`への変換
    - バイト数が同じ暗黙の型変換が可能な要素型をもつ`span`同士の変換


## テンプレートパラメータ制約
- (1) :
    - `Extent ==` [`dynamic_extent`](/reference/span/dynamic_extent.md) `|| Extent == 0`が`true`であること
        - 値`-1`はオーバーフローによって正の最大値になるので`false`
- (4), (5), (6) :
    - `extent ==` [`dynamic_extent`](/reference/span/dynamic_extent.md) `|| N == extent`が`true`であること
    - [`remove_pointer_t`](/reference/type_traits/remove_pointer.md)`<decltype(`[`data`](/reference/iterator/data.md)`(arr)))>(*)[]`型が`ElementType(*)[]`型に変換可能であること
- (7), (8) :
    - `extent ==` [`dynamic_extent`](/reference/span/dynamic_extent.md)が`true`であること
    - `Container`が`span`型ではないこと
    - `Container`が[`array`](/reference/array/array.md)型ではないこと
    - [`is_array_v`](/reference/type_traits/is_array.md)`<Container>`が`false`であること (`Container`が組み込み配列型ではないこと)
    - 式[`data`](/reference/iterator/data.md)`(cont)`と式[`size`](/reference/iterator/size.md)`(size)`が妥当であること (メモリの連続性をもつコンテナであること)
    - [`remove_pointer_t`](/reference/type_traits/remove_pointer.md)`<decltype(`[`data`](/reference/iterator/data.md)`(arr)))>(*)[]`型が`ElementType(*)[]`型に変換可能であること
- (11) :
    - `Extent ==` [`dynamic_extent`](/reference/span/dynamic_extent.md) `|| Extent == OtherExtent`が`true`であること (受け取り側が[`dynamic_extent`](/reference/span/dynamic_extent.md)を持っていれば任意の`Extent`から変換できる)
    - `OtherElementType(*)[]`型が`ElementType(*)[]`型に変換可能であること


## 事前条件
- (2) :
    - `[ptr, ptr + count)`が妥当な範囲であること
    - メンバ定数`extent`が[`dyanmic_extent`](/reference/span/dynamic_extent.md)と等値ではない場合、`count`と`extent`が等値であること
- (3) :
    - `[first, last)`が妥当な範囲であること
    - メンバ定数`extent`が[`dyanmic_extent`](/reference/span/dynamic_extent.md)と等値ではない場合、`last - first`と`extent`が等値であること
- (7), (8) :
    - `[`[`data`](/reference/iterator/data.md)`(cont),` [`data`](/reference/iterator/data.md)`(cont) +` [`size`](/reference/iterator/size.md)`(cont))`が妥当な範囲であること


## 効果
- (2) : 範囲`[ptr, ptr + count)`を参照する`span`オブジェクトを構築する
- (3) : 範囲`[first, last)`を参照する`span`オブジェクトを構築する
- (4), (5), (6) : 範囲`[`[`data`](/reference/iterator/data.md)`(arr),` [`data`](/reference/iterator/data.md)`(arr) + N)`を参照する`span`オブジェクトを構築する
- (7), (8) : 範囲`[`[`data`](/reference/iterator/data.md)`(cont),` [`data`](/reference/iterator/data.md)`(cont) +` [`size`](/reference/iterator/size.md)`(cont))`を参照する`span`オブジェクトを構築する
- (11) : 範囲`[s.`[`data()`](data.md)`, s.`[`data()`](data.md) `+ s.`[`size()`](size.md)`)`を参照する`span`オブジェクトを構築する


## 事後条件
- (1) : [`size()`](size.md) `== 0 &&` [`data()`](data.md) `== nullptr`
- (2) : [`size()`](size.md) `== count &&` [`data()`](data.md) `== ptr`
- (3) : [`size()`](size.md) `== (last - first) &&` [`data()`](data.md) `== first`
- (4), (5), (6) : [`size()`](size.md) `== N &&` [`data()`](data.md) `==` [`data`](/reference/iterator/data.md)`(arr)`
- (7), (8) : [`size()`](size.md) `==` [`size`](/reference/iterator/size.md)`(cont) &&` [`data()`](data.md) `==` [`data`](/reference/iterator/data.md)`(cont)`
- (11) : [`size()`](size.md) `== s.`[`size()`](size.md) `&&` [`data()`](data.md) `== s.`[`data()`](data.md)


## 例外
- (1), (2), (3), (4), (5), (6) : 投げない
- (7), (8) : コンテナ型によっては、[`data`](/reference/iterator/data.md)`(cont)`と[`size`](/reference/iterator/size.md)`(cont)`の呼び出しがなんらかの例外を送出する可能性がある


## 計算量
- (1)-(11) : 定数時間


## 備考
- (2) : イテレータと要素数の組ではなく、ポインタと要素数の組であることに注意
    - 例として、[`std::vector`](/reference/vector/vector.md)や[`std::array`](/reference/array/array.md)のイテレータが環境・状況によってはポインタとして定義されるかもしれないため、イテレータを指定しても動作する可能性はある。しかし、それでは他の環境では動作しない可能性が高いため、イテレータではなくポインタを指定すること
- (2) : 第2引数の要素数は、(3)とのオーバーロードをあいまいにしないために、[`std::size_t`](/reference/cstddef/size_t.md)型にキャストして渡したほうがよい
    - 例として、整数リテラル`0`はヌルポインタとみなされるため、(2)と(3)があいまいになる。
    ```cpp
    std::vector<int> v = {1, 2, 3, 4, 5};
    //std::span<int, 3> s1{v.data(), 0};  // コンパイルエラー : (2)と(3)があいまい
    std::span<int, 3> s2{v.data(), static_cast<std::size_t>(0)}; // OK
    ```
    * v.data()[link /reference/vector/vector/data.md]

- (3) : イテレータ範囲ではなく、ポインタ範囲であることに注意。(2)と同様に、イテレータを指定してはならない


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
    // 長さ1以上のspanは、参照範囲を設定しなければならない
    //std::span<int, 1> s3{};
  }

  // (2) ポインタと要素数の組を指定
  {
    // vの先頭3要素を参照する。
    // {v.begin(), 3}と書いてはならない
    std::span<int> s{v.data(), 3};
    assert(s.size() == 3);
    assert(s[0] == 1);
    assert(s[1] == 2);
    assert(s[2] == 3);
  }

  // (3) ポインタ範囲を指定
  {
    // vの先頭3要素を参照する。
    // {v.begin(), v.begin() + 3}と書いてはならない
    std::span<int> s{v.data(), v.data() + 3};
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

  // (7) メモリの連続性をもつコンテナを参照させる
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

  // (8) メモリの連続性をもつconstコンテナを参照させる
  {
    const auto& cv = v;
    std::span<const int> s{cv};
    assert(s.size() == cv.size());
    assert(s.data() == cv.data());
  }

  // (9) コピーコンストラクタ
  {
    std::span<int> s1{v};
    std::span<int> s2 = s1;

    // コピー元とコピー先が同じ範囲を参照する
    assert(s1.data() == v.data());
    assert(s2.data() == v.data());
  }

  // (10) ムーブコンストラクタ。コピーと同じ
  {
    std::span<int> s1{v};
    std::span<int> s2 = std::move(s1);

    // ムーブ元とムーブ先が同じ範囲を参照する
    assert(s1.data() == v.data());
    assert(s2.data() == v.data());
  }

  // (11) 変換コンストラクタ
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
- [Clang](/implementation.md#clang): 9.0
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 3198. Bad constraint on `std::span::span()`](https://cplusplus.github.io/LWG/issue3198)
- [P1872R0 `span` should have `size_type`, not `index_type`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1872r0.pdf)
