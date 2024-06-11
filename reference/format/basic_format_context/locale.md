# locale
* format[meta header]
* function[meta id-type]
* std[meta namespace]
* basic_format_context[meta class]
* cpp20[meta cpp]

```cpp
std::locale locale();
```
* std::locale[link /reference/locale/locale.md]

## 概要
ロケールを取得する。


## 効果
文字列フォーマット関数に指定されたロケールオブジェクトがあればそれを返し、そうでなければ[`std::locale()`](/reference/locale/locale.md)を返す。


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照

- [P0645R10 Text Formatting](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0645r10.html)
