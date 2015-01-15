#operator= (C++11)
```cpp
regex_token_iterator& operator=(const regex_token_iterator& rhs);
```

##概要
`rhs` を `*this` にコピーする。


##効果
`rhs` の状態を `*this` にコピーする。


##戻り値
`*this`


##備考
規格書には特に記載は無いが、前方向イテレータの要件から、コピー元オブジェクトの全ての状態を引き継ぐと考えてよいものと思われる。


##例
```cpp
#include <iostream>
#include <iterator>
#include <regex>
#include <string>
#include <initializer_list>

int main()
{
  const std::string s("enum E { enumerator1 = value1, enumerator2 = value2, enumerator3 = value3, };");
  const std::regex re(R"((\w+)\s*=\s*(\w+))"); // 列挙子とその値をグループ化

  std::sregex_token_iterator it1;
  // 1 番目と 2 番目のサブマッチを順に繰り返す
  for (std::sregex_token_iterator it2(std::begin(s), std::end(s), re, { 1, 2 }), end; it2 != end; ++it2) {
    // it2 が value2 を指した時点で、it1 にコピーする
    if (*it2 == "value2") {
      it1 = it2;
    }
    std::cout << "match range = (" << it2->first - std::begin(s) << ", " << it2->second - std::begin(s) << "), "
                 "str = '" << it2->str() << '\'' << std::endl;
  }
  std::cout << std::endl;

  // it2 を途中でコピーしたイテレータで、1 番目と 2 番目のサブマッチを順に繰り返す
  for (std::sregex_token_iterator end; it1 != end; ++it1) {
    std::cout << "match range = (" << it1->first - std::begin(s) << ", " << it1->second - std::begin(s) << "), "
                 "str = '" << it1->str() << '\'' << std::endl;
  }
}
```

###出力
```
match range = (9, 20), str = 'enumerator1'
match range = (23, 29), str = 'value1'
match range = (31, 42), str = 'enumerator2'
match range = (45, 51), str = 'value2'
match range = (53, 64), str = 'enumerator3'
match range = (67, 73), str = 'value3'

match range = (45, 51), str = 'value2'
match range = (53, 64), str = 'enumerator3'
match range = (67, 73), str = 'value3'
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


###備考
GCC & libstdc++ では、コピー直後のオブジェクトの参照先が誤っている。


##参照
| 名前                                       | 説明           | 対応バージョン |
|--------------------------------------------|----------------|----------------|
| [`(constructor)`](op_constructor.md) | コンストラクタ | C++11          |
| [`operator==`](op_equal.md)                | 等値比較       | C++11          |
| [`operator++`](op_increment.md)            | インクリメント | C++11          |
