#nouppercase
* ios[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  ios_base& nouppercase(ios_base& str);
}
```

##概要
出力時に英小文字を使用することを指示するマニピュレータ。
[`hex`](hex.md)や[`scientific`](scientific.md)、[`hexfloat`](hexfloat.md)などと組み合わせることで効果がある。

##効果
`str.unsetf(std::ios_base::uppercase)`を実行する。

##戻り値
実引数のstrオブジェクト。

##例
```cpp
#include <iostream>

int main()
{
  std::cout << std::hex;
  std::cout << std::uppercase << 0xbeef << std::endl;
  std::cout << std::nouppercase << 0xbeef << std::endl;
}
```
* std::nouppercase[color ff0000]
* std::hex[link hex.md]
* std::uppercase[link uppercase.md]

###出力
```
BEEF
beef
```

##バージョン
###言語
- C++03

##参照
- [`uppercase`](uppercase.md)
