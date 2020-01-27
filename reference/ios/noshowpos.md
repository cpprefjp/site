# noshowpos
* ios[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  ios_base& noshowpos(ios_base& str);
}
```

## 概要
数値出力時に�符号を出力させないことを指示するマニピュレータ。
符号付き整数・浮動小数点数に対して効果がある。

## 効果
`str.setf(std::ios_base::noshowpos)`を実行する。

## 戻り値
実引数のstrオブジェクト。

## 例
```cpp example
#include <iostream>

int main()
{
  std::cout << std::showpos << 1 << ' ' << 0 << ' ' << 1 << std::endl;
  std::cout << std::noshowpos << 1 << ' ' << 0 << ' ' << 1 << std::endl;
}
```
* std::noshowpos[color ff0000]
* std::showpos[link showpos.md]

### 出力
```
+1 +0 +1
1 0 1
```

## バージョン
### 言語
- C++03

## 参照
- [`showpos`](showpos.md)
