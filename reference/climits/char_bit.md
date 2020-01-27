# CHAR_BIT
* climits[meta header]
* macro[meta id-type]

```cpp
# define CHAR_BIT implementation-defined
```

## 概要
1バイトのビット数を表す。`#if` などのプリプ�セッサディレクティブで使用できる。  
具体的な値は実装依�であるが、`8` 以上であることが規格で定められている。

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
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.3, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2003, 2005, 2008, 2010
