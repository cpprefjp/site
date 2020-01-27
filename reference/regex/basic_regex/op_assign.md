# operator=
* regex[meta header]
* std[meta namespace]
* basic_regex[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
basic_regex& operator=(const basic_regex& e);                   // (1)

basic_regex& operator=(basic_regex&& e) noexcept;               // (2)

basic_regex& operator=(const charT* ptr);                       // (3)

basic_regex& operator=(initializer_list<charT> il);             // (4)

template <class ST, class SA>
basic_regex& operator=(const basic_string<charT, ST, SA>& p);   // (5)
```
* basic_regex[link ../basic_regex.md]
* initializer_list[link ../../initializer_list.md]
* basic_string[link ../../string/basic_string.md]


## 概要
�規表現オブジェクトを代入する。


## 要件
- `ptr` はヌルポインタではないこと。


## 効果
- (1) コピー代入演算�。[`assign`](assign.md)`(e)` と�価。
- (2) ムーブ代入演算�。[`assign`](assign.md)`(`[`move`](../../utility/move.md)`(e))` と�価。
- (3) [`assign`](assign.md)`(ptr)` と�価。
- (4) [`assign`](assign.md)`(il.begin(), il.end())` と�価。
- (5) [`assign`](assign.md)`(p)` と�価。


## 戻り値
`*this`


## 例
```cpp example
#include <iostream>
#include <regex>
#include <string>

int main()
{
  const char s[] = " abc ";
  std::regex re;
  std::cout << std::boolalpha;

  const std::regex re1("\\w+");
  re = re1;                                             // (1) の形式
  std::cout << std::regex_search(s, re) << std::endl;

  re = std::regex("\\d+");                              // (2) の形式
  std::cout << std::regex_search(s, re) << std::endl;

  re = "\\w+";                                          // (3) の形式
  std::cout << std::regex_search(s, re) << std::endl;

  re = { '\\', 'd', '+' };                              // (4) の形式
  std::cout << std::regex_search(s, re) << std::endl;

  const std::string p = "\\w+";
  re = p;                                               // (5) の形式
  std::cout << std::regex_search(s, re) << std::endl;
}
```
* std::regex_search[link ../regex_search.md]

### 出力
```
true
false
true
false
true
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): 4.9.0, 4.9.1, 4.9.2, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

### 備考
Clang バージョン 3.0 は [`initializer_list`](../../initializer_list.md) に対応していないため、(4) の形式は提供されていない。  
また、Clang(libc++) では例外が発生した場合に `*this` が元の状態を保持せずに�途半端に更新されてしまう。
