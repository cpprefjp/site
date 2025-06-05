# swap
* sstream[meta header]
* std[meta namespace]
* basic_ostringstream[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void swap(basic_ostringstream& rhs);                         // (1) C++11
void swap(basic_ostringstream& rhs) noexcept(/*see below*/); // (1) C++17
```

## 概要
値を交換する。

## 効果
`basic_ostream<CharT, Traits>::swap(rhs)`を呼び出し、`sb.swap(rhs.sb)`を実行する。ここで`sb`は内部の`basic_stringbuf`オブジェクトである。


## 例外
- C++17 : 実装が例外を投げない場合、この関数は`noexcept`が指定される。


## 例
```cpp example
#include <iostream>
#include <sstream>
#include <string>

int main()
{
  std::ostringstream ss1;
  std::ostringstream ss2;
  
  ss1 << "first";
  ss2 << "second";
  
  ss1.swap(ss2);
  
  std::cout << ss1.str() << std::endl;
  std::cout << ss2.str() << std::endl;
}
```
* str()[link str.md]

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
