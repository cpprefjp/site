#noskipws
```cpp
namespace std {
  ios_base& noskipws(ios_base& str);
}
```

##概要
書式入力を開始する際の空白の読み飛ばしを行わないことを指示するマニピュレータ。

##効果
`str.unsetf(std::ios_base::skipws)`を実行する。

##戻り値
実引数のstrオブジェクト。

##例
```cpp
#include <iostream>
#include <sstream>

int main()
{
  std::istringstream s("1 2");

  char a, b, c;
  s >> std::noskipws >> a >> b >> c;
  std::cout << a << b << c << std::endl;

  s.seekg(std::ios_base::beg, 0);
  s >> std::skipws >> a >> b;
  std::cout << a << b << std::endl;
}
```

###出力
```
1 2
12
```

##バージョン
###言語
- C++03

##参照
- [`noskipws`](./noskipws.md)
