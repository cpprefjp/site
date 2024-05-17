# runtime-format-string
* format[meta header]
* class[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {

template <class charT>
struct runtime-format-string {
private:
  basic_string_view<charT> str;  // 説明用

public:
  runtime-format-string(basic_string_view<charT> s) noexcept : str(s) {}

  runtime-format-string(const runtime-format-string&) = delete;
  const runtime-format-string& operator=(const runtime-format-string&) = delete;
};

}
```


## 概要
`runtime-format-string`クラスは、実行時の書式文字列を表す説明用のクラスであり、ユーザーは使用できない。

このクラスは、[`std::string`](/reference/string/basic_string.md)や[`std::string_view`](/reference/string_view/basic_string_view.md)の文字列を、書式文字列として[`std::format()`](/reference/format/format.md)関数に指定するためにある。

```cpp
std::string fmt = "{}";
std::string s = std::format(std::runtime_format(fmt), "Hello");
```
* std::format[link format.md]
* std::runtime_format[link runtime_format.md]


## バージョン
### 言語
- C++26

## 関連項目
- [`std::format()`](format.md)
- [`std::runtime_format()`](runtime_format.md)
- [`std::basic_format_string`クラスのコンストラクタ](basic_format_string/op_constructor.md)


## 参照
- [P2918R2 Runtime format strings II](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2918r2.html)
