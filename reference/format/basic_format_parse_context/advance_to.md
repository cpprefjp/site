# advance_to
* format[meta header]
* function[meta id-type]
* std[meta namespace]
* basic_format_parse_context[meta class]
* cpp20[meta cpp]

```cpp
constexpr void advance_to(const_iterator it);
```

## 概要
指定したイテレータを先頭イテレータとして設定する。

この関数は、書式文字列の全体を解析する処理において、[`formatter`](/reference/format/formatter.md)`::`[`parse()`](/reference/format/formatter/parse.md)の戻り値から、次の解析を始めるために使用する。

```cpp
while (…) {
  auto it = f.parse(parse_ctx);

  /* 次の書式指定までitを進める… */

  next_parse_ctx.advance_to(it);
}
```
* parse[link /reference/format/formatter/parse.md]


## 事前条件
- `it`は[`end()`](end.md)に到達可能であること


## 効果
メンバ変数として保持している、書式文字列の先頭を指すイテレータ`begin_`があるとして、以下と等価：

```cpp
begin_ = it;
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照

- [P0645R10 Text Formatting](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0645r10.html)
