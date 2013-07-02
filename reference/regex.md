#regex(C++11)
`<regex>`ヘッダは、文字列に対する正規表現を行うためのクラス・関数を定義する。

```cpp
namespace std {
  typedef basic_regex<char> regex;
  typedef basic_regex<wchar_t> wregex;
}
```

##basic_regexクラス
##メンバ関数

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------|----------------|-------|
| [`(constructor)`](./regex/constructor.md) | コンストラクタ | C++11 |
| `(destructor)` | デストラクタ | C++11 |
| `operator=` | 代入 | C++11 |
| `assign` | 再代入 | C++11 |

##バージョン
###言語
- C++11

