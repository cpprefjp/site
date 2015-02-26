#cerr
* iostream[meta header]
* std[meta namespace]

```cpp
namespace std {
  ostream cerr;
}
```

##概要
`cerr`は、標準出力に対するマルチバイト出力ストリームオブジェクトである。
すなわち、`<cstdio>`の`stderr`オブジェクトに結びつけられたストリームオブジェクトである。

clogと異なる点は、unitbufフラグが指定されていることである。そのため、出力操作のたびにバッファの吐き出しが行われる。

##例
```cpp
#include <iostream>
#include <vector>

int main()
{
  try
  {
    std::vector<int> v;
    v.at(42) = 1;
  }
  catch(const std::exception& e)
  {
    std::cerr << "問題発生: " << e.what() << std::endl;
  }
}
```

###出力
```
問題発生: invalid vector<T> subscript
```

出力内容は環境により異なる。

##バージョン
###言語
- C++98

##参照
- [`clog`](./clog.md)
- [`wcerr`](./wcerr.md.nolink)
- [`wclog`](./wclog.md.nolink)
