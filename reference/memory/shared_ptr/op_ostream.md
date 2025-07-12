# operator<<
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class E, class T, class Y>
  std::basic_ostream<E, T>& operator<<(std::basic_ostream<E, T>& os, const shared_ptr<Y>& p);
}
```

## 概要
ストリームに出力する。


## 効果
ポインタ値を出力する。

```cpp
os << p.get();
```
* get()[link get.md]


## 戻り値
`os`


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> p(new int(3));

  std::cout << p << std::endl;
}
```

### 出力例
```
0x7f9400d12480
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2008 (TR1) [mark verified], 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]
