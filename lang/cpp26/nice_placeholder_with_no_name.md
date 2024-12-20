# 宣言のみで使用しない変数の名前として_をサポート [P2169R4]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++17で採用された、`[[maybe_unused]]`属性を変数名`_`の場合、自動的につける。

```cpp
int main() {
  [[maybe_unused]]int hardNamingVariable; 
  // gccやclangの場合、-Wallオプションをつけると、
  // 変数が未使用だった場合、警告が出力される。
  // [[maybe_unused]]属性によって、これを抑制することができた。
  // しかし、今後は、変数名が_であれば、自動的にその属性が適用されるようになる。
  int _;
  // このコードを-Wallでコンパイルしても、警告は表示されない。
}
```

## <a id="relative-page" href="#relative-page">関連項目</a>
- [\[\[maybe_unused\]\]属性 \[P0212R1\]](/lang/cpp17/maybe_unused.html)

## 参照
- [P2169R4 A nice placeholder with no name](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2169r4.pdf)