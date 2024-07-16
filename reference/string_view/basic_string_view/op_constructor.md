# コンストラクタ
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr basic_string_view() noexcept;                        // (1)

constexpr basic_string_view(
            const basic_string_view&) noexcept = default;      // (2)

constexpr basic_string_view(const CharT* str);                 // (3)

basic_string_view(nullptr_t) = delete;                         // (4) C++23

constexpr basic_string_view(const CharT* str, size_type len);  // (5)

template <class It, class End>
constexpr basic_string_view(It begin, End end);                // (6) C++20

template <class R>
constexpr explicit basic_string_view(R&& r);                   // (7) C++23
```

## 概要
- (1) : デフォルトコンストラクタ。空の`basic_string_view`オブジェクトを構築する
- (2) : コピーコンストラクタ。コピー元と同じ文字列を参照する
- (3) : 文字配列を受けとって、その文字配列の全体(ただしヌル文字を含む場合はそこまで)を参照する
- (5) : 文字配列と長さを受けとって、文字配列`str`の先頭`len`文字を参照する
- (6) : 文字のイテレータ範囲`[begin, end)`を参照する
- (7) : 文字のレンジ`R`を参照する


## テンプレートパラメータ制約
- (6) :
    - `It`は[`contiguous_iterator`](/reference/iterator/contiguous_iterator.md)の要件を満たすこと
    - `End`は[`sized_sentinel_for`](/reference/iterator/sized_sentinel_for.md)`<It>`の要件を満たすこと
    - [`is_same_v`](/reference/type_traits/is_same.md)`<`[`iter_value_t`](/reference/iterator/iter_value_t.md)`<It>, charT>`が`true`であること
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<End, size_type>`が`false`であること
- (7) :
    - `R`はコンセプト[`ranges::contiguous_range`](/reference/ranges/contiguous_range.md)および[`ranges::sized_range`](/reference/ranges/sized_range.md)のモデルであること
    - [`is_same_v`](/reference/type_traits/is_same.md)`<`[`ranges::range_value_t`](/reference/ranges/range_value_t.md)`<R>, charT>`が`true`であること
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<R, const charT*>`が`false`であること
    - `d`を[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<R>`型の左辺値としたとき、`d.operator ::std::basic_string_view<charT, traits>()`が妥当な式ではないこと

## 事前条件
- (3) : 範囲`[str, str + Traits::`[`length`](/reference/string/char_traits/length.md)`(str))`が妥当であること (アクセス可能であること)
- (5) : 範囲`[str, str + len)`が妥当であること
- (6) :
    - 範囲`[begin, end)`が妥当であること
    - `It`が[`contiguous_iterator`](/reference/iterator/contiguous_iterator.md)のモデルであること
    - `End`が[`sized_sentinel_for`](/reference/iterator/sized_sentinel_for.md)`<It>`のモデルであること


## 効果
メンバ変数として、参照する文字配列へのポインタを`const CharT* data_`、文字数を`size_type size_`があるものとして、

- (1) : `data_ = nullptr;`および`size_ = 0;`とする
- (3) : `data_ = str;`および`size_ = Traits::`[`length`](/reference/string/char_traits/length.md)`(str);`とする
- (5) : `data_ = str;`および`size_ = len;`とする
- (6) : `data_ =` [`to_address`](/reference/memory/to_address.md)`(begin);`および`size_ = end - begin;`とする
- (7) : `data_ =` [`ranges::data`](/reference/ranges/data.md)`(r);`および`size_ =` [`ranges::size`](/reference/ranges/size.md)`(r);`とする


## 計算量
- (1), (5) : 定数時間
- (3) : 文字数に対して線形時間


## 例外
- (7) : [`ranges::data`](/reference/ranges/data.md)`(r)`および[`ranges::size`](/reference/ranges/size.md)`(r)`が投げた例外


## 備考
- `basic_string_view`のコンストラクタに`template<size_t N>basic_string_view(const charT (&str)[N])`タイプの配列を受け取るコンストラクタが無いのは次の使い方をしたとき`str`のサイズが`sizeof(buf)`となり、それは利用者の意図しない挙動になる可能性が高いと判断されたからである。

```cpp example
char buf[128];
snprintf(buf, sizeof(buf), "abc");
string_view str(buf);
```

- ヌル文字を含む文字列リテラル全体から`basic_string_view`を構築したい場合は[`std::string_view_literals::svリテラル`](op_sv.md)を用いる。


## 例
```cpp example
#include <cassert>
#include <iostream>
#include <string_view>
#include <vector>

int main()
{
  // (1)
  // デフォルト構築
  {
    std::string_view sv;
    assert(sv.data() == nullptr);
    assert(sv.size() == 0);
  }

  // (2)
  // コピーコンストラクタ。コピー元と同じ文字列を参照する
  {
    std::string_view base{"Hello World"};
    std::string_view sv = base;

    std::cout << "(2) : " << sv << std::endl;
  }

  // (3)
  // 文字配列を受けとって参照するコンストラクタ
  {
    std::string_view sv = "Hello World";
    std::cout << "(3) : " << sv << std::endl;
  }

  // (5)
  // 文字配列と文字数を受けとって部分文字列を参照するコンストラクタ
  {
    // "Hello World"の先頭5文字"Hello"を参照
    std::string_view sv{"Hello World", 5};
    std::cout << "(5) : " << sv << std::endl;
  }

  // (6)
  // 文字のイテレータ範囲を受け取って参照するコンストラクタ
  {
    std::string s = "Hello World";
    std::string_view sv{s.begin(), s.begin() + 5};
    std::cout << "(6) : " << sv << std::endl;
  }

  // (7)
  // contiguous_rangeからの構築
  {
    std::vector vec = {'H', 'e', 'l', 'l', 'o', '\0', '!'};
    // 参照するのは入力範囲先頭からそのサイズ（`std::ranges::size()`）分
    std::string_view sv{vec};
    std::cout << "(7) : " << sv << std::endl;

    // explicitのため、このような初期化や暗黙変換は無効
    //std::string_view sv = {vec};
  }
}
```
* sv.data()[link data.md]
* sv.size()[link size.md]
* s.begin()[link /reference/string/basic_string/begin.md]

### 出力
```
(2) : Hello World
(3) : Hello World
(5) : Hello
(6) : Hello
(7) : Hello!
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0 (5以外) [mark verified]
- [GCC](/implementation.md#gcc): 7.1 (5以外) [mark verified], 10.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [ISO/IEC JTC1 SC22 WG21 N3762](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3762.html#avoid-strlen)
- [P1391R4 Range constructor for `std::string_view`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1391r4.pdf)
    - C++20での、イテレータ範囲版コンストラクタ追加
- [P2166R1 A Proposal to Prohibit std::basic_string and std::basic_string_view construction from nullptr.](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2166r1.html)
    - C++23での、`nullptr_t`をとるコンストラクタのdelete宣言追加
- [P1989R2 Range constructor for `std::string_view` 2: Constrain Harder](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1989r2.pdf)
    - C++23での、レンジ版コンストラクタ追加
- [P2499R0 `string_view` range constructor should be `explicit`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2499r0.html)
- [LWG Issue 3857. `basic_string_view` should allow explicit conversion when only traits vary](https://cplusplus.github.io/LWG/issue3857)
