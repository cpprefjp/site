# operator[]
* memory[meta header]
* std[meta namespace]
* unique_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
T& operator[](std::size_t i) const;
```

## 概要
任意の位置の要素にアクセスする。


## 要件
`i`が、保持している動的配列の要素数より小さいこと。


## 戻り値
[`get()`](get.md)`[i]`


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::unique_ptr<int[]> p(new int[3]);

  p[0] = 3;
  p[1] = 1;
  p[2] = 4;

  int& front = p[0];
  std::cout << front << std::endl;
}
```

### 出力
```
3
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.4.7
- [Clang](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013
