# position
* regex[meta header]
* std[meta namespace]
* match_results[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
difference_type position(size_type sub = 0) const;
```

## 概要
指定されたサブマッチが指す文�列の位置を返す。


## 要件
[`ready`](ready.md)`() == true`


## 戻り値
検索対象文�列の先�を `p` とすると、[`distance`](../../iterator/distance.md)`(p, (*this)[sub].first)`  
なお、[`regex_iterator`](../regex_iterator.md) を逆参照して得られたオブジェクトの場合、基準となる「検索対象文�列の先�」は各繰り返し毎の検索開始位置ではなくコンストラクタに与えた文�列の先�である（[`regex_iterator`](../regex_iterator.md)`::`[`operator++`](../regex_iterator/op_increment.md)の「効果」参照）。


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
    std::cout << "str() = '" << m.str() << "', position() = " << m.position() << std::endl;
    for (std::size_t i = 0, n = m.size(); i < n; ++i) {
      std::cout << "str(" << i << ") = '" << m.str(i) << "', position(" << i << ") = " << m.position(i) << std::endl;
    }
  } else {
    std::cout << "not match" << std::endl;
  }
}
```
* m.position[color ff0000]
* std::regex[link ../basic_regex.md]
* std::cmatch[link ../match_results.md]
* std::regex_search[link ../regex_search.md]
* m.size()[link size.md]
* m.str[link str.md]

### 出力
```
str() = 'abc 0123 defgh', position() = 1
str(0) = 'abc 0123 defgh', position(0) = 1
str(1) = 'abc', position(1) = 1
str(2) = '0123', position(2) = 5
str(3) = 'defgh', position(3) = 10
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
