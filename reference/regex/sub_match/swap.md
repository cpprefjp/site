# swap
* regex[meta header]
* std[meta namespace]
* sub_match[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
void swap(sub_match& s) noexcept(see below); // C++23
```

## 概要
別の`sub_match`オブジェクトとデータを交換する。


## 事前条件
`BidirectionalIterator`が`Swappable`の要件を満たすこと。


## 効果
以下と等価：

```cpp
this->pair<BidirectionalIterator, BidirectionalIterator>::swap(s);
std::swap(matched, s.matched);
```
* std::swap[link ../../utility/swap.md]


## 例外
この関数の例外仕様は、[`is_nothrow_swappable_v`](/reference/type_traits/is_nothrow_swappable.md)`<BidirectionalIterator>`と等価である。


## 備考
- このメンバ関数はC++23に対する欠陥報告 (LWG 3204) として追加されたものであり、コンパイラは早期に対応している場合がある。そのため、C++20モードでも使用できる可能性がある。


## 例
```cpp example
#include <iostream>
#include <regex>
#include <string>

int main()
{
  const std::string s(" abc 123 ");
  const std::regex re(R"((\w+)\s+(\d+))");
  std::smatch m;
  std::regex_search(s, m, re);

  std::ssub_match a = m[1]; // "abc"
  std::ssub_match b = m[2]; // "123"

  a.swap(b);

  std::cout << a.str() << std::endl;
  std::cout << b.str() << std::endl;
}
```
* swap[color ff0000]
* a.str()[link str.md]
* b.str()[link str.md]
* std::ssub_match[link ../sub_match.md]
* std::regex[link ../basic_regex.md]
* std::regex_search[link ../regex_search.md]
* std::smatch[link ../match_results.md]

### 出力
```
123
abc
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 17 [mark verified]
- [GCC](/implementation.md#gcc): 13.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 7 [mark verified]


## 関連項目
- [`sub_match`](../sub_match.md)


## 参照
- [LWG Issue 3204. `sub_match::swap` only swaps the base class](https://cplusplus.github.io/LWG/issue3204)
    - C++23で、基底クラス[`pair`](../../utility/pair.md)から継承した`swap`はメンバ変数`matched`を交換しなかったため、`matched`も交換する専用のメンバ関数`swap`が追加された
