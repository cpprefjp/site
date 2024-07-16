# formatter

* format[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T, class charT = char>
  struct formatter;                                          // (1) C++20

  template <ranges::input_range R, class charT>
    requires (format_kind<R> != range_format::disabled) &&
             formattable<ranges::range_reference_t<R>, charT>
  struct formatter<R, charT>
    : range-default-formatter<format_kind<R>, R, charT> { }; // (2) C++23

  template <class charT, formattable<charT>... Ts>
  struct formatter<pair-or-tuple<Ts...>, charT>;             // (3) C++23

  template <class charT,
            class T,
            formattable<charT> Container,
            class... U>
  struct formatter<adaptor-type<T, Container, U...>, charT>; // (4) C++23
}
```
* ranges::input_range[link /reference/ranges/input_range.md]
* format_kind[link format_kind.md]
* range_format[link range_format.md]
* formattable[link formattable.md]
* ranges::range_reference_t[link /reference/ranges/range_reference_t.md]
* range-default-formatter[link range-default-formatter.md]

## 概要
フォーマット引数の個々の型に対応する書式文字列の解析と値のフォーマットを担うクラス。

- (1) : デフォルトのフォーマット
- (2) : Range用のフォーマット。実装は[`range-default-formatter`](range-default-formatter.md)クラスが行う
- (3) : [`std::pair`](/reference/utility/pair.md)と[`std::tuple`](/reference/tuple/tuple.md)に対する特殊化
- (4) : コンテナアダプタである[`std::queue`](/reference/queue/queue.md)、[`std::priority_queue`](/reference/queue/priority_queue.md)、[`std::stack`](/reference/stack/stack.md)に対する特殊化


(1)は、`charT`を`char`または`wchar_t`とすると、標準で以下の特殊化が利用できる。

- `template<> struct formatter<charT, charT>`
- `template<> struct formatter<char, wchar_t>`
- `template<> struct formatter<charT*, charT>`
- `template<> struct formatter<const charT*, charT>`
- `template<size_t N> struct formatter<const charT[N], charT>`
- `template<class traits, class Allocator> struct formatter<`[`basic_string`](/reference/string/basic_string.md)`<charT, traits, Allocator>, charT>`
- `template<class traits> struct formatter<`[`basic_string_view`](/reference/string_view/basic_string_view.md)`<charT, traits>, charT>`
- 第1テンプレート引数が`nullptr_t`, `void*`, `const void*`, `bool`, すべてのCV修飾されない標準の整数型, 拡張整数型, 浮動小数点数型であり、第2テンプレート引数が`charT`であるもの。

さらに、ユーザーが`formatter`を特殊化した場合、それも有効である。

標準でもユーザー定義でも特殊化されない場合、その型に対する`formatter`は無効であり、そのような型はフォーマット関数の引数にできない。

ワイド文字列とマルチバイト文字列を相互に変換するような特殊化は意図的に用意されていないが、ユーザーが用意することは禁止していない。

## ユーザーの型で`formatter`を特殊化する場合の要件

`formatter`の有効な特殊化はFormatter要件を満たす必要がある。

型`F`がFormatter要件を満たすとは、次のことをいう。

- `F`は`Cpp17DefaultConstructible`、`Cpp17CopyConstructible`、`Cpp17CopyAssignable`、`Cpp17Destructible`であること

さらに、以下の条件を満たすこと

1. 式 `f.parse(pc)` が有効であり、
    - 戻り値の型が`PC::iterator`である
    - イテレータ範囲`[pc.begin(), pc.end())`を解析して`format_error`を投げるか、解析が終わった位置を指すイテレータを返す
2. 式 `cf.format(t, fc)` が有効であり、
    - 戻り値の型が`FC::iterator`である
    - フォーマット結果を`fc.out()`へ出力し、出力後のイテレータを返す
    - 出力は`t`、`fc.locale()`、最後に呼び出された`f.parse(pc)`のイテレータ範囲`[pc.begin(), pc.end())`以外に依存しない
3. 式 `cf.format(u, fc)` が有効であり、
    - 戻り値が`FC::iterator`である
    - フォーマット結果を`fc.out()`へ出力し、出力後のイテレータを返す
    - 出力は`u`、`fc.locale()`、最後に呼び出された`f.parse(pc)`のイテレータ範囲`[pc.begin(), pc.end())`以外に依存しない
    - `u`を変更しない

条件内の各要素を、以下のように定義する。

- 文字の型を`charT`
- 出力イテレータの型を`Out`
- フォーマット引数の型を`T`
- `f`を`F`のオブジェクト
- `cf`を`F`の`const`オブジェクト
- `u`を`T`のlvalue
- `t`を`T`または`const T`へ変換できる型のオブジェクト
- `PC`を[`basic_format_parse_context`](basic_format_parse_context.md)`<charT>`
- `FC`を[`basic_format_context`](basic_format_context.md)`<Out, charT>`
- `pc`を`PC`のlvalue
- `fc`を`FC`のlvalue

ただし、[`parse`](formatter/parse.md)の呼び出し前の状態で、`pc.begin()`は書式文字列中の対応する置換フィールドのオプションの先頭を指す。

- オプションが空でなければ、`*pc.begin()`は`:`の次の文字
- オプションが空なら、`pc.begin() == pc.end()`または`*pc.begin() == '}'`である

[`std::formattable`](/reference/format/formattable.md)コンセプトも参照。

フォーマッターは、書式文字列中に置換フィールドが見つかるたびに次のコードと近い形で呼び出される。

```cpp
typename FC::template formatter_type<T> f;
pc.advance_to(f.parse(pc));      // オプションを解析し状態を保存する
fc.advance_to(f.format(u, fc));  // 状態をもとにフォーマットを行う
```
* pc.advance_to[link /reference/format/basic_format_parse_context/advance_to.md]
* fc.advance_to[link /reference/format/basic_format_context/advance_to.md]
* f.parse[link formatter/parse.md]
* f.format[link formatter/format.md]

[handle](/reference/format/basic_format_arg/handle.md)も参照。

## メンバ関数

| メンバ関数 | 説明 | 対応バージョン |
|------------|------|----------------|
| [`parse`](formatter/parse.md)   | 書式の解析を行う | C++20 |
| [`format`](formatter/format.md) | 書式化を行う | C++20 |


### 文字・文字列に対する特殊化

| メンバ関数 | 説明 | 対応バージョン |
|------------|------|----------------|
| [`set_debug_format`](formatter/set_debug_format.md) | デバッグ出力を有効にする | C++23 |


### pair / tuple向けの特殊化

| メンバ関数 | 説明 | 対応バージョン |
|------------|------|----------------|
| [`set_separator`](formatter/set_separator.md) | 要素の区切り文字を設定する | C++23 |
| [`set_brackets`](formatter/set_brackets.md)   | 全体の囲み文字を設定する | C++23 |


## 例
### オリジナル書式なし、型変換のみの場合
```cpp example
#include <iostream>
#include <format>

