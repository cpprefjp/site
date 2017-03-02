#basic_regex
* regex[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]


```cpp
namespace std {
  template <class charT,
            class traits = regex_traits<charT> >
  class basic_regex;

  typedef basic_regex<char>    regex;
  typedef basic_regex<wchar_t> wregex;
}
```
* regex_traits[link regex_traits.md]

##概要

`basic_regex`クラステンプレートは、`charT`型の文字列から構築する正規表現を表す。
`charT`は、`char`型、`wchar_t`型のような文字型である。
`traits`は正規表現の文字・変換に関する特性である。
利便性のために、`charT`を`char`特殊化した`regex`と、`charT`を`wchar_t`特殊化した`wregex`が用意されている。

`basic_regex`オブジェクトの内部表現や、正規表現アルゴリズムが`basic_regex`オブジェクトの内部表現にどのようにアクセスするかは規定されない。
ユーザーはそれらを意識することなく、`basic_regex`オブジェクトを正規表現アルゴリズムに渡すだけでよい。

このクラス中で発生したエラーは、正規表現アルゴリズムが[`regex_error`](regex_error.md)型の例外を送出することで通知される。


##メンバ関数

###構築

| 名前                                             | 説明           | 対応バージョン |
|--------------------------------------------------|----------------|----------------|
| [`(constructor)`](basic_regex/op_constructor.md) | コンストラクタ | C++11          |
| [`(destructor)`](basic_regex/op_destructor.md)   | デストラクタ   | C++11          |

###代入

| 名前                                    | 説明               | 対応バージョン |
|-----------------------------------------|--------------------|----------------|
| [`operator=`](basic_regex/op_assign.md) | 正規表現を代入する | C++11          |
| [`assign`](basic_regex/assign.md)       | 正規表現を代入する | C++11          |

###定数操作

| 名前                                      | 説明                                     | 対応バージョン |
|-------------------------------------------|------------------------------------------|----------------|
| [`mark_count`](basic_regex/mark_count.md) | 正規表現内のキャプチャグループの数を返す | C++11          |
| [`flags`](basic_regex/flags.md)           | 最後に設定された正規表現フラグを返す     | C++11          |

###ロケール

| 名前                              | 説明                 | 対応バージョン |
|-----------------------------------|----------------------|----------------|
| [`imbue`](basic_regex/imbue.md)   | ロケールを設定する   | C++11          |
| [`getloc`](basic_regex/getloc.md) | 現在のロケールを得る | C++11          |

###交換

| 名前                          | 説明                           | 対応バージョン |
|-------------------------------|--------------------------------|----------------|
| [`swap`](basic_regex/swap.md) | 正規表現オブジェクトを交換する | C++11          |

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

| 名前                               | 説明                                 | 対応バージョン |
|------------------------------------|--------------------------------------|----------------|
| [`swap`](basic_regex/swap_free.md) | 二つの正規表現オブジェクトを交換する | C++11          |


##例
```cpp
#include <iostream>
#include <regex>
#include <string>

int main()
{
  std::string input = "12345";

  // 全てが数字か判定するための正規表現
  std::regex re(R"(^\d+$)");

  if (std::regex_match(input, re)) {
    std::cout << "全て数字です" << std::endl;
  }
  else {
    std::cout << "数字以外が含まれています" << std::endl;
  }
}
```
* std::regex[color ff0000]
* std::regex_match[link regex_match.md]

###出力
```
全て数字です
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.9.0, 4.9.1, 4.9.2, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

