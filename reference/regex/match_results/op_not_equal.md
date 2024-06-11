# operator!=
* regex[meta header]
* std[meta namespace]
* match_results[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  // operator==により、以下の演算子が使用可能になる (C++20)
  template <class BidirectinalIterator, class Allocator>
  bool operator!=(const match_results<BidirectionalIterator, Allocator>& m1,
                  const match_results<BidirectionalIterator, Allocator>& m2); // (1) C++11
}
```

## 概要
`match_results` オブジェクトを非等値比較する。


## 戻り値
- `!(m1` [`==`](op_equal.md) `m2)`


## 例
```cpp example
#include <iostream>
#include <regex>

int main()
{
  const char s[] = "abc 012 def";

  const std::regex re1(R"((\w+)\s+(\d+)\s+(\w+))");
  std::cmatch m1;
  std::regex_search(s, m1, re1);
  for (auto&& sub : m1) {
    std::cout << sub << std::endl;
  }
  std::cout << std::endl;

  const std::regex re2(R"((\w*) (\w*) (\w*))");
  std::cmatch m2;
  std::regex_search(s, m2, re2);
  for (auto&& sub : m2) {
    std::cout << sub << std::endl;
  }
  std::cout << std::endl;

  std::cout << std::boolalpha << (m1 != m2) << std::endl;
}
```
* !=[color ff0000]
* std::regex[link ../basic_regex.md]
* std::regex_search[link ../regex_search.md]
* std::cmatch[link ../match_results.md]

### 出力
```
abc 012 def
abc
012
def

abc 012 def
abc
012
def

false
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified], 3.5 [mark verified], 3.6 [mark verified]
- [GCC](/implementation.md#gcc): 4.9.0 [mark verified], 4.9.1 [mark verified], 5.0.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