enum color { red, green, blue };

const char* color_names[] = { "red", "green", "blue" };

template<>
struct std::formatter<color> : std::formatter<const char*> {
  auto format(color c, std::format_context& ctx) const {
    return std::formatter<const char*>::format(color_names[c], ctx);
  }
};

int main()
{
  std::cout << std::format("{}", red) << std::endl;
}
```
* std::format_context[link basic_format_context.md]
* std::format[link format.md]

#### 出力
```
red
```

### オリジナル書式を定義する例
```cpp example
#include <iostream>
#include <format>

enum color { red, green, blue };

const char* color_names[] = { "red", "green", "blue" };
const char* jp_color_names[] = { "赤", "緑", "青" };

template<>
struct std::formatter<color> {
  bool is_jp = false;

  // コンパイル時の書式文字列の解析があるため、
  // constexprにする必要がある。
  // この関数に渡されるパラメータは、{:%j}の%以降。
  // 解析がおわった場所を指すイテレータを返す。
  constexpr auto parse(std::format_parse_context& ctx) {
    auto it = ctx.begin();
    if (*it == '%') {
      ++it;
      if (*it == 'j') {
        is_jp = true;
      }
      else if (*it == 'e') {
        is_jp = false;
      }
      ++it;
    }
    return it;
  }

  // format()関数は書式の情報をもたない。
  // parse()関数で解析した書式をメンバ変数で保持しておいて、
  // それをもとに書式化する
  auto format(color c, std::format_context& ctx) const {
    return std::format_to(ctx.out(), "{}",
      is_jp ? jp_color_names[c] : color_names[c]
    );
  }
};

int main()
{
  std::cout << std::format("{:%j} {:%e}", red, blue) << std::endl;
}
```
* std::format_parse_context[link basic_format_parse_context.md]
* ctx.begin()[link basic_format_parse_context/begin.md]
* std::format_context[link basic_format_context.md]
* ctx.out()[link basic_format_context/out.md]
* std::format_to[link format_to.md]
* std::format[link format.md]


#### 出力
```
赤 blue
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 関連項目
- [`vector<bool>`](/reference/vector/vector.md)


## 参照
- [P0645R10 Text Formatting](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0645r10.html)
- [{fmt}](https://github.com/fmtlib/fmt)
- [P2286R8 Formatting Ranges](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2286r8.html)
- [P2585R1 Improve default container formatting](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2585r1.html)
    - C++23から、Range・コンテナ、`pair`、`tuple`のフォーマット出力、および文字・文字列のデバッグ指定 (`"?"`) が追加された
