# basic_format_context

* format[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class Out, class charT>
  class basic_format_context; // (1)

  using format_context = basic_format_context<unspecified, char>; // (2)
  using wformat_context = basic_format_context<unspecified, wchar_t>; // (3)
}
```
* unspecified[italic]

## 概要
実際に渡されたフォーマット引数を含む、フォーマット実行�の状態を保持するクラス。

* (2): マルチバイト文�列版 (出力イテレーターの型は未規定)
* (3): ワイド文�列版 (出力イテレーターの型は未規定)

(2)および(3)では、出力イテレーターは文�列へ文�を追加する`back_insert_iterator`のようなイテレーターが使われる。

## テンプレートパラメータ制約

`Out`は`OutputIterator<const charT&>`であること。

## メンバ関数

| 名前                                 | 説明                                             | 対応バージョン |
|--------------------------------------|--------------------------------------------------|----------------|
| [`arg`](basic_format_context/arg.md) | フォーマット引数を得る                           | C++20          |
| `out`                                | 出力イテレーターを得る                           | C++20          |
| `advance_to`                         | 出力イテレーターを指定したイテレーターに�定する | C++20          |
| `locale`                             | �ケールを得る                                | C++20          |

## メンバ型

| 名前             | 説明                                               | 対応バージョン |
|------------------|----------------------------------------------------|----------------|
| `iterator`       | 出力イテレーター(`Out`と�しい) (type-alias)       | C++20          |
| `char_type`      | 文�の型(`charT`と�しい) (type-alias)             | C++20          |
| `formatter_type` | 型`T`に対応するフォーマッターの型 (alias-template) | C++20          |

## 実装例
```cpp
namespace std {
  template<class Out, class charT>
  class basic_format_context {
    basic_format_args<basic_format_context> args_;
    Out out_;

  public:
    using iterator = Out;
    using char_type = charT;
    template<class T> using formatter_type = formatter<T, charT>;

    basic_format_arg<basic_format_context> arg(size_t id) const
    {
      return args_.get(id);
    }

    std::locale locale();

    iterator out();
    {
      return out_;
    }

    void advance_to(iterator it)
    {
      out_ = it;
    }
  };
```
* basic_format_arg[link /reference/format/basic_format_arg.md]
* basic_format_args[link /reference/format/basic_format_args.md]
* formatter[link /reference/format/formatter.md]

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
