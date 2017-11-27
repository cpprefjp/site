# dec
* ios[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  ios_base& dec(ios_base& str);
}
```

## 概要
整数を十進法で出力することを指示するマニピュレータ。

## 効果
`str.setf(ios_base::dec, ios_base::basefield)`を実行する。

## 戻り値
実引数のstrオブジェクト。

## 例
```cpp example
#include <iostream>

int main()
{
  for (int i = 0; i < 20; ++i) {
    std::cout << std::dec << i << '\t';
    std::cout << std::oct << i << '\t';
    std::cout << std::hex << i << std::endl;
  }
}
```
* std::dec[color ff0000]
* std::oct[link oct.md]
* std::hex[link hex.md]

### 出力
```
0       0       0
1       1       1
2       2       2
3       3       3
4       4       4
5       5       5
6       6       6
7       7       7
8       10      8
9       11      9
10      12      a
11      13      b
12      14      c
13      15      d
14      16      e
15      17      f
16      20      10
17      21      11
18      22      12
19      23      13
```

## バージョン
### 言語
- C++03

## 参照
- [`oct`](oct.md)
- [`hex`](hex.md)
