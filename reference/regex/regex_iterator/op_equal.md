# operator==
* regex[meta header]
* std[meta namespace]
* regex_iterator[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
bool operator==(const regex_iterator& right) const;
```

## 概要
`regex_iterator` の�値比較を行う。


## 戻り値
`*this` と引数 `right` が共にシーケンスの終端を示すイテレータの場合、`true` を返す。  
`*this` と引数 `right` のいずれか一方のみがシーケンスの終端を示すイテレータの場合、`false` を返す。  
`*this` と引数 `right` が共にシーケンスの終端を示すイテレータではない場合、各メンバ変数が以下の全ての条件を満たしていれば `true` を、そうでなければ `false` を返す。

- `begin == right.begin`
- `end == right.end`
- `pregex == right.pregex`
- `flags == right.flags`
- `match[0] == right.match[0]`


## 備考
- メンバ変数 `begin`、`end`、`pregex`、`flags`、`match` はあくまでも説明用のプライベートメンバ変数であるため、注意すること。
- 本メンバ関数が `true` を返したとしても、イテレータが同じ個所を指しているとは限らないことに注意すること。（下記の例を参照）


## 例
```cpp example
#include <iostream>
#include <iterator>
#include <regex>
#include <string>

int main()
{
  std::regex re("\\d+");
  std::string s("+1-1+1-");

  // 2 つのイテレータを同一引数で生成する
  std::sregex_iterator it1(std::begin(s), std::end(s), re);
  std::sregex_iterator it2(std::begin(s), std::end(s), re);

  // 一方は 2 つ、もう一方は 1 つ進める
  ++it1; ++it1;
  ++it2;

  // operator== で比較する
  std::cout << std::boolalpha << (it1 == it2) << std::endl;

  // 参考のため、それぞれのマッチ結果の詳細を出力する
  std::cout << "it1:'" << it1->str() << "'(" << ((*it1)[0].first - std::begin(s)) << ", " << ((*it1)[0].second - std::begin(s)) << ')' << std::endl;
  std::cout << "it2:'" << it2->str() << "'(" << ((*it2)[0].first - std::begin(s)) << ", " << ((*it2)[0].second - std::begin(s)) << ')' << std::endl;
}
```
* ==[color ff0000]
* std::regex[link /reference/regex/basic_regex.md]
* str()[link /reference/regex/match_results/str.md]

### 出力
```
true
it1:'1'(5, 6)
it2:'1'(3, 4)
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


## 関連項目
| 名前                            | 説明       |
|---------------------------------|------------|
| [`operator!=`](op_not_equal.md) | 非�値比較 |

