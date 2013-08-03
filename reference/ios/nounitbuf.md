#nounitbuf
```cpp
namespace std {
  ios_base& nounitbuf(ios_base& str);
}
```

##概要
unitbufの効果を取り消すことを指示するマニピュレータ。
これにより、出力操作のたびにバッファをフラッシュされる操作が行われなくなる。

##効果
`str.unsetf(std::ios_base::unitbuf)`を実行する。

##戻り値
実引数のstrオブジェクト。

##備考
[`std::cerr`](../iostream/cerr.md)と[`std::wcerr`](../iostream/wcerr.md)オブジェクトは、
初期状態として`std::ios_base::unitbuf`が設定されている。

##例
```cpp
#include <iostream>

int main()
{
  std::cout << std::unitbuf << "test\n";
  std::cout << std::nounitbuf << "test\n";
}
```

###出力例
```
test
test
```

##バージョン
###言語
- C++03

##参照
- [`unitbuf`](./unitbuf.md)
