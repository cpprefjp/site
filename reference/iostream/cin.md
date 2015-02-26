#cin
* iostream[meta header]
* std[meta namespace]
* variable[meta id-type]

```cpp
namespace std {
  istream cin;
}
```

##概要
`cin`は、標準入力に対するマルチバイト入力ストリームオブジェクトである。
すなわち、`<cstdio>`の`stdin`オブジェクトに結びつけられたストリームオブジェクトである。

##例
```cpp
#include <iostream>
#include <string>

int main()
{
  std::cout << "名前を入力してください: ";

  std::string s;
  std::cin >> s;

  std::cout << "あなたの名前は「" << s << "」ですね。" << std::endl;
}
```

##バージョン
###言語
- C++98

##参照
- [`wcin`](./wcin.md.nolink)

