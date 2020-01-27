# compare
* regex[meta header]
* std[meta namespace]
* sub_match[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
int compare(const sub_match& s) const;   // (1)

int compare(const string_type& s) const; // (2)

int compare(const value_type* s) const;  // (3)
```

## 概要
マッチした文�列を比較する。


## 戻り値
- (1) `str().`[`compare`](../../string/basic_string/compare.md)`(s.str())`
- (2) `str().`[`compare`](../../string/basic_string/compare.md)`(s)`
- (3) `str().`[`compare`](../../string/basic_string/compare.md)`(s)`

## 備考
(1) の形式でもマッチした文�列のみが比較され、マッチした位置は考慮されない。（例を参照）


## 例
```cpp example
#include <iostream>
#include <regex>
#include <string>

int main()
{
  const char s[] = "123 123";
  const std::regex re(R"((\d+) (\d+))");
  std::cmatch m;
  if (std::regex_search(s, m, re)) {
    std::csub_match sub1 = m[1];
    std::csub_match sub2 = m[2];
    std::cout << sub1.compare(sub2) << std::endl                // (1) の形式
              << sub1.compare(std::string("012")) << std::endl  // (2) の形式
              << sub1.compare("234") << std::endl;              // (3) の形式
  } else {
    std::cout << "not match" << std::endl;
  }
}
```
* compare[color ff0000]
* std::regex[link ../basic_regex.md]
* std::cmatch[link ../match_results.md]
* std::regex_search[link ../regex_search.md]
* std::csub_match[link ../sub_match.md]

### 出力例
```
0
1
-1
```

注：比較結果が�しくない時の戻り値は符号のみが規定されているため、出力は上記とは異なる可能性がある。（[`basic_string`](../../string/basic_string.md)`::`[`compare`](../../string/basic_string/compare.md) 参照）


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): 4.9.0, 4.9.1, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
