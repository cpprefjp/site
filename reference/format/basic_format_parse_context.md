# basic_format_parse_context

* format[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class charT>
  class basic_format_parse_context; // (1)

  using format_parse_context = basic_format_parse_context<char>; // (2)
  using wformat_parse_context = basic_format_parse_context<wchar_t>; // (3)
}
```

## 概要
書式文�列の解析�の状態を保持するクラス。

* (2): マルチバイト文�列版
* (3): ワイド文�列版

このクラスのオブジェクトはコピーできない。

## メンバ関数

| 名前            | 説明                                               | 対応バージョン |
|-----------------|----------------------------------------------------|----------------|
| `(constructor)` | コンストラクタ                                     | C++20          |
| `begin`         | 書式文�列の先�のイテレーターを得る               | C++20          |
| `end`           | 書式文�列の末尾のイテレーターを得る               | C++20          |
| `advance_to`    | 先�のイテレーターを指定したイテレーターに�定する | C++20          |
| `next_arg_id`   | フォーマット引数の番号を次に進める                 | C++20          |
| `check_arg_id`  | フォーマット引数の番号指定が有効か確かめる         | C++20          |

## メンバ型

| 名前             | 説明                                                                                          | 対応バージョン |
|------------------|-----------------------------------------------------------------------------------------------|----------------|
| `char_type`      | 文�の型(`charT`と�しい) (type-alias)                                                        | C++20          |
| `const_iterator` | 書式文�列のイテレーターの型(`basic_string_view<charT>::const_iterator`と�しい) (type-alias) | C++20          |
| `iterator`       | 書式文�列のイテレーターの型(`basic_string_view<charT>::iterator`と�しい) (type-alias)       | C++20          |

## 実装例
```cpp
namespace std {
  template<class charT>
  class basic_format_parse_context {
  public:
    using char_type = charT;
    using const_iterator = typename basic_string_view<charT>::const_iterator;
    using iterator = const_iterator;

  private:
    iterator begin_;
    iterator end_;
    enum indexing { unknown, manual, automatic };
    indexing indexing_ = unknown;
    size_t next_arg_id_ = 0;
    size_t num_args_;

  public:
    explicit constexpr basic_format_parse_context(basic_string_view<charT> fmt, size_t num_args = 0) noexcept
      :begin_(fmt.begin())
      ,end_(fmt.end())
      ,num_args_(num_args)
    {}

    basic_format_parse_context(const basic_format_parse_context&) = delete;
    basic_format_parse_context& operator=(const basic_format_parse_context&) = delete;

    constexpr const_iterator begin() const noexcept
    {
      return begin_;
    }

    constexpr const_iterator end() const noexcept
    {
      return end_;
    }

    constexpr void advance_to(const_iterator it)
    {
      begin_ = it;
    }

    constexpr size_t next_arg_id()
    {
      if (indexing_ != manual) {
        if (indexing_ == unknown) {
          indexing_ = automatic;
        }
        return next_arg_id_++;
      } else {
        throw format_error("mixing of automatic and manual argument indexing");
      }
    }

    constexpr void check_arg_id(size_t id)
    {
      if (indexing_ != automatic) {
        if (indexing_ == unknown) {
          indexing_ = manual;
        }
      } else {
        throw format_error("mixing of automatic and manual argument indexing");
      }
    }
  };
}
```
* basic_string_view[link /reference/string_view/basic_string_view.md]
* format_error[link /reference/string_view/basic_string_view.md]

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照

* [P0645R10 Text Formatting](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0645r10.html)
