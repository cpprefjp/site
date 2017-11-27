# cin
* iostream[meta header]
* std[meta namespace]
* variable[meta id-type]

```cpp
namespace std {
  istream cin;
}
```

## 概要
`cin` は、標準入力に対するマルチバイト入力ストリームオブジェクトである。
すなわち、`<cstdio>` の `stdin` オブジェクトに結びつけられたストリームオブジェクトである。  
本オブジェクトは、初期化が完了すると [`tie`](../ios/basic_ios/tie.md)`()` が `&`[`cout`](cout.md) を返すようになる。  
その他の状態は、[`basic_ios`](../ios/basic_ios.md)`<char>::`[`init`](../ios/basic_ios/init.md) の事後条件と同様である。

## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::cout << "名前を入力してください: ";

  std::string s;     // std::cin.tie() == &std::cout であるため、
  std::cin >> s;     // std::cout を明示的に flush しなくても
                     // 上記の出力が flush されることが保証されている

  std::cout << "あなたの名前は「" << s << "」ですね。" << std::endl;
}
```
* std::cin[color ff0000]

## バージョン
### 言語
- C++98

## 参照
- [`wcin`](wcin.md.nolink)

