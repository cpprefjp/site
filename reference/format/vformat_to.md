# vformat_to

* format[meta header]
* function[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class Out>
  Out vformat_to(Out out, string_view fmt, format_args args); // (1)

  template<class Out>
  Out vformat_to(Out out, wstring_view fmt, wformat_args args); // (2)

  template<class Out>
  Out vformat_to(Out out, const locale& loc, string_view fmt, format_args args); // (3)

  template<class Out>
  Out vformat_to(Out out, const locale& loc, wstring_view fmt, wformat_args args); // (4)
}
```
* string_view[link /reference/string_view/basic_string_view.md]
* wstring_view[link /reference/string_view/basic_string_view.md]
* format_args[link /reference/format/basic_format_args.md]
* wformat_args[link /reference/format/basic_format_args.md]
* locale[link /reference/locale/locale.md]

## 概要

書式文字列`fmt`に従ったフォーマットで`args`の文字列表現を出力イテレータ`out`に出力する。

* (1): マルチバイト文字列版
* (2): ワイド文字列版
* (3): マルチバイト文字列版 (ロケール指定あり)
* (4): ワイド文字列版 (ロケール指定あり)

[`format_to`](format_to.md)のフォーマット引数を型消去したバージョンであり、内部的に使用される。文字列をフォーマットする目的で直接利用する必要はない。
ただし、[`format_to`](format_to.md)のような関数を自作する場合は、`vformat_to`を使って実装すると便利である。

## テンプレートパラメータ制約

`Out`は以下の制約を満たす。

* (1),(3): `OutputIterator<const char&>`
* (2),(4): `OutputIterator<const wchar_t&>`

## 事前条件

`out`は以下の制約を満たす型の有効なオブジェクトである。

* (1),(3): `OutputIterator<const char&>`
* (2),(4): `OutputIterator<const wchar_t&>`

## 効果

書式文字列`fmt`に従ったフォーマットで`args`の文字列表現を出力イテレータ`out`の`[out, out + N)`のイテレータ範囲に出力する。ロケール`loc`が指定された場合は、ロケール依存のフォーマットにおいて使用される。
(ただし、`N`=`formatted_size(fmt, args...)` または `formatted_size(loc, fmt, args...)`)

## 戻り値

`out + N` (ただし、`N`=`formatted_size(fmt, args...)` または `formatted_size(loc, fmt, args...)`)

## 例外

書式文字列が正しくなかったり、フォーマット実行時に失敗したりした場合、[`format_error`](format_error.md)を投げる。

## 実装例

```cpp
template<class ParseContext, class FormatContext>
struct ArgVisitor {
  ParseContext& pctx;
  FormatContext& fctx;

  void operator()(std::monostate) {
  }

  using handle = std::basic_format_arg<FormatContext>::handle;
  void operator()(const handle& handle) {
    handle.format(pctx, fctx);
  }

  template<class T>
  void operator()(const T& arg) {
    using Formatter = FormatContext::template formatter_type<T>;
    Formatter formatter;
    pctx.advance_to(formatter.parse(pctx));
    fctx.advance_to(formatter.format(arg, fctx));
  }
};

template<std::output_iterator<char> Out, class Context = std::basic_format_context<Out, char>>
Out vformat_to(Out out, std::string_view fmt, std::basic_format_args<Context> args) {
  using ParseContext = std::basic_format_parse_context<decltype(fmt)::value_type>;
  ParseContext pctx{fmt};
  Context fctx{out, args}; // このコンストラクタの存在は未規定
  ArgVisitor<ParseContext, Context> visitor{pctx, fctx};

  size_t next_arg_index = 0;
  while (!std::ranges::empty(pctx)) {
    auto it = pctx.begin();
    if (*it == '{') {
      ++it;
      if (it == pctx.end()) {
        throw std::format_error("invalid format");
      } else if (*it != '{') {
        // インデックスを解析する
        size_t index;
        if (auto [ptr, ec] = std::from_chars(it, pctx.end(), index); ec == std::errc{}) {
          it += (ptr - std::to_address(it));
          pctx.check_arg_id(index);
        } else {
          index = next_arg_index;
          pctx.next_arg_id();
          ++next_arg_index;
        }
        // オプション開始マークを解析する
        if (it == pctx.end()) {
          throw std::format_error("invalid format");
        } else if (*it == ':') {
          ++it;
        } else if (*it != '}') {
          throw std::format_error("invalid format");
        }
        pctx.advance_to(it);
        // フォーマッターを呼び出す
        std::visit_format_arg(visitor, args.get(index));
        // 置換フィールドの終端を解析する
        if (it == pctx.end() || *it != '}') {
          throw std::format_error("invalid format");
        }
        pctx.advance_to(++it);
        continue;
      }
    } else if (*it == '}') {
      ++it;
      if (it == pctx.end() || *it != '}') {
        throw std::format_error("invalid format");
      }
    }
    *out = *it;
    pctx.advance_to(++it);
    fctx.advance_to(++out);
  }
  return out;
}
```
* pctx.advance_to[link /reference/format/basic_format_parse_context/advance_to.md]
* fctx.advance_to[link /reference/format/basic_format_context/advance_to.md]
* formatter.parse[link /reference/format/formatter/parse.md]
* formatter.format[link /reference/format/formatter/format.md]
* std::format_error[link /reference/format/format_error.md]
* std::basic_format_parse_context[link /reference/format/basic_format_parse_context.md]
* std::basic_format_context[link /reference/format/basic_format_context.md]
* std::basic_format_args[link /reference/format/basic_format_args.md]
* std::visit_format_arg[link /reference/format/visit_format_arg.md]
* std::from_chars[link /reference/charconv/from_chars.md]

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照

* [Working Draft, Standard for Programming Language C++ [format]](https://timsong-cpp.github.io/cppwp/format)
* [P0645R10 Text Formatting](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0645r10.html)
