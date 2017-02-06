#showbase
* ios[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  ios_base& showbase(ios_base& str);
}
```

##概要
整数出力時に基数を表すプレフィックスを付与することを指示するマニピュレータ。
[`hex`](hex.md)や[`oct`](hex.md)と組み合わせると、それぞれ0xおよび0が頭に出力される。
ただし、0の場合を除く。

`money_put`など、その他の出力でも効果がある場合がある。

##効果
`str.setf(std::ios_base::showbase)`を実行する。

##戻り値
実引数のstrオブジェクト。

##例
```cpp
#include <iostream>

int main()
{
  std::cout << std::hex;
  std::cout << 15 << ' ' << 0 << std::endl;
  std::cout << std::showbase << 15 << ' ' << 0 << std::endl;

  std::cout << std::noshowbase;

  std::cout << std::oct;
  std::cout << 15 << ' ' << 0 << std::endl;
  std::cout << std::showbase << 15 << ' ' << 0 << std::endl;
}
```
* std::showbase[color ff0000]
* std::hex[link hex.md]
* std::oct[link oct.md]
* std::noshowbase[link noshowbase.md]

###出力
```
f 0
0xf 0
17 0
017 0
```

##バージョン
###言語
- C++03

##参照
- [`noshowbase`](noshowbase.md)
