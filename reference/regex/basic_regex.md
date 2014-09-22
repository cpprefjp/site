#basic_regex

```cpp
namespace std {
  template <class charT,
            class traits = regex_traits<charT> >
  class basic_regex;

  typedef basic_regex<char>    regex;
  typedef basic_regex<wchar_t> wregex;
}
```

##概要

`basic_regex`クラステンプレートは、`charT`型の文字列から構築する正規表現を表す。
`charT`はcharのような型(`char`型, `wchar_t`型など)である。
`traits`は正規表現の文字・変換に関する特性である。
利便性のために、`charT`を`char`特殊化した`regex`と、`charT`を`wchar_t`特殊化した`wregex`が用意されている。

`basic_regex`オブジェクトの内部表現や、正規表現アルゴリズムが`basic_regex`オブジェクトの内部表現にどのようにアクセスするかは規定されない。
ユーザーはそれらを意識することなく、`basic_regex`オブジェクトを正規表現アルゴリズムに渡すだけでよい。

エラーは正規表現アルゴリズムが`regex_error`型の例外投げることで通知される。

##メンバ関数

###構築

| 名前 | 説明 | 対応バージョン |
| ---- | ---- | -------------- |
| `(constructor)` | コンストラクタ | C++11 |
| `(destructor)` | デストラクタ | C++11 |
| `operator=` | 正規表現を代入する | C++11 |

###代入

| 名前 | 説明 | 対応バージョン |
| ---- | ---- | -------------- |
| `assign` | 正規表現を代入する | C++11 |

###定数操作

| 名前 | 説明 | 対応バージョン |
| ---- | ---- | -------------- |
| `mark_count` | 正規表現中のマークされた部分式の数を返す | C++11 |
| `flags` | 最後にセットされた正規表現フラグを返す | C++11 |

###ロケール

| 名前 | 説明 | 対応バージョン |
| ---- | ---- | -------------- |
| `imbue` | ロケールを設定する | C++11 |
| `getloc` | 現在のロケールを得る | C++11 |

###交換

| 名前 | 説明 | 対応バージョン |
| ---- | ---- | -------------- |
| `swap` | 正規表現オブジェクトを交換する | C++11 |

##メンバ定数

静的メンバ定数は利便性のために`std::regex_constants`で定義される定数の同義語として提供される。

| 名前 | 説明 | 対応バージョン |
| ---- | ---- | -------------- |
| `icase`      | `static constexpr regex_constants::syntax_option_type icase      = regex_constants::icase;`      | C++11 |
| `nosubs`     | `static constexpr regex_constants::syntax_option_type nosubs     = regex_constants::nosubs;`     | C++11 |
| `optimize`   | `static constexpr regex_constants::syntax_option_type optimize   = regex_constants::optimize;`   | C++11 |
| `collate`    | `static constexpr regex_constants::syntax_option_type collate    = regex_constants::collate;`    | C++11 |
| `ECMAScript` | `static constexpr regex_constants::syntax_option_type ECMAScript = regex_constants::ECMAScript;` | C++11 |
| `basic`      | `static constexpr regex_constants::syntax_option_type basic      = regex_constants::basic;`      | C++11 |
| `extended`   | `static constexpr regex_constants::syntax_option_type extended   = regex_constants::extended;`   | C++11 |
| `awk`        | `static constexpr regex_constants::syntax_option_type awk        = regex_constants::awk;`        | C++11 |
| `grep`       | `static constexpr regex_constants::syntax_option_type grep       = regex_constants::grep;`       | C++11 |
| `egrep`      | `static constexpr regex_constants::syntax_option_type egrep      = regex_constants::egrep;`      | C++11 |

##メンバ型

| 名前 | 説明 | 対応バージョン |
| ---- | ---- | -------------- |
| `value_type`  | `charT` | C++11 |
| `traits_type` | `traits` | C++11 |
| `string_type` | `traits::string_type` | C++11 |
| `flag_type`   | `regex_constants::syntax_option_type` | C++11 |
| `locale_type` | `traits::locale_type` | C++11 |

##非メンバ関数

### 交換

| 名前 | 説明 | 対応バージョン |
| ---- | ---- | -------------- |
| `swap` | 二つの正規表現オブジェクトを交換する | C++11 |
