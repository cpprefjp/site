# cout
* iostream[meta header]
* std[meta namespace]
* variable[meta id-type]

```cpp
namespace std {
  ostream cout;
}
```

## 概要
`cout`は、標準出力に対するマルチバイト出力ストリームオブジェクトである。
すなわち、`<cstdio>`の`stdout`オブジェクトに結びつけられたストリームオブジェクトである。

## 例
```cpp
#include <iostream>

int main()
{
  std::cout << "Hello world" << std::endl;
}
```
* std::cout[color ff0000]

### 出力
```
Hello world
```

## バージョン
### 言語
- C++98

## 参照
- [`wcout`](wcout.md.nolink)
