#noboolalpha
* ios[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  ios_base& noboolalpha(ios_base& str);
}
```

##概要
bool値を数値として入出力することを指示するマニピュレータ。

##効果
`str.unsetf(std::ios_base::boolalpha)`を実行する。

##戻り値
実引数のstrオブジェクト。

##例
```cpp
#include <iostream>

int main()
{
  std::cout << std::boolalpha << false << std::endl;
  std::cout << std::noboolalpha << false << std::endl;
}
```
* boolalpha[link ./boolalpha.md]
* noboolalpha[color ff0000]

###出力
```
false
0
```

##バージョン
###言語
- C++03

##参照
- [`boolalpha`](./boolalpha.md)
