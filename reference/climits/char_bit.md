# CHAR_BIT
* climits[meta header]
* macro[meta id-type]

```cpp
#define CHAR_BIT implementation-defined
```

## 概要
1バイトのビット数を表す。`#if` などのプリプロセッサディレクティブで使用できる。  
具体的な値は実装依存であるが、`8` 以上であることが規格で定められている。

## 例
```cpp example
#include <climits>
#include <iostream>

int main()
{
  std::cout << CHAR_BIT << '\n';
}
```


### 出力例
```
8
```

## バージョン
### 言語
- C++03
- C++11


### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified], 4.4.7 [mark verified], 4.5.3 [mark verified], 4.5.4 [mark verified], 4.6.4 [mark verified], 4.7.3 [mark verified], 4.8.1 [mark verified], 4.8.2 [mark verified], 4.9.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2003 [mark verified], 2005 [mark verified], 2008 [mark verified], 2010 [mark verified]
