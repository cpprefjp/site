#operator!= (C++11)
* regex[meta header]
* std[meta namespace]

```cpp
bool operator!=(const regex_iterator& right) const;
```

##概要
`regex_iterator` の非等値比較を行う。


##戻り値
`!(*this == right)`


##備考
- 本メンバ関数が `true` を返したとしても、イテレータの指す文字列が等しくないとは限らないことに注意すること。（下記の例を参照）


##例
```cpp
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

  // 一方だけ  1 つ進める
  ++it1;

  // operator!= で比較する
  std::cout << std::boolalpha << (it1 != it2) << std::endl;

  // 参考のため、それぞれのマッチ結果の詳細を出力する
  std::cout << "it1:'" << it1->str() << "'(" << ((*it1)[0].first - std::begin(s)) << ", " << ((*it1)[0].second - std::begin(s)) << ')' << std::endl;
  std::cout << "it2:'" << it2->str() << "'(" << ((*it2)[0].first - std::begin(s)) << ", " << ((*it2)[0].second - std::begin(s)) << ')' << std::endl;
}
```
* !=[color ff0000]

###出力
```
true
it1:'1'(3, 4)
it2:'1'(1, 2)
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.9.0, 4.9.1, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


##参照
|                             |          |
|-----------------------------|----------|
| [`operator==`](op_equal.md) | 等値比較 |

