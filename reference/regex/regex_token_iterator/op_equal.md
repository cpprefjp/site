#operator== (C++11)
```cpp
bool operator==(const regex_token_iterator& right) const;
```

##概要
`regex_token_iterator` の等値比較を行う。


##戻り値
`*this` と引数 `right` が共にシーケンス終端イテレータの場合、`true` を返す。  
`*this` と引数 `right` が共に接尾辞イテレータで、かつ、`suffix == right.suffix` の場合、`true` を返す。  
そうでなくて、`*this` と引数 `right` のいずれかがシーケンス終端イテレータ、あるいは、接尾辞イテレータの場合、`false` を返す。  
そうでなくて、各メンバ変数が以下の全ての条件を満たしていれば `true` を、そうでなければ `false` を返す。

- `position == right.position`
- `N == right.N`
- `subs == right.subs`


##備考
- メンバ変数 `position`、`N`、`subs`、`suffix` はあくまでも説明用のプライベートメンバ変数であるため、注意すること。
- 本メンバ関数が `true` を返したとしても、イテレータが同じ個所を指しているとは限らないことに注意すること。（下記の例を参照）


##例
```cpp
#include <iostream>
#include <iterator>
#include <regex>
#include <string>
#include <initializer_list>

int main()
{
  // 検索対象は 2 番目の列挙子と 3 番目の列挙子が同じ文字列になっている
  const std::string s("enum E { enumerator1 = value1, enumerator2 = value2, enumerator2 = value2, };");
  const std::regex re(R"((\w+)\s*=\s*(\w+))"); // 列挙子とその値をグループ化

  // 同一の引数で 2 つのイテレータを構築する
  std::sregex_token_iterator it1(std::begin(s), std::end(s), re, { 1, 2 });
  std::sregex_token_iterator it2(std::begin(s), std::end(s), re, { 1, 2 });

  std::advance(it1, 2); // 2 つ進める（1 番目の enumerator2 を指す）
  std::advance(it2, 4); // 4 つ進める（2 番目の enumerator2 を指す）

  // operator= で比較する
  std::cout << std::boolalpha << (it1 == it2) << std::endl;

  // 参考のため、各サブマッチの詳細を出力する
  std::cout << "match range = (" << (it1->first - std::begin(s)) << ", " << (it1->second - std::begin(s)) << "), "
               "str = '" << it1->str() << '\'' << std::endl;
  std::cout << "match range = (" << (it2->first - std::begin(s)) << ", " << (it2->second - std::begin(s)) << "), "
               "str = '" << it2->str() << '\'' << std::endl;
}
```
* ==[color ff0000]

###出力
```
true
match range = (31, 42), str = 'enumerator2'
match range = (53, 64), str = 'enumerator2'
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
| 名前                                       | 説明           | 対応バージョン |
|--------------------------------------------|----------------|----------------|
| [`operator*`](op_deref.md)                 | 間接参照       | C++11          |
| [`operator->`](op_arrow.md)                | メンバアクセス | C++11          |
| [`(constructor)`](regex_token_iterator.md) | コンストラクタ | C++11          |
| [`operator++`](op_increment.md)            | インクリメント | C++11          |
| [`operator!=`](op_not_equal.md)            | 非等値比較     | C++11          |
