# range_formatter
* format[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class T, class charT = char>
    requires same_as<remove_cvref_t<T>, T> && formattable<T, charT>
  class range_formatter;
}
```
* formattable[link formattable.md]

## 概要
`range_formatter`は、Range・コンテナに対する[`formatter`](formatter.md)クラスの特殊化を実装するためのユーティリティクラスである。

このクラスは、説明専用クラス[`range-default-formatter`](range-default-formatter.md)の内部実装として使用される。

ユーザー定義のコンテナ・RangeをRange書式に対応する場合は、以下のようにする：

- オリジナル書式を定義しないのであれば、このクラスではなく、[`format_kind`](format_kind.md)を特殊化する
- オリジナル書式を定義するのであれば、このクラスおよび[`format_kind`](format_kind.md)を特殊化して[`parse()`](range_formatter/parse.md)メンバ関数と[`format()`](range_formatter/format.md)メンバ関数を実装する


## メンバ関数

| メンバ関数 | 説明 | 対応バージョン |
|------------|------|----------------|
| [`set_separator`](range_formatter/set_separator.md) | 要素の区切り文字を設定する | C++23 |
| [`set_brackets`](range_formatter/set_brackets.md)   | 全体の囲み文字を設定する | C++23 |
| [`underlying`](range_formatter/underlying.md)       | 要素型の`formatter`を取得する | C++23 |
| [`parse`](range_formatter/parse.md)                 | 書式の解析を行う | C++23 |
| [`format`](range_formatter/format.md)               | 書式化を行う | C++23 |


## 例
### オリジナル書式を定義する例
```cpp example
#include <iostream>
#include <format>
#include <vector>

template <class T>
class MyVector {
  std::vector<T> v_;
public:
  using base_type = std::vector<T>;
  using iterator = typename base_type::iterator;
  using const_iterator = typename base_type::const_iterator;
  using value_type = typename base_type::value_type;
  using reference = typename base_type::reference;
  using const_reference = typename base_type::const_reference;

  MyVector() = default;
  MyVector(std::initializer_list<T> init)
      : v_(init.begin(), init.end()) {}

  iterator begin() { return v_.begin(); }
  const_iterator begin() const { return v_.begin(); }

  iterator end() { return v_.end(); }
  const_iterator end() const { return v_.end(); }

  const std::vector<T>& base() const { return v_; }
};

template <class T>
constexpr std::range_format std::format_kind<MyVector<T>> = std::range_format::sequence;

template <class T>
class std::formatter<MyVector<T>> : public std::range_formatter<T> {
  bool is_colon = false;
  using base_type = std::range_formatter<T>;
public:

  // コンパイル時の書式文字列の解析があるため、
  // constexprにする必要がある。
  // この関数に渡されるパラメータは、{:c:02x}のc以降。
  // 解析がおわった場所を指すイテレータを返す。
  constexpr auto parse(std::format_parse_context& pctx) {
    auto it = pctx.begin();
    if (*it == 'c') {
      is_colon = true;
      ++it;
    }
    pctx.advance_to(it);
    return base_type::parse(pctx);
  }

  // format()関数は書式の情報をもたない。
  // parse()関数で解析した書式をメンバ変数で保持しておいて、
  // それをもとに書式化する
  auto format(const MyVector<T>& v, std::format_context& fctx) const {
    if (is_colon) {
      auto out = fctx.out();
      bool is_first = true;
      for (const T& x : v) {
        if (is_first) {
          is_first = false;
        }
        else {
          *out = ':';
          ++out;
        }
        fctx.advance_to(out);
        out = this->underlying().format(x, fctx);
      }
      return out;
    }
    return base_type::format(v.base(), fctx);
  }
};

#include <cstdint>

int main()
{
  MyVector<std::uint8_t> v = {0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff};
  std::cout << std::format("{:c:02x}", v) << std::endl;
}
```
* std::format_parse_context[link basic_format_parse_context.md]
* pctx.begin()[link basic_format_parse_context/begin.md]
* pctx.advance_to[link basic_format_parse_context/advance_to.md]
* std::format_context[link basic_format_context.md]
* fctx.out()[link basic_format_context/out.md]
* fctx.advance_to[link basic_format_context/advance_to.md]
* std::format[link format.md]
* underlying()[link range_formatter/underlying.md]


#### 出力
```
aa:bb:cc:dd:ee:ff
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 15.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 関連項目
- [`range-default-formatter`](range-default-formatter.md)
- [`formatter`](formatter.md)


## 参照
- [P2286R8 Formatting Ranges](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2286r8.html)
- [P2585R1 Improve default container formatting](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2585r1.html)
    - C++23から、Range・コンテナ、`pair`、`tuple`のフォーマット出力、および文字・文字列のデバッグ指定 (`"?"`) が追加された
