#iota
* numeric[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std{
  template <class ForwardIterator, class T>
  void iota(ForwardIterator first, ForwardIterator last, T value);
}
```

##概要
指定された値から始まる整数列を生成する。

##パラメータ

| パラメータ名 | 説明 |
|-------|--------------------------|
| `first` | シーケンスの先頭 |
| `last` | シーケンスの終端 |
| `value` | 初期値 |


##効果
全ての要素に対して、`first` から順番に `*it = value; ++value;` を行う


##戻り値
なし


##計算量
n 回のインクリメントと代入が行われる。


##備考
この関数は、APL言語の「原始関数ι（イオタ）」に由来する。


##例
```cpp
#include <numeric>
#include <iostream>
#include <string>

int main()
{
  std::string s = "hello, iota!";
  std::cout << s << std::endl;
  std::iota(s.begin(), s.end(), 'A');
  std::cout << s << std::endl;
}
```
* std::iota[color ff0000]

###出力
```
hello, iota!
ABCDEFGHIJKL
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC, C++11 mode](/implementation.md#gcc): 4.5
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 9.0

##参照
- [N2569 More STL algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2569.pdf)
- [N2666 More STL algorithms (revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2666.pdf)

