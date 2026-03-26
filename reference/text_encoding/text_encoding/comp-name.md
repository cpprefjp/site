# comp-name
* text_encoding[meta header]
* std[meta namespace]
* text_encoding[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
static constexpr bool comp-name(string_view a, string_view b); // 説明専用
```

## 概要
2つのエンコーディング名が等価かどうかを比較する説明専用の関数。Unicode Technical Standard #22で定義された「Charset Alias Matching」アルゴリズムに従う。


## 戻り値
通常リテラルエンコーディングでエンコードされた2つの文字列`a`と`b`が、以下の条件を無視して等しい場合に`true`を返す。左から右に比較し、以下を無視する：

- 数字でも英字でもないすべての要素
- 大文字と小文字の違い
- 数値プレフィックスの直後にない`0`の連続。数値プレフィックスとは、`[1-9]`の範囲の数字の後に、任意個の数字でも英字でもない要素が続くシーケンスのこと

そうでなければ`false`を返す。


## 例
```cpp example
#include <text_encoding>
#include <cassert>

int main() {
  // comp-nameは説明専用だが、同等の動作を示す例として
  // text_encodingコンストラクタとoperator==で確認できる

  // ハイフン・大文字小文字の無視
  // comp-name("UTF-8", "utf8") == true
  std::text_encoding a{"UTF-8"};
  std::text_encoding b{"utf8"};
  assert(a == b);

  // 非英数字の無視、先頭の0の無視
  // comp-name("u.t.f-008", "utf8") == true
  std::text_encoding c{"u.t.f-008"};
  assert(a == c);

  // 未登録エンコーディング同士も名前で比較される
  // comp-name("WTF-8", "wtf8") == true
  std::text_encoding d{"WTF-8"}; // other
  std::text_encoding e{"wtf8"};  // other
  assert(d == e);
}
```

### 出力
```
```


## バージョン
### 言語
- C++26


## 参照
- [P1885R12 Naming Text Encodings to Demystify Them](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1885r12.pdf)
- [Unicode Technical Standard #22: Charset Alias Matching](https://www.unicode.org/reports/tr22/#Charset_Alias_Matching)
