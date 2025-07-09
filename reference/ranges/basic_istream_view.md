# basic_istream_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  // (1)
  template<movable Val, class CharT, class Traits = char_traits<CharT>>
    requires default_initializable<Val> && stream-extractable<Val, CharT, Traits>
  class basic_istream_view : public view_interface<basic_istream_view<Val, CharT, Traits>> { …… };

  // (2)
  template<class Val>
  using istream_view = basic_istream_view<Val, char>;

  // (3)
  template<class Val>
  using wistream_view = basic_istream_view<Val, wchar_t>;

  namespace views {
    // (4)
    template<class T>
    inline constexpr /*unspecified*/ istream = /*unspecified*/;
  }
}
```
* movable[link /reference/concepts/movable.md]
* stream-extractable[italic]

## 概要
- (1): 入力ストリームから`Val`型の値を読み取る[`view`](view.md)
- (2): `basic_istream_view`の、文字の型を`char`とするエイリアス
- (2): `basic_istream_view`の、文字の型を`wchar_t`とするエイリアス
- (4): `basic_istream_view`を生成するカスタマイゼーションポイントオブジェクト

基本的な挙動は[`istream_iterator`](/reference/iterator/istream_iterator.md)と同じで、イテレータが作られるときにストリームから値を1つ読み、インクリメントされるときに次の値を読む。
ただし、`basic_istream_view`の場合、読んだ値はイテレータではなくRangeオブジェクトに保存されている。

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          |       |        | ○    |         |               |               |            |        | ○       | ○   |

## テンプレートパラメータ制約

説明専用コンセプト`stream-extractable`を以下のように定義する。

```cpp
template<class Val, class CharT, class Traits>
concept stream-extractable = requires(basic_istream<CharT, Traits>& is, Val& t) { is >> t; }
```

これを用いて、

- [`movable`](/reference/concepts/movable.md)`<Val>`
- [`default_initializable`](/reference/concepts/default_initializable.md)`<Val>`
- `stream-extractable<Val, CharT, Traits>`

## 効果

- (4): `istream<T>(e)`の効果は、`U`を`std::remove_reference_t<decltype(e)>`とするとき、`basic_istream_view<T, typename U::char_type, typename U::traits_type>(e);`と等しい。

## メンバ関数

| 名前                                                     | 説明                             | 対応バージョン |
|----------------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](basic_istream_view/op_constructor.md)  | コンストラクタ                   | C++20          |
| [`begin`](basic_istream_view/begin.md)                   | ストリームから値を1つ読み、それを指すイテレータを取得する   | C++20          |
| [`end`](basic_istream_view/end.md)                       | 番兵を取得する                   | C++20          |

## 継承しているメンバ関数

| 名前                                         | 説明                              | 対応バージョン |
|----------------------------------------------|------------------------------ ----|----------------|
| [`cbegin`](view_interface/cbegin.md)         | 定数イテレータを取得する          | C++23          |
| [`cend`](view_interface/cend.md)             | 定数イテレータ（番兵）を取得する  | C++23          |


## 例
```cpp example
#include <ranges>
#include <sstream>
#include <iostream>

int main() {
  using namespace std;
  auto iss = istringstream{"1 2 3 4 5"};

  for (int i : views::istream<int>(iss)) {
    cout << i;
  }
}
```
* views::istream[color ff0000]

### 出力
```
12345
```

## 実装例

```cpp
namespace std::ranges {
  template<class Val, class CharT, class Traits>
  concept stream_extractable = requires(basic_istream<CharT, Traits>& is, Val& t) { is >> t; };

  template<movable Val, class CharT, class Traits = char_traits<CharT>>
    requires default_initializable<Val> && stream_extractable<Val, CharT, Traits>
  class basic_istream_view : public view_interface<basic_istream_view<Val, CharT, Traits>> {

  private:
    template<movable Val, class CharT, class Traits>
      requires default_initializable<Val> && stream_extractable<Val, CharT, Traits>
    class iterator {
    public:
      using iterator_concept = input_iterator_tag;
      using difference_type = ptrdiff_t;
      using value_type = Val;

      constexpr explicit iterator(basic_istream_view& parent) noexcept
        : parent_(addressof(parent))
      {}

      iterator(const iterator&) = delete;
      iterator(iterator&&) = default;
      iterator& operator=(const iterator&) = delete;
      iterator& operator=(iterator&&) = default;

      iterator& operator++() {
        *parent_->stream_ >> parent_->value_;
        return *this;
      }

      void operator++(int) {
        ++*this;
      }

      Val& operator*() const {
        return parent_->value_;
      }

      friend bool operator==(const iterator& x, default_sentinel_t) {
        return !*x.parent_->stream_;
      }

    private:
      basic_istream_view* parent_;
    };

  public:
    constexpr explicit basic_istream_view(basic_istream<CharT, Traits>& stream)
      : stream_(addressof(stream))
    {
    }

    constexpr auto begin() {
      *stream_ >> value_;
      return iterator{*this};
    }

    constexpr default_sentinel_t end() const noexcept {
      return default_sentinel;
    }

  private:
    struct iterator;
    basic_istream<CharT, Traits>* stream_;
    Val value_ = Val();
  };
}
```
* movable[link /reference/concepts/movable.md]
* input_iterator_tag[link /reference/iterator/iterator_tag.md]
* basic_istream[link /reference/istream/basic_istream.md]
* char_traits[link /reference/string/char_traits.md]

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 関連項目
- [`istream_iterator`](/reference/iterator/istream_iterator.md): ストリームからデータを読み込む入力イテレータ

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
