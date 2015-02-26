#noshowbase
* ios[meta header]

```cpp
namespace std {
  ios_base& noshowbase(ios_base& str);
}
```

##概要
整数出力時に基数を表すプレフィックスを付与しないことを指示するマニピュレータ。
[`showbase`](./showbase.md)の効果を打ち消す効果がある。

##効果
`str.unsetf(std::ios_base::showbase)`を実行する。

##戻り値
実引数のstrオブジェクト。

##例
```cpp
#include <iostream>

int main()
{
  std::cout << std::hex;
  std::cout << 15 << std::endl;
  std::cout << std::showbase << 15 << std::endl;
  std::cout << std::noshowbase << 15 << std::endl;
}
```

###出力
```
f
0xf
f
```

##バージョン
###言語
- C++03

##参照
- [`showbase`](./showbase.md)
