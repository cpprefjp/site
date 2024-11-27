# operator->
* regex[meta header]
* std[meta namespace]
* regex_iterator[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const value_type* operator->() const;
```

## 概要
イテレータを通してメンバにアクセスする。


## 要件
シーケンスの終端を示すイテレータではない事。（シーケンス終端イテレータに対して呼び出した場合は未定義動作を引き起こす）


## 戻り値
メンバ変数 `match` への `const` ポインタ [`addressof`](/reference/memory/addressof.md)`(match)` を返す。（`match` は最後に[`regex_search`](../regex_search.md) を呼び出した際の値を保持している）


## 備考
- `value_type` は `regex_iterator` のメンバ型で、[`match_results`](../match_results.md)`<BidirectionalIterator>` である。
- 戻り値の型は `const` へのポインタであるため、このポインタを通した変更はできない。
- メンバ変数 `match` はあくまでも説明用のプライベートメンバ変数であるため、注意すること。


## 例
```cpp example
#include <iostream>
#include <iterator>
#include <regex>
#include <string>

int main()
{
  std::regex re("\\d+");
  std::string s("abc123def456ghi");

  for (std::sregex_iterator it(std::begin(s), std::end(s), re), end; it != end; ++it) {
    std::cout << "prefix = '" << it->prefix() << "', str = '" << it->str() << "', suffix = '" << it->suffix() << '\'' << std::endl;
  }
}
```
* std::regex[link /reference/regex/basic_regex.md]
* prefix()[link /reference/regex/match_results/prefix.md]
* str()[link /reference/regex/match_results/str.md]
* suffix()[link /reference/regex/match_results/suffix.md]

### 出力
```
prefix = 'abc', str = '123', suffix = 'def456ghi'
prefix = 'def', str = '456', suffix = 'ghi'
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified], 3.5 [mark verified], 3.6 [mark verified]
- [GCC](/implementation.md#gcc): 4.9.0 [mark verified], 4.9.1 [mark verified], 5.0.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
| 名前                                 | 説明           | 対応バージョン |
|--------------------------------------|----------------|----------------|
| [`operator*`](op_deref.md)           | 間接参照       | C++11          |
| [`(constructor)`](op_constructor.md) | コンストラクタ | C++11          |
| [`operator++`](op_increment.md)      | インクリメント | C++11          |
| [`operator==`](op_equal.md)          | 等値比較       | C++11          |


## 参照
- [LWG Issue 3040. `basic_string_view::starts_with` Effects are incorrect](https://wg21.cmeerw.net/lwg/issue3040)
