# operator=
* sstream[meta header]
* std[meta namespace]
* basic_ostringstream[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
basic_ostringstream& operator=(basic_ostringstream&& rhs);           // (1) C++11
basic_ostringstream& operator=(const basic_ostringstream&) = delete; // (2) C++11
```

## 概要
ムーブ代入を行う。

## 効果
- (1) : `basic_ostream<CharT, Traits>::operator=(std::move(rhs))`を呼び出し、`sb = std::move(rhs.sb)`を実行する。ここで`sb`は内部の`basic_stringbuf`オブジェクトである。

## 戻り値
`*this`

## 例
```cpp example
#include <iostream>
#include <sstream>
#include <string>
#include <utility>

int main()
{
  std::ostringstream ss1;
  std::ostringstream ss2;
  
  ss1 << "first";
  
  // ムーブ代入
  ss2 = std::move(ss1);
  
  std::cout << ss2.str() << std::endl;
}
```
* str()[link str.md]

### 出力
```
first
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified], 3.5.0 [mark verified], 3.6.0 [mark verified], 3.7.0 [mark verified], 3.8.0 [mark verified]
- [GCC](/implementation.md#gcc): 5.1.0 [mark verified], 5.2.0 [mark verified], 6.0.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 900. Stream move-assignment](https://cplusplus.github.io/LWG/issue900)
    - C++11で、ムーブ代入の効果が`swap(rhs)`から、基底クラスと各メンバを`rhs`の対応する基底・メンバからムーブ代入することへ改められた。`swap`では代入先が元々持っていた状態が`rhs`へ残ってしまうため
