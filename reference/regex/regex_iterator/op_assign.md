# operator=
* regex[meta header]
* std[meta namespace]
* regex_iterator[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
regex_iterator& operator=(const regex_iterator& rhs);
```

## 概要
`rhs` を `*this` にコピーする。


## 効果
`rhs` の状態を `*this` にコピーする。


## 戻り値
`*this`


## 備考
規格書には特に記載は無いが、前方向イテレータの要件から、コピー元オブジェクトの全ての状態を引き継ぐと考えてよいものと思われる。


## 例
```cpp example
#include <iostream>
#include <iterator>
#include <regex>
#include <string>

int main()
{
  std::regex re("\\d+");
  std::string s("+++111---222+++333---");

  std::sregex_iterator it1;
  for (std::sregex_iterator it2(std::begin(s), std::end(s), re), end; it2 != end; ++it2) {
    if (it2->str() == "222") {
      it1 = it2;
    }
    std::cout << "position = " << it2->position() << ", length = " << it2->length() << ", str = '" << it2->str() << "', prefix = '" << it2->prefix() << "', suffix = '" << it2->suffix() << '\'' << std::endl;
  }
  std::cout << std::endl;

  for (std::sregex_iterator end; it1 != end; ++it1) {
    std::cout << "position = " << it1->position() << ", length = " << it1->length() << ", str = '" << it1->str() << "', prefix = '" << it1->prefix() << "', suffix = '" << it1->suffix() << '\'' << std::endl;
  }
}
```
* std::regex[link /reference/regex/basic_regex.md]
* position()[link /reference/regex/match_results/position.md]
* length()[link /reference/regex/match_results/length.md]
* str()[link /reference/regex/match_results/str.md]
* prefix()[link /reference/regex/match_results/prefix.md]
* suffix()[link /reference/regex/match_results/suffix.md]

### 出力
```
position = 3, length = 3, str = '111', prefix = '+++', suffix = '---222+++333---'
position = 9, length = 3, str = '222', prefix = '---', suffix = '+++333---'
position = 15, length = 3, str = '333', prefix = '+++', suffix = '---'

position = 9, length = 3, str = '222', prefix = '---', suffix = '+++333---'
position = 15, length = 3, str = '333', prefix = '+++', suffix = '---'
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): 4.9.0, 4.9.1, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


### 備考
GCC & libstdc++ では、コピー後のオブジェクトの `match.`[`position`](../match_results/position.md)`(i)` が補�されずに誤っている。（補�については [`operator++`](op_increment.md) の「効果」を参照）


## 関連項目
| 名前                                 | 説明           | 対応バージョン |
|--------------------------------------|----------------|----------------|
| [`(constructor)`](op_constructor.md) | コンストラクタ | C++11          |
| [`operator==`](op_equal.md)          | �値比較       | C++11          |
| [`operator++`](op_increment.md)      | インクリメント | C++11          |
