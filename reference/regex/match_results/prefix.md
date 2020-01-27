# prefix
* regex[meta header]
* std[meta namespace]
* match_results[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_reference prefix() const;
```

## 概要
マッチした文�列の前の文�列を指すサブマッチを返す。


## 要件
[`ready`](ready.md)`() == true`


## 戻り値
マッチした文�列の前の文�列を指すサブマッチ。ただし、マッチが失敗した場合は未規定。  
具体的なサブマッチの各メンバ変数の�定内容は以下の通り。

- [`regex_match`](../regex_match.md) の引数に [`match_results`](../match_results.md) オブジェクト `m` を渡した場合、戻り値が `true` であれば、`m.prefix().first` と `m.prefix().second` は共に検索対象文�列の先�となる。  
    また、`m.prefix().matched` は `false` となる。  
    戻り値が `false` の場合は未規定である。
- [`regex_search`](../regex_search.md) の引数に [`match_results`](../match_results.md) オブジェクト `m` を渡した場合、戻り値が `true` であれば、`m.prefix().first` は検索対象文�列の先�となり、`m.prefix().second` は `m[0].first`（つまり、マッチした文�列の先�）と�しくなる。  
    また、`m.prefix().matched` は `m.prefix().first != m.prefix().second` の結果となる（つまり、`m.prefix()` が空文�であれば `false`、そうでなければ `true`）。  
    戻り値が `false` の場合は未規定である。
- [`regex_iterator`](../regex_iterator.md) を間接参照したオブジェクトの場合、当該オブジェクトを `m` とすると、`m.prefix().first` は最初のマッチでなければ直前のマッチの際の `m[0].second`（つまり直前にマッチした文�列の末尾）、最初のマッチであれば検索対象文�列の先�となり、`m.prefix().second` は `m[0].first`（つまり、マッチした文�列の先�）と�しくなる。  
    また、`m.prefix().matched` は `m.prefix().first != m.prefix().second` となる（つまり、`m.prefix()` が空文�であれば `false`、そうでなければ `true`）。


## 例
```cpp example
#include <iostream>
#include <iterator>
#include <regex>
#include <string>

void print(const char* title, const std::ssub_match& sub, const std::string& s)
{
  std::cout << title << ": str() = '" << sub.str() << "', "
      "range = [" << sub.first - std::begin(s) << ", " << sub.second - std::begin(s) << "), "
      "matched = " << std::boolalpha << sub.matched << std::endl;
}

int main()
{
  // regex_match の場合
  std::cout << "regex_match" << std::endl;
  {
    const std::string s = "0123";
    const std::regex re("\\d+");

    std::smatch m;
    if (std::regex_match(s, m, re)) {
      print("m[0]", m[0], s);
      print("prefix()", m.prefix(), s);
    } else {
      std::cout << "not match" << std::endl;
    }
  }
  std::cout << std::endl;

  // regex_search の場合
  std::cout << "regex_search" << std::endl;
  {
    const std::string s = " abc 0123 defgh ";
    const std::regex re("\\d+");

    std::smatch m;
    if (std::regex_search(s, m, re)) {
      print("m[0]", m[0], s);
      print("prefix()", m.prefix(), s);
    } else {
      std::cout << "not match" << std::endl;
    }
  }
  std::cout << std::endl;

  // regex_iterator の場合
  std::cout << "regex_iterator" << std::endl;
  {
    const std::string s = "abc 0123";
    const std::regex re("\\w+");

    for (std::sregex_iterator it(std::begin(s), std::end(s), re), end; it != end; ++it) {
      auto&& m = *it;
      print("m[0]", m[0], s);
      print("prefix()", m.prefix(), s);
      std::cout << std::endl;
    }
  }
}
```
* m.prefix()[color ff0000]
* std::regex[link ../basic_regex.md]
* std::smatch[link ../match_results.md]
* std::regex_match[link ../regex_match.md]
* std::regex_search[link ../regex_search.md]
* std::regex_iterator[link ../regex_iterator.md]
* std::sregex_iterator[link ../regex_iterator.md]
* sub.str()[link str.md]
* std::ssub_match[link ../sub_match.md]

### 出力
```
regex_match
m[0]: str() = '0123', range = [0, 4), matched = true
prefix(): str() = '', range = [0, 0), matched = false

regex_search
m[0]: str() = '0123', range = [5, 9), matched = true
prefix(): str() = ' abc ', range = [0, 5), matched = true

regex_iterator
m[0]: str() = 'abc', range = [0, 3), matched = true
prefix(): str() = '', range = [0, 0), matched = false

m[0]: str() = '0123', range = [4, 8), matched = true
prefix(): str() = ' ', range = [3, 4), matched = true
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
