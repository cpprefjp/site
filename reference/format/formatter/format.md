# format
* format[meta header]
* function[meta id-type]
* std[meta namespace]
* formatter[meta class]
* cpp20[meta cpp]

```cpp
template <class FormatContext>
typename FormatContext::iterator
  format(T& x, FormatContext& ctx) const;
```
* FormatContext[link /reference/format/basic_format_context.md]

## 概要
受け取った型`T`のオブジェクトを書式化する。


## 効果
- [`parse()`](parse.md)メンバ関数で解析した書式文字列の指定に基づいて、`x`の値を文字列に変換する
- [`std::pair`](/reference/utility/pair.md)と[`std::tuple`](/reference/tuple/tuple.md)に対する`formatter`の特殊化の場合、以下を[`ctx.out()`](/reference/format/basic_format_context/out.md)に出力する：
    - 開きカッコを出力する
    - 範囲`[0, タプルの要素数)`の各要素`I`について、
        - `I != 0`であれば区切り文字を出力する
        - タプルの`I`番目の要素を、その型の`formatter`で出力する
    - 閉じカッコを出力する


## 戻り値
出力がおわった位置の出力イテレータを返す。


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13
- [Visual C++](/implementation.md#visual_cpp): ??

