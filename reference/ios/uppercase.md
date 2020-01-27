# uppercase
* ios[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  ios_base& uppercase(ios_base& str);
}
```

## 概要
出力時に英大文�を使用することを指示するマニピュレータ。
[`hex`](hex.md)や[`scientific`](scientific.md)、[`hexfloat`](hexfloat.md)などと組み合わせることで効果がある。

## 効果
`str.setf(std::ios_base::uppercase)`を実行する。

## 戻り値
実引数のstrオブジェクト。

## 例
```cpp example
#include <iostream>

int main()
{
  std::cout << std::uppercase;
  std::cout << std::hex << std::showbase << 0xbeef << std::endl;
  std::cout << std::scientific << 1e+23 << std::endl;
  std::cout << std::hexfloat << 1234.5 << std::endl;
}
```
* std::uppercase[color ff0000]
* std::hex[link hex.md]
* std::showbase[link showbase.md]
* std::scientific[link scientific.md]
* std::hexfloat[link hexfloat.md]

### 出力
```
0XBEEF
1.000000E+023
0X1.34A000P+10
```

## バージョン
### 言語
- C++03

## 参照
- [`nouppercase`](nouppercase.md)
