# operator==
* regex[meta header]
* std[meta namespace]
* match_results[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class BidirectinalIterator, class Allocator>
  bool operator==(const match_results<BidirectionalIterator, Allocator>& m1,
                  const match_results<BidirectionalIterator, Allocator>& m2);
}
```

## 概要
`match_results` オブジェクトを�値比較する。


## 戻り値
- どちらも [`ready`](ready.md)`() == false` である場合、`true` を返す。
- いずれかが [`ready`](ready.md)`() == true` で、もう一方が  [`ready`](ready.md)`() == false` である場合、`false` を返す。
- どちらも [`ready`](ready.md)`() == true` である場合、以下のいずれかの条件を満たす場合に限り `true` を返す。
    - `m1.`[`empty`](empty.md)`() && m2.`[`empty`](empty.md)`()` である。
    - `!m1.`[`empty`](empty.md)`() && !m2.`[`empty`](empty.md)`()`、かつ、以下の条件をすべて満たす。
        - `m1.`[`prefix`](prefix.md)`() == m2.`[`prefix`](prefix.md)`()`
        - `m1.`[`size`](size.md)`() == m2.`[`size`](size.md)`() &&` [`equal`](../../algorithm/equal.md)`(m1.`[`begin`](begin.md)`(), m1.`[`end`](end.md)`(), m2.`[`begin`](begin.md)`()`
        - `m1.`[`suffix`](suffix.md)`() == m2.`[`suffix`](suffix.md)`()`


## 備考
本関数では、基本的に文�列としての比較しかしていないため、実際には�しくない場合でも�しいと判�される場合がある。


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

  std::cout << std::boolalpha << (m1 == m2) << std::endl;
}
```
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

true
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
