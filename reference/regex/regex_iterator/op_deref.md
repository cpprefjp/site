#operator* (C++11)
```cpp
const value_type& operator*() const;
```

##概要
イテレータを間接参照する。


##要件
シーケンスの終端を示すイテレータではない事。（シーケンス終端イテレータに対して呼び出した場合は未定義動作となる）


##戻り値
メンバ変数 `match` への `const` 参照を返す。（最後に[`regex_search`](../regex_search.md.nolink) を呼び出した際の値を保持している）


##備考
- `value_type` は `regex_iterator` のメンバ型で、[`match_results`](../match_results.md)`<BidirectionalIterator>` である。
- 戻り値の型は `const` への参照であるため、この参照を通した変更はできない。
- メンバ変数 `match` はあくまでも説明用のプライベートメンバ変数であるため、注意すること。


##例
```cpp
#include <iostream>
#include <iterator>
#include <regex>
#include <string>

int main()
{
  std::regex re("\\d+");
  std::string s("abc123def456ghi");

  for (std::sregex_iterator it(std::begin(s), std::end(s), re), end; it != end; ++it) {
    auto&& match = *it;
    std::cout << "prefix = '" << match.prefix() << "', str = '" << match.str() << "', suffix = '" << match.suffix() << '\'' << std::endl;
  }
}
```

###出力
```
prefix = 'abc', str = '123', suffix = 'def456ghi'
prefix = 'def', str = '456', suffix = 'ghi'
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
| 名前                                 | 説明           | 対応バージョン |
|--------------------------------------|----------------|----------------|
| [`operator->`](op_arrow.md)          | メンバアクセス | C++11          |
| [`(constructor)`](op_constructor.md) | コンストラクタ | C++11          |
| [`operator++`](op_increment.md)      | インクリメント | C++11          |
| [`operator==`](op_equal.md)          | 等値比較       | C++11          |
