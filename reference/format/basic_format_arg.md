# basic_format_arg
* format[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class Context>
  class basic_format_arg {
  public:
    class handle;

  private:
    using char_type = typename Context::char_type;                              // exposition only

    variant<monostate, bool, char_type,
            int, unsigned int, long long int, unsigned long long int,
            float, double, long double,
            const char_type*, basic_string_view<char_type>,
            const void*, handle> value;                                         // exposition only

    template<class T> explicit basic_format_arg(T& v) noexcept;                 // exposition only

  public:
    basic_format_arg() noexcept;

    explicit operator bool() const noexcept;

    template<class Visitor>
      decltype(auto) visit(this basic_format_arg arg, Visitor&& vis);
    template<class R, class Visitor>
      R visit(this basic_format_arg arg, Visitor&& vis);
  };
}
```
* variant[link /reference/variant/variant.md]

## 概要
フォーマット引数1つを保持する型。

デフォルトコンストラクタのみ公開されていて、デフォルトコンストラクタで構築したオブジェクトは無効である。
この型の有効なオブジェクトを直接構築することはできず、[`make_format_args`](make_format_args.md)を使う必要がある。

保持している値へのアクセスは[`visit_format_arg`](visit_format_arg.md)を使う。

このテンプレートを特殊化した場合、プログラムの動作は未定義である。

## メンバ関数
### 構築・破棄

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`(constructor)`](basic_format_arg/op_constructor.md) | コンストラクタ | C++20          |

### 変換演算子

| 名前            | 説明                              | 対応バージョン |
|-----------------|-----------------------------------|----------------|
| [`operator bool`](basic_format_arg/op_bool.md) | `bool`への変換演算子(空の時`false`) | C++20          |

### ビジター

| 名前            | 説明                              | 対応バージョン |
|-----------------|-----------------------------------|----------------|
| [`visit`](basic_format_arg/visit.md) | 現在保持している型に対応する関数を呼び出す | C++26          |


## メンバ型

| 名前                                   | 説明                                         | 対応バージョン |
|----------------------------------------|----------------------------------------------|----------------|
| [`handle`](basic_format_arg/handle.md) | ユーザー定義型のアドレスを保持する型 (class) | C++20          |

## 非メンバ関数

| 名前                                      | 説明                                                                                             | 対応バージョン |
|-------------------------------------------|--------------------------------------------------------------------------------------------------|----------------|
| [`make_format_args`](make_format_args.md) | `basic_format_arg`の列を構築する (function template)                                             | C++20          |
| [`visit_format_arg`](visit_format_arg.md) | `basic_format_arg`オブジェクトが現在保持している型に対応する関数を呼び出す (function template)   | C++20<br/> C++26から非推奨          |

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
