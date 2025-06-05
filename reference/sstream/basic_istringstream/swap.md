# swap
* sstream[meta header]
* std[meta namespace]
* basic_istringstream[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void swap(basic_istringstream& rhs);                         // (1) C++11
void swap(basic_istringstream& rhs) noexcept(/*see below*/); // (1) C++17
```

## 概要
値を交換する。

## 効果
`basic_istream<CharT, Traits>::swap(rhs)`を呼び出し、`sb.swap(rhs.sb)`を実行する。ここで`sb`は内部の`basic_stringbuf`オブジェクトである。


## 例外
- C++17 : 実装が例外を投げない場合、この関数は`noexcept`が指定される。


## 例
```cpp example
#include <iostream>
#include <sstream>
#include <string>

int main()
{
  std::istringstream ss1("first");
  std::istringstream ss2("second");
  
  ss1.swap(ss2);
  
  std::string s1, s2;
  ss1 >> s1;
  ss2 >> s2;
  
  std::cout << s1 << std::endl;
  std::cout << s2 << std::endl;
}
```

### 出力
```
second
first
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 5.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
