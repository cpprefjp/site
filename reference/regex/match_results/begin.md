# begin
* regex[meta header]
* std[meta namespace]
* match_results[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_iterator begin() const;
```

## 概要
`*this` 内の全てのサブマッチを列挙するため、先�のサブマッチを指すイテレータを返す。


## 戻り値
先�のサブマッチを指すイテレータ


## 備考
- 「先�のサブマッチ」は、�規表現にマッチした文�列全体を指す。
- 本メンバ関数で返されるイテレータも、�み取り専用イテレータ（`const_iterator`）である。


## 例
```cpp example
#include <iostream>
#include <regex>

int main()
{
  const char s[] = " abc 0123 defgh ";
  const std::regex re("(\\w+) (\\d+) (\\w+)");

  std::cmatch m;
  if (std::regex_search(s, m, re)) {
    for (auto it = m.begin(), end = m.end(); it != end; ++it) {
      std::cout << "str() = '" << it->str() << "', "
        "range = [" << it->first - s << ", " << it->second - s << "), "
        "matched = " << std::boolalpha << it->matched << std::endl;
    }
  } else {
    std::cout << "not match" << std::endl;
  }
}
```
* begin()[color ff0000]
* std::regex[link ../basic_regex.md]
* std::cmatch[link ../match_results.md]
* std::regex_search[link ../regex_search.md]
* m.end()[link end.md]
* it->str()[link str.md]

### 出力
```
str() = 'abc 0123 defgh', range = [1, 15), matched = true
str() = 'abc', range = [1, 4), matched = true
str() = '0123', range = [5, 9), matched = true
str() = 'defgh', range = [10, 15), matched = true
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
