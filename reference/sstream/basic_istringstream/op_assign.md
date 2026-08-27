# operator=
* sstream[meta header]
* std[meta namespace]
* basic_istringstream[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
basic_istringstream& operator=(basic_istringstream&& rhs);           // (1) C++11
basic_istringstream& operator=(const basic_istringstream&) = delete; // (2) C++11
```

## 概要
ムーブ代入を行う。

## 効果
- (1) : `basic_istream<CharT, Traits>::operator=(std::move(rhs))`を呼び出し、`sb = std::move(rhs.sb)`を実行する。ここで`sb`は内部の`basic_stringbuf`オブジェクトである。

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
  std::istringstream ss1("first");
  std::istringstream ss2;
  
  // ムーブ代入
  ss2 = std::move(ss1);
  
  std::string s;
  ss2 >> s;
  std::cout << s << std::endl;
}
```

### 出力
```
first
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 5.1.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 900. Stream move-assignment](https://cplusplus.github.io/LWG/issue900)
    - C++11で、ムーブ代入の効果が`swap(rhs)`から、基底クラスと各メンバを`rhs`の対応する基底・メンバからムーブ代入することへ改められた。`swap`では代入先が元々持っていた状態が`rhs`へ残ってしまうため
