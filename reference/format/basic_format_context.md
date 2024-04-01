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
実際に渡されたフォーマット引数を含む、フォーマット実行中の状態を保持するクラス。

- (1): テンプレートの定義
- (2): マルチバイト文字列版の別名 (出力イテレータの型は未規定)
- (3): ワイド文字列版の別名 (出力イテレータの型は未規定)

## テンプレートパラメータ制約
- `Out`は`OutputIterator<const charT&>`であること

## 備考

出力イテレータの型はフォーマット関数に指定したイテレータである必要はない。内部でバッファリングを行う実装が可能である。

## メンバ関数

| 名前                                 | 説明                                         | 対応バージョン |
|--------------------------------------|----------------------------------------------|----------------|
| [`arg`](basic_format_context/arg.md) | フォーマット引数を取得する                   | C++20          |
| [`out`](basic_format_context/out.md) | 出力イテレータを取得する                     | C++20          |
| [`advance_to`](basic_format_context/advance_to.md) | 出力イテレータを指定したイテレータに設定する | C++20          |
| [`locale`](basic_format_context/locale.md) | ロケールを取得する                     | C++20          |

## メンバ型

| 名前             | 説明                                               | 対応バージョン |
|------------------|----------------------------------------------------|----------------|
| `iterator`       | 出力イテレータ(`Out`と等しい) (type-alias)         | C++20          |
| `char_type`      | 文字の型(`charT`と等しい) (type-alias)             | C++20          |
| `formatter_type` | 型`T`に対応するフォーマッターの型 (alias-template) | C++20          |

## 実装例
```cpp
namespace std {
  template<class Out, class charT>
  class basic_format_context {
    basic_format_args<basic_format_context> args_;
    Out out_;
    std::optional<std::locale> locale;

  public:
    using iterator = Out;
    using char_type = charT;
    template<class T> using formatter_type = formatter<T, charT>;

    basic_format_context(iterator out, std::basic_format_args<basic_format_context> args, std::optional<std::locale> locale = std::nullopt)
      :args_(args)
      ,out_(out)
      ,locale_(locale)
    {
    }

    basic_format_arg<basic_format_context> arg(size_t id) const {
      return args_.get(id);
    }

    std::locale locale() {
      return locale_.value_or(std::locale());
    }

    iterator out() {
      return out_;
    }

    void advance_to(iterator it) {
      out_ = it;
    }
  };
}
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
