# ラムダ式に対する属性 [P2173R1]
* cpp23[meta cpp]

<!-- start lang caution -->

このページはC++23に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative_page)を参照してください。

<!-- last lang caution -->

## 概要
C++23では、ラムダ式のいくつかの箇所に属性を指定できる。

- ラムダ式の関数呼び出し演算子自体に対する属性
    - キャプチャ指定のうしろ
        - テンプレートのラムダ式の場合は、テンプレートパラメータリストに続くrequires定義のうしろ
    - C++23時点でここに指定できる属性は以下
        - [`[[noreturn]]`](/lang/cpp11/attributes.md)
        - [`[[nodiscard]]`](/lang/cpp17/nodiscard.md)
        - [`[[deprecated]]`](/lang/cpp14/deprecated_attr.md)
- ラムダ式の修飾もしくは戻り値型に対する属性
    - パラメータリスト、`constexpr` / `mutable`、`noexcept`のうしろ (このあとに後置戻り値型、requiresが続く)
    - C++23時点でここに指定できる標準属性なし


## 例
```cpp example
#include <stdexcept>
#include <concepts>

int main()
{
  auto f1 = [] [[noreturn]] { throw std::runtime_error("error"); };
  auto f2 = [] [[nodiscard]] { return true; };
  auto f3 = [] [[deprecated]] { return false; };

  auto f4 = [] <class T>
    requires std::copy_constructible<T>
    [[nodiscard]]
    (T value) {
      return value;
  };
}
```
* std::copy_constructible[link /reference/concepts/copy_constructible.md]

### 出力
```
```

## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 ラムダ式](/lang/cpp11/lambda_expressions.md)
- [C++11 属性構文](/lang/cpp11/attributes.md)


## 参照
- [P2173R1 Attributes on Lambda-Expressions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2173r1.pdf)