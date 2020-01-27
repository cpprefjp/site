# operator[]
* regex[meta header]
* std[meta namespace]
* match_results[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_reference operator[](size_type n) const;
```

## 概要
指定されたサブマッチを返す。


## 要件
[`ready`](ready.md)`() == true`


## 戻り値
`n` 番目の�ャプチャグループ（�規表現内の括弧で囲まれた部分）に対応する [`sub_match`](../sub_match.md) オブジェクトへの参照。  
`n == 0` の場合、マッチした文�列全体に対応する [`sub_match`](../sub_match.md) オブジェクトへの参照を返す。  
`n >=` [`size`](size.md)`()` の場合、マッチしていないことを表す [`sub_match`](../sub_match.md) オブジェクト（備考参照）への参照を返す。


## 備考
マッチしていないことを表す [`sub_match`](../sub_match.md) オブジェクトとは、`first` と `second` が検索対象文�列の末尾を指し、`match == false` であるようなオブジェクトである。


## 例
```cpp example
#include <iostream>
#include <regex>

int main()
{
  const char s[] = " abc 0123 defgh ";
  const std::regex re("(\\w+) (\\d+) (?:(\\d+)|(\\w+))");

  std::cmatch m;
  std::cout << std::boolalpha;
  if (std::regex_search(s, m, re)) {
    for (std::size_t i = 0, n = m.size(); i < n; ++i) {
      const std::csub_match& sub = m[i];
      std::cout << i << ":matched = " << sub.matched << ", str() = '" << sub.str() << "', length() = " << sub.length() << std::endl;
    }
  } else {
    std::cout << "not match" << std::endl;
  }
}
```
* m[i][color ff0000]
* std::regex[link ../basic_regex.md]
* std::cmatch[link ../match_results.md]
* std::regex_search[link ../regex_search.md]
* m.size()[link size.md]
* std::csub_match[link ../sub_match.md]
* sub.str()[link ../sub_match/str.md]
* sub.length()[link ../sub_match/length.md]

### 出力
```
0:matched = true, str() = 'abc 0123 defgh', length() = 14
1:matched = true, str() = 'abc', length() = 3
2:matched = true, str() = '0123', length() = 4
3:matched = false, str() = '', length() = 0
4:matched = true, str() = 'defgh', length() = 5
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
