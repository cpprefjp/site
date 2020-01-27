# mark_count
* regex[meta header]
* std[meta namespace]
* basic_regex[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
unsigned int mark_count() const;
```

## 概要
�規表現内の�ャプチャグループの数を返す。


## 戻り値
�規表現内の�ャプチャグループの数


## 備考
�ャプチャグループとは、�規表現内の丸括弧で囲まれた部分の事である。  
�ャプチャグループは、その�規表現内の後方や、[`regex_replace`](../regex_replace.md) による置換時などに使用することができる。  
また、[`match_results`](../match_results.md) オブジェクトを使用することによって、[`regex_match`](../regex_match.md) や [`regex_search`](../regex_search.md) �の結果として受け取ることもできる。  
その場合、�ャプチャグループに対応する部分は [`match_results`](../match_results.md) オブジェクトのメンバ関数で [`sub_match`](../sub_match.md) オブジェクトとして（[`operator[]`](../match_results/op_at.md)）、あるいは文�列として（[`str`](../match_results/str.md)）アクセス可能である。  
なお、`this->`[`flags`](flags.md)`()` に [`regex_constants::nosubs`](../regex_constants/syntax_option_type.md) が含まれている場合は、�ャプチャグループは無効となるため、本関数の戻り値は `0` となる。


## 例
```cpp example
#include <iostream>
#include <regex>

int main()
{
  std::regex re("(\\w+) (\\d+) (\\w+)");
  std::cout << re.mark_count() << std::endl;
}
```
* mark_count()[color ff0000]

### 出力
```
3
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
